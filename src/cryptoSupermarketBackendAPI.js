import axios from 'axios'

class CryptoSuperMarketBackendAPI {
    //url = "https://cryptosupermarket-backend.herokuapp.com"
    url = "http://localhost:8080"

    listings() {
        return axios.get(`${this.url}/listings`)         
    }

    listingsWithPrices(currency, search, sort, start, limit) {
        return axios.get(`${this.url}/listings/quotes/${currency}?start=${start}&limit=${limit}&search=${search}&sort=${sort}`)         
    }
}

export default new CryptoSuperMarketBackendAPI()