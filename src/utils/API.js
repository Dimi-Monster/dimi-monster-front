class API {
    serverUrl = '';

    constructor() {
        this.serverUrl = process.env.REACT_APP_API_URL;
    }

    async login(code) {
        const url = `${this.serverUrl}/auth/login?code=${code}`;
        let data = await fetch(url, {
            headers: {
                'ngrok-skip-browser-warning': 'osong'
            }
        });
        if(data.status != 200)
            return false;

        let json = await data.json();

        data = fetch(json.picture);

        localStorage.setItem('email', json['email']);
        localStorage.setItem('access-token', json['access-token']);
        localStorage.setItem('refresh-token', json['refresh-token']);
        localStorage.setItem('name', json['name']);
        localStorage.setItem('expires', (Math.floor(Date.now() / 1000) + json['at-expire']).toString());

        let blob = await data.then((response) => response.blob());
        const objectURL = URL.createObjectURL(blob);
        // 여기서 프로필 이미지 처리
        //console.log(objectURL);
        localStorage.setItem('profile-image', objectURL);

        return true;
    }
    async logout(/*email, refreshToken*/) {
        let email = localStorage.getItem('email');
        let refreshToken = localStorage.getItem('refresh-token');

        const url = `${this.serverUrl}/auth/logout`;

        let data = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'osong'
            },
            body: JSON.stringify({
                'email': email,
                'refresh-token': refreshToken
            })
        });
        if(data.status != 200)
            return false;

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

        return true;
    }
    async refresh(/*email, refreshToken*/) {
        let email = localStorage.getItem('email');
        let refreshToken = localStorage.getItem('refresh-token');

        const url = `${this.serverUrl}/auth/refresh`;

        let data = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'osong'
            },
            body: JSON.stringify({
                'email': email,
                'refresh-token': refreshToken
            })
        });
        if(data.status != 200)
            return false;

        let json = await data.json();

        localStorage.setItem('access-token', json['access-token']);
        localStorage.setItem('expires', (Math.floor(Date.now() / 1000) + json['at-expire']).toString());
        return true;
    }
}

let api = new API();
export default api;