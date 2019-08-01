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
      headers: this.getHeaders(),
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

  // add stock to a watchlist
static addStockToWatchList(watch_list_id, symbol) {
  console.log(this.fetchConfig("POST", {watch_list_id, symbol}))
  console.log(this.baseUrl() + `/stock_cards`)
  debugger
  fetch(this.baseUrl() + `/stock_cards`, this.fetchConfig("POST", {watch_list_id, symbol}))
  .then(console.log)
  .then(console.log)
}

  static getWatchlistOptions(userId) {
    UserAdapter.getUser(userId)
    .then(userData => {
      for (let wl of userData.watch_lists) {
        this.createOption(wl);
      }
      let select = document.querySelector('#watchlist-select');
      select.addEventListener("change", event => {
        let index = event.target.selectedIndex
        let symbol = document.querySelector('#ticker').innerText
        let watchlist_id = userData.watch_lists[index].id
        this.addStockToWatchList(parseInt(watchlist_id), symbol)
      })
    })
  }
  
  static createDiv(stockInfo) {
    let stockProfile = stockInfo.profile;
    let showedStockDiv = document.querySelector("#search-stock-div");
    showedStockDiv.innerHTML = `<div id="pop-up-stock-search"> <button name="exit" id="exit-button">x</button>
    <h3>${stockProfile.companyName}</h3>
    <h4 id="ticker">${stockInfo.symbol}</h4>
    <p>Price: $${stockProfile.price}</p>
    <p>Description: <br>${stockProfile.description}</p>
    <p>Sector: <br>${stockProfile.sector}</p>
    <a href=${stockProfile.website} target="_blank">Website</a>
    <img src=${stockProfile.image}>
    <label for="add-stock">Add Stock to a Watchlist:</label>
    <select name="Add Stock to Watchlist" id="watchlist-select">
    </select>
    </div>`;
    let exitButton = showedStockDiv.querySelector('#exit-button');
    exitButton.addEventListener("click", function() {
      showedStockDiv.innerHTML = `<form id="search-stock">
      <label for="stock-query">Search Stocks</label>
      <input name="stock" type="text" class="form-control" id="stock-query" placeholder="Enter Ticker or Name">
      <button type="submit">search</button>
      </form>`;
    })
    document.body.append(showedStockDiv);
    let userId = document.querySelector('#userDiv').dataset.id;
    console.log(this)
    StocksAdapter.getWatchlistOptions(userId);
  }
  

  static createOption(watchlist) {
    let option = document.createElement("option")
    option.innerText = watchlist.name
    option.dataset.id = watchlist.id
    let select = document.querySelector('#watchlist-select');
    select.append(option);
  }

  static makeCurrentWatchlist(watchlistData) {
    let currentWatchlist = document.querySelector('#current-watchlist');
    currentWatchlist.innerHTML = `
      <h3>${watchlistData.name}</h3>
      <ul id="listOfCurrentWatchlist"></ul>
    `
  }

  static addWatchListToDOM(watchlistId) {
    WatchListAdapter.getWatchList(watchlistId)
    .then(watchlistData => {
      //console.log(watchlistData);
      this.makeCurrentWatchlist(watchlistData)
      if (watchlistData.stock_cards.length > 0) { 
        for (let stock of watchlistData.stock_cards) {
          let stockLi = document.createElement("li");
          stockLi.innerHTML = `
          <p>${stock.name}</p>
          <button name="delete-from-list" id="delete-from-list">Remove</button>
          `
          console.log(stock);
      }}
    });
    //this.clickEvents();
  }

}

