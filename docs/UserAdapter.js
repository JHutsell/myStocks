class UserAdapter {

	static baseUrl() {
		return `http://localhost:3000/`;
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

  static getUsers() {
    return fetch(this.baseUrl() + `users`)
    .then(res => res.json());
  }

  static getUser(userId) {
  	return fetch(this.baseUrl() + `users/${userId}`)
  	.then(res => res.json());
  }

  static createUser(name) {
    return fetch(this.baseUrl() + `users`, this.fetchConfig("POST", {name}))
    .then(res => res.json());
  }

}