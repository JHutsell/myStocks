class WatchListAdapter {

   static baseUrl() {
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
           headers: this.getTheHeadersPlease(),
           body: JSON.stringify(bodyObject)
       }
   }
}