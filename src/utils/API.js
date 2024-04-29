import TokenManager from "./TokenManager";

// API.js : 서버 API 처리를 담당한다
// 실제 API 명세와 1대1 대응하기 때문에 일부 메서드는 다른 클래스 (ImageManager, ThumbnailCacher 등) 를 통해 처리하는 게 좋다
class API {
  serverUrl = "";
  lastError = "";
  currentIdx = 0;

  tokenManager;

  constructor() {
    this.serverUrl = process.env.REACT_APP_API_URL;
    this.tokenManager = new TokenManager();
  }

  getLastError() {
    return this.lastError;
  }

  async login(code) {
    try {
      const url = `${this.serverUrl}/auth/login?code=${code}`;
      let data = await fetch(url, {
        headers: {},
      });
      if (data.status != 200) {
        this.lastError = new TextDecoder().decode(await data.arrayBuffer());
        return data.status;
      }

      let json = await data.json();

      data = fetch(json.picture);

      localStorage.setItem("email", json["email"]);
      localStorage.setItem("name", json["name"]);
      
      localStorage.setItem("access-token", json["access-token"]);
      localStorage.setItem("refresh-token", json["refresh-token"]);
      localStorage.setItem("expires", (Math.floor(Date.now() / 1000) + json["at-expire"]).toString());

      let blob = await data.then((response) => response.blob());
      const objectURL = URL.createObjectURL(blob);
      // 여기서 프로필 이미지 처리
      //console.log(objectURL);
      localStorage.setItem("profile-image", objectURL);

      return 200;
    }
    catch(e) {
      return false;
    }
  }
  async logout() {
    try {
      let email = localStorage.getItem("email");
      let refreshToken = localStorage.getItem("refresh-token");

      const url = `${this.serverUrl}/auth/logout`;

      let data = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          "refresh-token": refreshToken,
        }),
      });
      if (data.status != 200) return false;

      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");

      return true;
    }
    catch(e) {
      return false;
    }
  }
  async getImage(pageIdx, thumbnail = true) {
    try {
      const url = `${this.serverUrl}/image/list?page=${pageIdx}&thumbnail=${thumbnail}`;

      let data = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
      });

      if (data.status == 401) this.lastError = "Unauthorized";

      if (data.status != 200) return false;

      let json = await data.json();
      //console.log(json);

      let res = json.map((json) => {
        return {
          id: json["id"],
          src: json["thumbnail"],
          hearts: json["like"],
          title: json["location"],
          content: json["description"],
          like: json["liked-by-me"],
        };
      });

      return res;
    }
    catch(e) {
      return false;
    }
  }
  async getRecentImageID() {
    try {
      const url = `${this.serverUrl}/image/recent`;

      let data = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
      });

      if (data.status != 200) return false;

      let json = await data.json();
      return json.id;
    }
    catch(e) {
      return false;
    }
  }
  // 추후 스펙 변경에 대비하기 위해 async로 처리
  async getOriginalImageUrl(id) {
    const url = `${this.serverUrl}/image/${id}`;
    return url;
  }
  async uploadImage({ img, location, description, token }) {
    try {
      // token: 리캡차 토큰
      console.log(img);

      const blob = img;

      const url = `${this.serverUrl}/image/upload`;

      let formData = new FormData();
      formData.append("token", token);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("image", blob, "a.jpg");

      let data = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
        body: formData,
      });

      if (data.status != 200) return false;

      return true;
    }
    catch(e) {
      return false;
    }
  }
  async like(id) {
    try {
      const url = `${this.serverUrl}/image/like/${id}`;

      let data = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
      });

      if (data.status != 200) return false;

      return true;
    }
    catch(e) {
      return false;
    }
  }
  async unlike(id) {
    try {
      const url = `${this.serverUrl}/image/like/${id}`;

      let data = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
      });

      if (data.status != 200) return false;

      return true;
    }
    catch(e) {
      return false;
    }
  }
  async getWeeklyImage() {
    try {
      const url = `${this.serverUrl}/image/weekly`;

      let data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
      });

      if (data.status != 200) return false;

      let json = await data.json();
      return json.map((json) => ({
        id: json["id"],
        src: json["thumbnail"],
        hearts: json["like"],
        title: json["location"],
        content: json["description"],
        like: json["liked-by-me"],
      }));
    }
    catch(e) {
      return false;
    }
  }
  async getLikeCount(id) {
    try {
      const url = `${this.serverUrl}/image/like/${id}`;

      let data = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
        },
      });

      if (data.status != 200) return false;

      let json = await data.json();
      return json.like;
    }
    catch(e) {
      return false;
    }
  }

  async report({ id, category, reason, token }) {
    try {
      const url = `${this.serverUrl}/report`;

      let data = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "target-id": id,
          category: category,
          reason: reason,
          token: token,
        }),
      });

      if (data.status != 200) return false;

      //let json = await data.json();
      //return json.like;
      //alert(JSON.stringify(json));
      return true;
    }
    catch(e) {
      return false;
    }
  }

  async processReport({id, process, reason, secret}) {
    try {
      const url = `${this.serverUrl}/report/process`;

      let data = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.tokenManager.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "report-id": id,
          process: process,
          reason: reason,
          secret: secret,
        }),
      });

      if (data.status != 200) {
        this.lastError = await data.text();
        return false;
      }

      return true;
    }
    catch(e) {
      return false;
    }
  }
}

let api = new API();
export default api;
