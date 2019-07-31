class WatchListAdapter {
  static baseUrl() {
    return `http://localhost:3000/`;
  }

   static userUrl() {
     let signin = document.querySelector('#userDiv');
     return UserAdapter.getUser(signin.dataset.id);
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

   static body(name) {
    let user_id = parseInt(document.querySelector('#userDiv').dataset.id);
    return {name, user_id}
   }

   static slapOnTheDOM(watchlistInfo) {
     let watchlist = document.querySelector('#watchlist-list');
     let listItem = document.createElement('li');
     watchlist.append(listItem);
     listItem.dataset.id = watchlistInfo.id;
     listItem.innerText += watchlistInfo.name;
     watchlist.appened;
   }

   static postWatchList(input) {
    fetch(this.baseUrl() + `watch_lists`, this.fetchConfig("POST", this.body(input)))
    .then(res => res.json())
    .then(this.slapOnTheDOM)
  }

  // static addWatchListsToDOM(userInfo) {
  //   for (let watchlist of userInfo.watch_lists) {
  //     this.slapOnTheDOM(watchlist);
  //   }
  // }

  static addWatchListsToDOM(userId) {
    UserAdapter.getUser(userId)
    .then(userData => {
      for (let wl of userData.watch_lists) {
        this.slapOnTheDOM(wl);
      }
    })
  }


}