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
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FilterListIcon from '@material-ui/icons/FilterList';
import MarketPricesList from './MarketPricesList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

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
  green: {
    color: 'green'
  },
  red: {
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
});

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

    handleSortMenu = event => {
      this.props.cryptoModel.sortMenuAnchorEl = event.currentTarget
      this.props.cryptoModel.sortMenuOpen = true
    };

    handleClose = event => {
      this.props.cryptoModel.anchorEl = null
      this.props.cryptoModel.menuOpen = false
      this.props.cryptoModel.currency = event.currentTarget.textContent
      this.props.cryptoModel.reload()
    };

    handleSortMenuClose = event => {
      console.log(event.currentTarget.textContent)
      this.props.cryptoModel.sortMenuAnchorEl = null
      this.props.cryptoModel.sortMenuOpen = false
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
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    {this.props.cryptoModel.currency} Prices
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
                <MarketPricesList {...this.props} />
              </Paper>
            </div>
          }
          {this.props.cryptoModel.currentTab === 1 && <Paper>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                News title <Button variant="outlined" color="primary" aria-label="add" href="#text">More</Button>
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica 
              </Typography>
            </CardContent>
            </Card>
          </Paper>
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
