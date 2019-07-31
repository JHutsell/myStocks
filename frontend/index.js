const SEARCH_STOCK = document.querySelector('#search-stock');
const SIGN_IN = document.querySelector('#signin');
const SIGNED_IN = false;
const SIGN_IN_DIV = document.querySelector('.signin')


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

SIGN_IN_DIV.addEventListener('submit', event => {
	event.preventDefault();
	let input = event.target.username.value;
	UserAdapter.getUsers()
	.then(users => {
		console.log(users)
		for (user of users) {
			if (user.name.toLowerCase() === input.toLowerCase()) {
				SIGN_IN_DIV.innerText += `Signed in as ${input}`;
				SIGN_IN_DIV.innerHTML = `<button id="signout">Sign out</button>`;
				return;
			}
		}
		console.log("test");
		alert("An incorrect username has been provided.");
	})
});

SIGN_IN_DIV.addEventListener('click', event => {
	if (event.target.id === "signout") {
		location.reload();
	}
});





