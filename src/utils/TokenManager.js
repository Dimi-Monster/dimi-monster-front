import api from './API';

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

    async getAccessToken() {
        let expires = parseInt(localStorage.getItem('expires'));

        if (expires < this.getCurrentTime() + 60)
            this.triggerRefresh();

        if (expires < this.getCurrentTime() + 15)
            await this.waitForRefresh();

        return localStorage.getItem('access-token');
    }

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

    waitForRefresh() {
        return new Promise((resolve, reject) => {
            this.refreshCallbackList.push({
                resolve: resolve,
                reject: reject
            });
        });
    }
}