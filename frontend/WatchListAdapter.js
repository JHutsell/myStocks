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

  static deleteWatchList(item) {
    fetch(this.baseUrl() + `watch_lists/` + item.dataset.id,  {
      method: "DELETE",
      headers: this.getHeaders()
    })
    .then(item.remove())
  }

  static changeName(item, name) {
    fetch(this.baseUrl() + `watch_lists/` + item.dataset.id, this.fetchConfig("PATCH", {name}))
    .then(temp => {
      item.innerHTML = `<span>${name}</span>`;
      item.innerHTML += `<button class="edit-list">Change Name</button>
      <button class="delete-list">Delete</button>`
      console.log(item)
      item.addEventListener('click', event => {
        if (event.target.tagName === 'SPAN') {
          StocksAdapter.addWatchListToDOM(event.target.parentElement.dataset.id)
        }
      });
    })
  }

  static clickEvents() {
    document.addEventListener('click', event => {
      // event.preventDefault()
      if (event.target.className === "delete-list") {
        this.deleteWatchList(event.target.parentElement);
      }
      else if (event.target.className === "edit-list") {
        let listItem = event.target.parentElement;
        listItem.innerHTML += `<form id="change-name"> 
          <label>Choose a new name for your watchlist: </label>
          <input name="new-name" type="text" placeholder="new watchlist">
          <button id="change-name" type="submit">Submit</button>
        </form>`;
        listItem.addEventListener('submit', event => {
          let newName = event.target["new-name"].value;
          this.changeName(event.target.parentElement, newName);
        })
        // console.log(event.target.parentElement)
        
      }
    })
  }

  static slapOnTheDOM(watchlistInfo) {
    let watchlist = document.querySelector('#watchlist-list');
    let listItem = document.createElement('li');
    watchlist.append(listItem);
    listItem.dataset.id = watchlistInfo.id;
    listItem.innerHTML += `<span>${watchlistInfo.name}</span>`;
    listItem.innerHTML += `<button class="edit-list">Change Name</button>
    <button class="delete-list">Delete</button>`;
    listItem.addEventListener('click', event => {
      if (event.target.tagName === 'SPAN') {
        StocksAdapter.addWatchListToDOM(event.target.parentElement.dataset.id)
      }
    });
  }


  static postWatchList(input) {
    fetch(this.baseUrl() + `watch_lists`, this.fetchConfig("POST", this.body(input)))
    .then(res => res.json())
    .then(this.slapOnTheDOM)
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


  static getWatchList(input) {
    console.log(input)
    return fetch(this.baseUrl() + `watch_lists/${input}`)
    .then(res => res.json())
  }


}