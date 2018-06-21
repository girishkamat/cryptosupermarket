import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react'

const App = observer(

  class App extends Component {

    componentDidMount() {
      this.props.cryptoModel.fetchListings()
    }

    render() {
      return (
        <div className="App">
          {this.props.cryptoModel.listings.map(d => <p key={d.id}>{d.symbol}</p>)}
        </div>
      );
    }
  }
)
export default App;
