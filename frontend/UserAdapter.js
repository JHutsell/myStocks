class UserAdapter {

	static baseUrl() {
		return `https://localhost:3000`;
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
      body: JSON.stringify(bodyObject);
    }
  }

  static getUser(userId) {
  	return fetch(this.baseUrl() + `/users/${userId}`)
  	.then(res => res.json());
  }
}