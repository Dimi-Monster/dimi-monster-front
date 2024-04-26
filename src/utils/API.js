class API {
  serverUrl = "";
  lastError = "";
  currentIdx = 0;

  refreshing = false;
  lastRefresh = -1;

  constructor() {
    this.serverUrl = process.env.REACT_APP_API_URL;
  }

  getLastError() {
    return this.lastError;
  }

  async login(code) {
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
    localStorage.setItem("access-token", json["access-token"]);
    localStorage.setItem("refresh-token", json["refresh-token"]);
    localStorage.setItem("name", json["name"]);
    localStorage.setItem(
      "expires",
      (Math.floor(Date.now() / 1000) + json["at-expire"]).toString()
    );

    let blob = await data.then((response) => response.blob());
    const objectURL = URL.createObjectURL(blob);
    // 여기서 프로필 이미지 처리
    //console.log(objectURL);
    localStorage.setItem("profile-image", objectURL);

    return 200;
  }
  async logout() {
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
  async refresh() {
    if(this.refreshing)
      return true;
    this.refreshing = true;

    if(Date.now() - this.lastRefresh < 10000)
      return true;

    let email = localStorage.getItem("email");
    let refreshToken = localStorage.getItem("refresh-token");

    const url = `${this.serverUrl}/auth/refresh`;

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
  async refreshIfExpired() {
    let current = Math.floor(Date.now() / 1000);

    let expires = parseInt(localStorage.getItem("expires"));
    if (expires - 50 < current) {
      if (!(await this.refresh()) && expires - 15 < current)
        return false;
    }
    return true;
  }
  async getImage(pageIdx, thumbnail = true) {
    if (!(await this.refreshIfExpired())) return false;

    const url = `${this.serverUrl}/image/list?page=${pageIdx}&thumbnail=${thumbnail}`;

    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
  async getRecentImageID() {
    await this.refreshIfExpired();

    const url = `${this.serverUrl}/image/recent`;

    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    if (data.status != 200) return false;

    let json = await data.json();
    return json.id;
  }
  async getOriginalImageUrl(id) {
    await this.refreshIfExpired();

    const url = `${this.serverUrl}/image/${id}`;
    return url;
  }
  async uploadImage({ img, location, description, token }) {
    // token: 리캡차 토큰
    await this.refreshIfExpired();
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
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: formData,
    });

    if (data.status != 200) return false;

    return true;
  }
  async like(id) {
    await this.refreshIfExpired();
    const url = `${this.serverUrl}/image/like/${id}`;

    let data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    if (data.status != 200) return false;

    return true;
  }
  async unlike(id) {
    await this.refreshIfExpired();
    const url = `${this.serverUrl}/image/like/${id}`;

    let data = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    if (data.status != 200) return false;

    return true;
  }
  async getWeeklyImage() {
    await this.refreshIfExpired();

    const url = `${this.serverUrl}/image/weekly`;

    let data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
  async getLikeCount(id) {
    await this.refreshIfExpired();
    const url = `${this.serverUrl}/image/like/${id}`;

    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    if (data.status != 200) return false;

    let json = await data.json();
    return json.like;
  }

  async report({ id, category, reason, token }) {
    await this.refreshIfExpired();
    const url = `${this.serverUrl}/report`;

    let data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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

  async processReport({id, process, reason, secret}) {
    await this.refreshIfExpired();
    const url = `${this.serverUrl}/report/process`;

    let data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
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
}

let api = new API();
export default api;
