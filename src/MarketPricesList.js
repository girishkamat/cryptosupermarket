import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MarketPricesList = observer(
    class MarketPricesList extends Component {

        getUpOrDownColor = (value) => {
            return { color: value >= 0 ? 'green' : 'red' }
        }

        render() {
            return (<Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell numeric>Change1h</TableCell>
                        <TableCell numeric>Change24h</TableCell>
                        <TableCell numeric>Change7d</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.cryptoModel.listings.map((crypto) => crypto.quotes[this.props.cryptoModel.currency] &&
                        <TableRow key={crypto.id}>
                            <TableCell component="th" scope="row">
                                <ListItem>
                                    <ListItemIcon>
                                        <img alt={crypto.symbol} src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${crypto.id}.png`} />
                                    </ListItemIcon>
                                    <ListItemText primary={crypto.name} secondary={crypto.symbol} />
                                </ListItem>
                            </TableCell>
                            <TableCell numeric style={{ ...this.getUpOrDownColor(crypto.quotes[this.props.cryptoModel.currency].percent_change_24h) }}>
                                {crypto.quotes[this.props.cryptoModel.currency].price}
                            </TableCell>
                            <TableCell numeric style={{ ...this.getUpOrDownColor(crypto.quotes[this.props.cryptoModel.currency].percent_change_1h) }}>
                                {crypto.quotes[this.props.cryptoModel.currency].percent_change_1h}
                            </TableCell>
                            <TableCell numeric style={{ ...this.getUpOrDownColor(crypto.quotes[this.props.cryptoModel.currency].percent_change_24h) }}>
                                {crypto.quotes[this.props.cryptoModel.currency].percent_change_24h}
                            </TableCell>
                            <TableCell numeric style={{ ...this.getUpOrDownColor(crypto.quotes[this.props.cryptoModel.currency].percent_change_7d) }}>{crypto.quotes[this.props.cryptoModel.currency].percent_change_7d}</TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>)
        }
    }
);

export default MarketPricesList;

