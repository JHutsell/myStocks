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



   static postWatchList(input) {
    fetch(this.baseUrl() + `watch_lists`, this.fetchConfig("POST", this.body(input)))
    .then(res => res.json())
    .then(console.log)
  }


}