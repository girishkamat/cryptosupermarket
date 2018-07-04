import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CryptoModel from './CryptoModel'

const cryptoModel = new CryptoModel()

ReactDOM.render(<App cryptoModel={cryptoModel}/>, document.getElementById('root'));
registerServiceWorker();

