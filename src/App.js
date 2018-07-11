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
  searchTextField: {
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

    handleCurrencyMenu = event => {
      this.props.cryptoModel.anchorEl = event.currentTarget
      this.props.cryptoModel.menuOpen = true

    };

    handleSortMenu = event => {
      this.props.cryptoModel.sortMenuAnchorEl = event.currentTarget
      this.props.cryptoModel.sortMenuOpen = true
    };

    handleCurrencyMenuClose = event => {
      this.props.cryptoModel.anchorEl = null
      this.props.cryptoModel.menuOpen = false
      if(event.currentTarget.textContent) {
        this.props.cryptoModel.currency = event.currentTarget.textContent
        this.props.cryptoModel.reload()
      }
    };

    handleSortMenuClose = event => {
      this.props.cryptoModel.sortMenuAnchorEl = null
      this.props.cryptoModel.sortMenuOpen = false
    };

    handleSearchChange = event => {
      this.props.cryptoModel.searchValue = event.target.value
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
                    className={classes.searchTextField}
                    value={this.props.cryptoModel.searchValue}
                    onChange={this.handleSearchChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                  </div>
                  <div>
                    <IconButton
                      aria-owns={this.props.cryptoModel.menuOpen ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleCurrencyMenu}
                      color="inherit"
                    >
                      <FilterListIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={this.props.cryptoModel.anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={this.props.cryptoModel.menuOpen}
                      onClose={this.handleCurrencyMenuClose}
                    >
                      <MenuItem onClick={this.handleCurrencyMenuClose}>USD</MenuItem>
                      <MenuItem onClick={this.handleCurrencyMenuClose}>GBP</MenuItem>
                      <MenuItem onClick={this.handleCurrencyMenuClose}>EUR</MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
              <Paper style={{ maxHeight: 750, overflow: 'auto' }} onScroll={this.handleScroll.bind(this)}>
                <MarketPricesList {...this.props} />
              </Paper>
            </div>
          }
          {this.props.cryptoModel.currentTab === 1 && <Paper><NewsList {...this.props}/></Paper>
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
