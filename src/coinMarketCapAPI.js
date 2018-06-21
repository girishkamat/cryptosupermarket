import axios from 'axios'

class CoinMarketCapAPI {
    fetchListings() {
        return axios.get('https://api.coinmarketcap.com/v2/listings/')         
    }
}

export default new CoinMarketCapAPI()