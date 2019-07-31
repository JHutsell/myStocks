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
			console.log(StocksAdapter.getCompanyProfile(symbol));
		}
		else {
			alert("Sorry, we could not find this stock for you. Try entering a different name.")
		}
	});
})

// let showedStock = StocksAdapter.getCompanyProfile(symbol);
// let showedStockDiv = document.createElement("div");
            //console.log(showedStock)
            // showedStockDiv.innerHTML = ` <h3>${showedStock.companyName}</h3>
            //  <h4>${showedStock.symbol}</h4>
            //  <p>${showedStock.price}</p>
            //  <p>${showedStock.description}</p>
            //  <p>${showedStock.sector}</p>
            //  <a href=${showedStock.website}></a>
            
            // `
            // showedStockDisplay.append(showedStockDiv);
            //<img src=${showedStock.image}/>