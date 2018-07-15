import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MarketPricesList = observer(
    class MarketPricesList extends Component {

        valueUpDownClass = (value) => {
            return value >= 0 ? this.props.classes.valueUp : this.props.classes.valueDown
        }

        render() {
            const {classes} = this.props;
            return (<Table>
                <TableHead>
                    <TableRow>
                        <TableCell classes={{root: classes.marketListTableHeaderCell}}>Name</TableCell>
                        <TableCell classes={{root: classes.marketListTableHeaderCell}} numeric>Price</TableCell>
                        <TableCell classes={{root: classes.marketListTableHeaderCell}} numeric>Change1h</TableCell>
                        <TableCell classes={{root: classes.marketListTableHeaderCell}} numeric>Change24h</TableCell>
                        <TableCell classes={{root: classes.marketListTableHeaderCell}} numeric>Change7d</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.cryptoModel.listingsWithPrices.map(crypto => crypto.quotes[this.props.cryptoModel.currency] &&
                        <TableRow key={crypto.id}>
                            <TableCell classes={{root: classes.marketListTableCell}} component="td" scope="row">
                                <ListItem>
                                    <ListItemIcon>
                                        <img alt={crypto.symbol} src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${crypto.id}.png`} />
                                    </ListItemIcon>
                                    <ListItemText primary={crypto.name} secondary={crypto.symbol} />
                                </ListItem>
                            </TableCell>
                            <TableCell classes={{root: classes.marketListTableCell}} numeric >
                                <div className={this.valueUpDownClass(crypto.quotes[this.props.cryptoModel.currency].percent_change_24h)}>{crypto.quotes[this.props.cryptoModel.currency].price}</div>
                            </TableCell>
                            <TableCell classes={{root: classes.marketListTableCell}} numeric>
                                <div className={this.valueUpDownClass(crypto.quotes[this.props.cryptoModel.currency].percent_change_1h)}>{crypto.quotes[this.props.cryptoModel.currency].percent_change_1h}</div>
                            </TableCell>
                            <TableCell classes={{root: classes.marketListTableCell}} numeric>
                                <div className={this.valueUpDownClass(crypto.quotes[this.props.cryptoModel.currency].percent_change_24h)}>{crypto.quotes[this.props.cryptoModel.currency].percent_change_24h}</div>
                            </TableCell>
                            <TableCell classes={{root: classes.marketListTableCell}} numeric>
                                <div className={this.valueUpDownClass(crypto.quotes[this.props.cryptoModel.currency].percent_change_7d)}>{crypto.quotes[this.props.cryptoModel.currency].percent_change_7d}</div>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>)
        }
    }
);

export default MarketPricesList;

