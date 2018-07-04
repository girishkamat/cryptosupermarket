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
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FilterListIcon from '@material-ui/icons/FilterList';
import MarketPricesList from './MarketPricesList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const styles = {
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
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  }
};

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const App = observer(

  class App extends Component {

    componentDidMount() {
      this.props.cryptoModel.reload()
    }

    handleScroll = (e) => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        this.props.cryptoModel.nextPage();
      }
    }

    handleChange = (cryptoId) => {
      this.props.cryptoModel.expanded = cryptoId
    }
    
    handleMenu = event => {
      this.props.cryptoModel.anchorEl = event.currentTarget
      this.props.cryptoModel.menuOpen = true
    };

    handleClose = event => {
      this.props.cryptoModel.anchorEl = null
      this.props.cryptoModel.menuOpen = false
      this.props.cryptoModel.currency = event.currentTarget.textContent
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
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Current Prices - {this.props.cryptoModel.currency}
                  </Typography>
                  <div>
                    <IconButton
                      aria-owns={this.props.cryptoModel.menuOpen ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
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
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>USD</MenuItem>
                      <MenuItem onClick={this.handleClose}>GBP</MenuItem>
                      <MenuItem onClick={this.handleClose}>EUR</MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
              <Paper style={{ maxHeight: 750, overflow: 'auto' }} onScroll={this.handleScroll.bind(this)}>
                <MarketPricesList {...this.props}/>
              </Paper>
            </div>
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
