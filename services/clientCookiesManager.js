class ClientCookiesManager {
  get(name) {
    const cookies = this.getAll();
    return cookies[name];
  }

  getAll() {
    const pairs = document.cookie.split(';');
    const cookies = {};

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      cookies[(`${pair[0]}`).trim()] = decodeURIComponent(pair[1]);
    }
    return cookies;
  }
}

export default ClientCookiesManager;
