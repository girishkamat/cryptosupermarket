import axios from 'axios'

class CryptoControlIOAPI {
    //url = "https://cryptocontrol.io"
    url = "https://mockcoinmarketcap.herokuapp.com"
    //url = "http://localhost:9000"

    fetchNews() {
        return axios.get(`${this.url}/api/v1/public/news?key=addbeee4c2bc829e3659db04f27c257d`)         
    }
}

export default new CryptoControlIOAPI()