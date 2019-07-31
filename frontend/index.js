const SEARCH_STOCK = document.querySelector('#search-stock');
const SIGN_IN = document.querySelector('#signin');
const SIGNED_IN = false;
const SIGN_IN_DIV = document.querySelector('.signin')


// loads the content
document.addEventListener("DOMContentLoaded", event => {
});

document.addEventListener('submit', event => {
	event.preventDefault();
	console.log(event.target);
	if (event.target.id === "search-stock") {
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
	}
})



SIGN_IN.addEventListener('click', event => {
	let signInDIv = event.target.parentElement;
	signInDIv.innerHTML = `<form id="loginForm"> 
		<label> Username </label>
		<input name="username" type="text" placeholder="username">
		<button id= type="submit">Submit</button>
	</form>`;
});

SIGN_IN_DIV.addEventListener('submit', event => {
	event.preventDefault();
	let input = event.target.username.value;
	UserAdapter.getUsers()
	.then(users => {
		console.log(users)
		for (user of users) {
			if (user.name.toLowerCase() === input.toLowerCase()) {
				SIGN_IN_DIV.innerText = `Signed in as ${input}`;
				SIGN_IN_DIV.innerHTML += `<button id="signout">Sign out</button>`;
				document.body.innerHTML += `<form id="search-stock">
					<label for="stock-query">Search Stocks</label>
					<input name="stock" type="text" class="form-control" id="stock-query" placeholder="Enter Ticker or Name">
					<button type="submit">Submit</button>
				</form>
				<div id="watchlists">
					<h3>Watchlists</h3>
					<label for="new-watchlist">Create New Watchlist</label>
					<input name="watchlist" type="text" class="form-control" id="new-watchlist" placeholder="Enter Name for Watchlist">
					<button id="createWatchList" type="submit">Submit</button>
					<ul id="watchlist-list">
					</ul>
				</div>
				<div id="current-watchlist">
				</div>
				<div id="selected-stock">
				</div>`;
				let button=document.querySelector("#createWatchList")
				debugger
				button.addEventListener('click', event => {
					event.preventDefault();
					// if (event.target.id === "createWatchList") {
						console.log(event.target);
					// }
				});
				return;
			}
		}
		console.log("test");
		alert("An incorrect username has been provided.");
	})
});

document.addEventListener('click', event => {
	if (event.target.id === "signout") {
		location.reload();
	}
});





