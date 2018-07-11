import axios from 'axios'

class CryptoSuperMarketBackendAPI {
    url = "https://cryptosupermarket-backend.herokuapp.com"
    //url = "http://localhost:8080"

    listings() {
        return axios.get(`${this.url}/listings`)         
    }

    listingsWithPrices(currency, filter, start, limit) {
        return axios.get(`${this.url}/listings/quotes/${currency}?start=${start}&limit=${limit}&filter=${filter}`)         
    }
}

export default new CryptoSuperMarketBackendAPI()