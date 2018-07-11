import {decorate, observable, action} from 'mobx'
import cryptoSupermarketBackendAPI from './cryptoSupermarketBackendAPI'
import cryptoControlIOAPI from './cryptoControlIOAPI'

class CryptoModel {
    currentTab = 0
    listings = []
    listingsWithPrices = []
    news = []
    numOfCryptos = 0
    currency = "EUR"
    start = 1
    limit = 20
    anchorEl = null
    menuOpen = false
    sortMenuAnchorEl = null
    sortMenuOpen = false
    searchValue = ""

    fetchNews = () => {
        return cryptoControlIOAPI.fetchNews().then(response => {
            this.news.replace(response.data.slice(0,10))
        })
    }

    fetchListings = () => {
        return cryptoSupermarketBackendAPI
        .listings().then(response => {
            this.listings.replace(response.data.data)
        })      
    }

    fetchListingsWithPrices = () => {
        return cryptoSupermarketBackendAPI
        .listingsWithPrices(this.currency, this.searchValue, this.start, this.limit)       
    }

    nextPage = () => {
        let newStart = this.start + this.limit;
        if(newStart >= this.numOfCryptos) {
           return     
        }
        this.start = newStart
        return this.fetchListingsWithPrices()
        .then((response) => {
            if(response.data.data != null && response.data.data.length > 0) {
                this.listingsWithPrices = this.listingsWithPrices.concat(response.data.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }

    reload = () => {
        this.start = 1
        this.limit = 20
        return this.fetchListingsWithPrices()
        .then((response) => {
            this.listingsWithPrices.replace(response.data.data)
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
    listingsWithPrices: observable, 
    news: observable,
    currency: observable, 
    menuOpen: observable,
    sortMenuOpen: observable,
    searchValue: observable,
    reload: action,
    nextPage: action,
    handleTabChange: action})

export default CryptoModel