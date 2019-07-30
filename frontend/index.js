const SEARCH_STOCK = document.querySelector('#search-stock');

// loads the content
document.addEventListener("DOMContentLoaded", event => {

});

SEARCH_STOCK.addEventListener('submit', event => {
	event.preventDefault();
	let input = event.target["stock-query"].value;
	StocksAdapter.getStockList()
	.then(stocks => StocksAdapter.search(stocks.symbolsList, input))
})