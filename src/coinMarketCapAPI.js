import axios from 'axios'

class CoinMarketCapAPI {
    listingsWithPrices(currency, start, limit) {
        return axios.get(`http://localhost:9000/v2/ticker/?structure=array&start=${start}&limit=${limit}&convert=${currency}`)         
    }
}

export default new CoinMarketCapAPI()