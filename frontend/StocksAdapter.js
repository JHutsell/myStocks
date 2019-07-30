class StocksAdapter {

	static baseUrl() {
		return `https://localhost:3000`;
	}

	static getHeaders(){
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  }

  static fetchConfig(verb, bodyObject) {
    return {
      method: verb,
      headers: this.getTheHeadersPlease(),
      body: JSON.stringify(bodyObject)
    }
  }

  static createWatchlist(watchlist) {
    const fetchConfig = this.fetchConfig("POST", watchlist);
    return fetch(this.baseUrl() + "/watchlists", fetchConfig)
      .then(res => res.json());
  }
}