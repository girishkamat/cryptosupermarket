import {decorate, observable, action} from 'mobx'
import coinMarketCapAPI from './coinMarketCapAPI'

class CryptoModel {

    listings = []

    fetchListings() {
        return coinMarketCapAPI
        .fetchListings()
        .then((response) => {
            console.log(response)
            this.listings = response.data.data
        })
        .catch(function (error) {
            console.log(error);
        });        
    }
}

decorate(CryptoModel, {listings: observable, fetchListings: action})

export default CryptoModel