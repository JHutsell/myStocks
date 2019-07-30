class StocksAdapter {

	static baseUrl() {
		return `https://localhost:3000`;
	}

  static stockSysmbolListUrl() {
    return `https://financialmodelingprep.com/api/v3/company/stock/list`;
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

  static getStockList() {
    return fetch(this.stockSysmbolListUrl())
    .then(res => res.json())
    .then(console.log)
  }
}