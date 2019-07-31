const SEARCH_STOCK = document.querySelector('#search-stock');

// loads the content
document.addEventListener("DOMContentLoaded", event => {

});

SEARCH_STOCK.addEventListener('submit', event => {
	event.preventDefault();
	let input = event.target["stock-query"].value;
	StocksAdapter.getStockList()
	.then(stocks => StocksAdapter.search(stocks.symbolsList, input))
	.then(symbol => {
		if (symbol !== undefined){
			console.log(symbol)
			StocksAdapter.getCompanyProfile(symbol)
			.then(createDiv);
		}
		else {
			alert("Sorry, we could not find this stock for you. Try entering a different name.")
		}
	});
})

function createDiv(stockInfo) {
	let stockProfile = stockInfo.profile;
	let showedStockDiv = document.createElement("div");
	showedStockDiv.innerHTML = ` <h3>${stockProfile.companyName}</h3>
	            <h4>${stockInfo.symbol}</h4>
	            <p>${stockProfile.price}</p>
	            <p>${stockProfile.description}</p>
	            <p>${stockProfile.sector}</p>
	            <a href=${stockProfile.website}></a>
	            <img src=${stockProfile.image}>
	            `
	console.log(stockProfile)
	document.body.append(showedStockDiv);
}
