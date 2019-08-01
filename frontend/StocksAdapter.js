class StocksAdapter {

	static baseUrl() {
		return `https://localhost:3000`;
	}

  static stockSysmbolListUrl() {
    return `https://financialmodelingprep.com/api/v3/company/stock/list`;
  }

  static companyProfileUrl() {
    return `https://financialmodelingprep.com/api/v3/company/profile/`;
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

  static search(stocks, input) {
    for (let stockInfo of stocks) {
      if (stockInfo.name.split(" ")[0].toLowerCase() === input.split(" ")[0].toLowerCase() || 
          stockInfo.symbol.split(" ")[0].toLowerCase() === input.split(" ")[0].toLowerCase()) {
        return stockInfo.symbol;
      }
    }
  }

  static getCompanyProfile(symbol) {
    return fetch(this.companyProfileUrl() + symbol.toUpperCase())
    .then(res => res.json())
  }

  static getStockList() {
    return fetch(this.stockSysmbolListUrl())
    .then(res => res.json())
  }

  static createDiv(stockInfo) {
    let stockProfile = stockInfo.profile;
    let showedStockDiv = document.createElement("div");
    showedStockDiv.innerHTML = ` <button name="exit" id="exit-button">X</button>
                <h3>${stockProfile.companyName}</h3>
                <h4>${stockInfo.symbol}</h4>
                <p>Price: $${stockProfile.price}</p>
                <p>Description: <br>${stockProfile.description}</p>
                <p>Sector: <br>${stockProfile.sector}</p>
                <a href=${stockProfile.website} target="_blank">Website</a>
                <img src=${stockProfile.image}>
                <label for="add-stock">Add Stock to a Watchlist:</label>
                <select name="Add Stock to Watchlist">
                </select>
                `
    let exitButton = showedStockDiv.querySelector('#exit-button');
    exitButton.addEventListener("click", function() {
      showedStockDiv.remove();
    })

    document.body.append(showedStockDiv);
  }

  static addWatchListsToDOM(userId) {
    UserAdapter.getUser(userId)
    .then(userData => {
      for (let wl of userData.watch_lists) {
        this.slapOnTheDOM(wl);
      }
    })
    this.clickEvents();
  }
}

