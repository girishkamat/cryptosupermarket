import {decorate, observable, action} from 'mobx'
import coinMarketCapAPI from './coinMarketCapAPI'

class CryptoModel {
    currentTab = 0
    listings = []
    numOfCryptos = 0
    currency = "EUR"
    start = 1
    limit = 20
    anchorEl = null
    menuOpen = false
    sortMenuAnchorEl = null
    sortMenuOpen = false

    listingsWithPrices = () => {
        return coinMarketCapAPI
        .listingsWithPrices(this.currency, this.start, this.limit)       
    }

    nextPage = () => {
        let newStart = this.start + this.limit;
        if(newStart >= this.numOfCryptos) {
           return     
        }
        this.start = newStart
        return this.listingsWithPrices()
        .then((response) => {
            this.listings = this.listings.concat(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }

    reload = () => {
        this.start = 1
        this.limit = 20
        return this.listingsWithPrices()
        .then((response) => {
            this.listings.replace(response.data.data)
            this.numOfCryptos = response.data.metadata.num_cryptocurrencies
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleTabChange = (event, value) => {
        this.currentTab = value
    }
}

decorate(CryptoModel, {
    currentTab: observable,
    listings: observable, 
    currency: observable, 
    menuOpen: observable,
    sortMenuOpen: observable,
    reload: action,
    nextPage: action,
    handleTabChange: action})

export default CryptoModel