import axios from 'axios'

class CoinMarketCapAPI {
    url = "https://mockcoinmarketcap.herokuapp.com"

    listingsWithPrices(currency, start, limit) {
        return axios.get(`${this.url}/v2/ticker/?structure=array&start=${start}&limit=${limit}&convert=${currency}`)         
    }
}

export default new CoinMarketCapAPI()