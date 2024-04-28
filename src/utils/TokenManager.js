import api from './API';

// TokenManager: 토큰 (access-token, refresh-token)을 관리하는 클래스
// 기존에 refreshIfExpired() 를 활용하는 방식은 여러 요청을 동시에 보냈을 때 refresh도 동시에 보내는 문제가 존재한다
// 이를 해결하기 위해 getAccessToken() 호출 시 토큰 만료까지 남은 시간을 계산해서
// 만료되었거나 15초 이하로 남았다면 동기적으로 refresh하고
// 15초 이상 60초 이하로 남았다면 비동기적으로 refresh한다.

export default class TokenManager {
    // accessToken = '';
    // refreshToken = '';
    // expires = -1;

    refreshCallbackList = [];

    getCurrentTime() {
        return Math.floor(Date.now() / 1000);
    }

    initialize(accessToken, refreshToken, expireAt) {
        // this.accessToken = accessToken;
        // this.refreshToken = refreshToken;
        // this.expires = Math.floor(Date.now() / 1000) + expireAt;

        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("expires", (Math.floor(Date.now() / 1000) + expireAt).toString());
    }

    // accessToken 값을 반환한다.
    async getAccessToken() {
        let expires = parseInt(localStorage.getItem('expires'));

        if (expires < this.getCurrentTime() + 60)
            this.triggerRefresh();

        if (expires < this.getCurrentTime() + 15)
            await this.waitForRefresh();

        return localStorage.getItem('access-token');
    }

    // 실제 토큰 재발행을 수행한다. 이 함수 대신 triggerRefresh()를 호출하는 것이 좋다
    async refresh() {
        this.refreshing = true;

        let email = localStorage.getItem("email");
        let refreshToken = localStorage.getItem("refresh-token");

        const url = `${api.serverUrl}/auth/refresh`;

        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                "refresh-token": refreshToken,
            }),
        });
        if (data.status != 200) {
            if (data.status == 403) {
                localStorage.removeItem("access-token");
                localStorage.removeItem("refresh-token");
                document.location.href = "/banned";
            }
            this.lastError = "Unauthorized";

            this.refreshing = false;
            this.lastRefresh = Date.now();
            return false;
        }

        let json = await data.json();

        localStorage.setItem("access-token", json["access-token"]);
        localStorage.setItem(
            "expires",
            (Math.floor(Date.now() / 1000) + json["at-expire"]).toString()
        );

        this.refreshing = false;
        return true;
    }

    // 토큰 재발행을 트리거하고, 재발행이 완료되었을 때 콜백을 호출한다.
    async triggerRefresh() {
        if(this.refreshing)
            return;

        let res = await this.refresh();

        if(res) {
            this.refreshCallbackList.forEach(({resolve}) => resolve());
        }
        else {
            this.refreshCallbackList.forEach(({reject}) => reject());
        }

        this.refreshCallbackList = [];
    }

    // 토큰 재발행 중이라면, 토큰 재발행이 완료될 때까지 기다린다.
    waitForRefresh() {
        return new Promise((resolve, reject) => {
            if(!this.refreshing) {
                resolve();
                return;
            }

            this.refreshCallbackList.push({
                resolve: resolve,
                reject: reject
            });
        });
    }
}