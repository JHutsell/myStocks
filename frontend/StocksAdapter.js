class Stocks {

	static baseUrl() {
		return `https://financialmodelingprep.com/api/v3`;
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