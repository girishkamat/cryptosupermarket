import {decorate, observable, action} from 'mobx'
import coinMarketCapAPI from './coinMarketCapAPI'

class CryptoModel {
    currentTab = 0
    listings = []
    currency = "EUR"
    start = 1
    limit = 20
    menuOpen = false
    anchorEl = null

    listingsWithPrices = () => {
        return coinMarketCapAPI
        .listingsWithPrices(this.currency, this.start, this.limit)       
    }

    nextPage = () => {
        this.start = this.start + this.limit;
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
            console.log(this.listings)
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
    reload: action,
    nextPage: action,
    handleTabChange: action})

export default CryptoModel