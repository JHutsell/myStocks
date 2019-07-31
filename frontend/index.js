const SEARCH_STOCK = document.querySelector('#search-stock');
const SIGN_IN = document.querySelector('#signin');
const SIGNED_IN = false;
const SING_IN_DIV = document.querySelector('.signin')


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
			.then(StocksAdapter.createDiv);
		}
		else {
			alert("Sorry, we could not find this stock for you. Try entering a different name.")
		}
	});
})



SIGN_IN.addEventListener('click', event => {
	let signInDIv = event.target.parentElement;
	signInDIv.innerHTML = `<form id="loginForm"> 
		<label> Username </label>
		<input name="username" type="text" placeholder="username">
		<button id= type="submit">Submit</button>
	</form>`;
});

SING_IN_DIV.addEventListener('submit', event => {
	event.preventDefault();
	SING_IN_DIV.innerHTML = `<button id="signout">Sign out</button>`;
})



