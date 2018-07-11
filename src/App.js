import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ChatIcon from '@material-ui/icons/Chat';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NewsList from './newsList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FilterListIcon from '@material-ui/icons/FilterList';
import MarketPricesList from './MarketPricesList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  valueUp: {
    color: 'green'
  },
  valueDown: {
    color: 'red'
  },
  card: {
    minWidth: 400,
    maxWidth: 700,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    background: 'white'
  },
  select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    background: 'white'
  }
});

const theme = createMuiTheme({
});

const App = observer(

  class App extends Component {

    componentDidMount() {
      this.props.cryptoModel.reload()
      this.props.cryptoModel.fetchListings()
      this.props.cryptoModel.fetchNews()
    }

    handleScroll = e => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        this.props.cryptoModel.nextPage();
      }
    };

    

    handleSortMenu = event => {
      this.props.cryptoModel.sortMenuAnchorEl = event.currentTarget
      this.props.cryptoModel.sortMenuOpen = true
    };

    handleSortMenuClose = event => {
      this.props.cryptoModel.sortMenuAnchorEl = null
      this.props.cryptoModel.sortMenuOpen = false
    };

    handleSearchChange = event => {
      this.props.cryptoModel.searchValue = event.target.value
      this.props.cryptoModel.reload()
    };

    handleCurrencyChange = event => {
      this.props.cryptoModel.currency = event.target.value
      this.props.cryptoModel.reload()
    };

    render() {
      const { classes } = this.props;
      return (
        <MuiThemeProvider theme={theme}>
          <AppBar position="static">
            <Tabs
              value={this.props.cryptoModel.currentTab}
              onChange={this.props.cryptoModel.handleTabChange}
              centered
            >
              <Tab icon={<TrendingUpIcon />} label="MARKET" />
              <Tab icon={<ChatIcon />} label="NEWS" />
            </Tabs>
          </AppBar>
          {this.props.cryptoModel.currentTab === 0 &&
            <div>
              <AppBar position="static">
                <Toolbar>
                  <div>
                    <IconButton
                      aria-owns={this.props.cryptoModel.sortMenuOpen ? 'sort-menu' : null}
                      className={classes.menuButton}
                      aria-haspopup="true"
                      color="inherit"
                      onClick={this.handleSortMenu}>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="sort-menu"
                      anchorEl={this.props.cryptoModel.sortMenuAnchorEl}
                      open={this.props.cryptoModel.sortMenuOpen}
                      onClose={this.handleSortMenuClose}
                    >
                      <MenuItem onClick={this.handleSortMenuClose}>Sort Price</MenuItem>
                      <MenuItem onClick={this.handleSortMenuClose}>Sort Change1h</MenuItem>
                      <MenuItem onClick={this.handleSortMenuClose}>Sort Change24h</MenuItem>
                      <MenuItem onClick={this.handleSortMenuClose}>Sort Change7d</MenuItem>
                    </Menu>
                  </div>
                  <div className={classes.flex}>
                    <TextField
                      id="search"
                      className={classes.textField}
                      value={this.props.cryptoModel.searchValue}
                      onChange={this.handleSearchChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  </div>
                  <div>
                    <Select
                      value={this.props.cryptoModel.currency}
                      onChange={this.handleCurrencyChange}
                      name="currency"
                      className={classes.select}
                      fullWidth
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                    </Select>
                  </div>
                </Toolbar>
              </AppBar>
              <Paper style={{ maxHeight: 750, overflow: 'auto' }} onScroll={this.handleScroll.bind(this)}>
                <MarketPricesList {...this.props} />
              </Paper>
            </div>
          }
          {this.props.cryptoModel.currentTab === 1 && <Paper><NewsList {...this.props} /></Paper>
          }
        </MuiThemeProvider>
      );
    }
  }
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
