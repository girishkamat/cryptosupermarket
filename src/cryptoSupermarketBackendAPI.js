import axios from 'axios'

class CoinMarketCapAPI {
    url = "https://cryptosupermarket-backend.herokuapp.com"
    //url = "http://localhost:8080"

    listingsWithPrices(currency, start, limit) {
        return axios.get(`${this.url}/listings/quotes/${currency}?start=${start}&limit=${limit}`)         
    }
}

export default new CoinMarketCapAPI()