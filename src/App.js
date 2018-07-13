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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ListItem } from '../node_modules/@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    flexGrow: 1,

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
    width: "70px",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    background: 'white'
  },
  appFrame: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: 240,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 0px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -240,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
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

    handleDrawerOpen = () => {
      this.props.cryptoModel.drawerOpen = true;
    };

    handleDrawerClose = () => {
      this.props.cryptoModel.drawerOpen = false;
    };

    handleSearchChange = event => {
      this.props.cryptoModel.searchValue = event.target.value
      this.props.cryptoModel.reload()
    };

    handleCurrencyChange = event => {
      this.props.cryptoModel.currency = event.target.value
      this.props.cryptoModel.reload()
    };

    toggleDrawer = open => {
      this.props.cryptoModel.drawerOpen = open
    };

    handleDrawerItemClick = (item) => {
      this.toggleDrawer(false)
      var sortOrder = "desc";
      if(this.props.cryptoModel.sort.indexOf(item) != -1 && 
          this.props.cryptoModel.sort.indexOf("desc") != -1) {
        sortOrder = "asc"
      }
      this.props.cryptoModel.sort = item + " " + sortOrder;
      this.props.cryptoModel.reload()
    };

    render() {
      const { classes, theme } = this.props;
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
            <div className={classes.appFrame}>
              <AppBar className={classNames(classes.appBar, {
                [classes.appBarShift]: this.props.cryptoModel.drawerOpen,
                [classes[`appBarShift-left`]]: this.props.cryptoModel.drawerOpen,
              })}>
                <Toolbar disableGutters={!this.props.cryptoModel.drawerOpen}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(classes.menuButton, this.props.cryptoModel.drawerOpen && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
       
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
                </Toolbar>
              </AppBar>
              <Drawer variant="persistent"
                anchor="left"
                open={this.props.cryptoModel.drawerOpen}
                classes={{
                  paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <List
                  component="nav"
                  subheader={<ListSubheader component="div">Sort By</ListSubheader>}
                >
                  <ListItem button onClick={() => this.handleDrawerItemClick('price')}>
                    <ListItemText primary="Price" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleDrawerItemClick('percentage1h')}>
                    <ListItemText primary="Percentage Change1h" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleDrawerItemClick('percentage24h')}>
                    <ListItemText primary="Percentage Change24h" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleDrawerItemClick('percentage7d')}>
                    <ListItemText primary="Percentage Change7d" />
                  </ListItem>
                </List>
              </Drawer>
              <main
                className={classNames(classes.content, classes[`content-left`], {
                  [classes.contentShift]: this.props.cryptoModel.drawerOpen,
                  [classes[`contentShift-left`]]: this.props.cryptoModel.drawerOpen,
                })}
              >
                <div className={classes.drawerHeader} />
                <Paper style={{ maxHeight: 750, overflow: 'auto' }} onScroll={this.handleScroll.bind(this)}>
                  <MarketPricesList {...this.props} />
                </Paper>
              </main>
            </div>
          }
          {this.props.cryptoModel.currentTab === 1 &&
            <Paper><NewsList {...this.props} /></Paper>
          }
        </MuiThemeProvider>
      );
    }
  }
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
