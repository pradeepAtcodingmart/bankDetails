import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

import '../../assets/css/common.css';
import Bank from '../../modules/bank';

import { sideBarData } from '../../services/constants';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    color: 'white',
    backgroundColor: '#273035',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  toolBarContent: {
    background: '#56b597',
  },

  sidebarContent: {
    fontSize: '15px',
    cursor: 'arrow !important',
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: 'hidden',
    backgroundColor: '#273035',
    border: '0px',
  },
  content: {
    background: '#e8eff5',
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: '100%',
  },
  activeItem: {
    color: '#C0C0C0',
    fontSize: '14px',
    background: 'black',
  },
  inActiveItem: {
    color: '#C0C0C0',
    fontSize: '14px',
  },
  list: {
    padding: '0px',
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [current, setCurrent] = React.useState('');

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  React.useEffect(() => {
    // handleSidebar();
  }, [current]);

  function activeRoute(pathName) {
    return window.location.pathname.indexOf(pathName) > -1;
  }

  const drawer = (
    <div>
      <div className={classes.toolBarContent}>
        <div className={classes.toolbar}></div>
      </div>
      <div>
        <Divider />
        <div className={classes.sidebarContent}>
          <List className={classes.list}>
            {sideBarData.map((data) => (
              <React.Fragment key={data.text}>
                <Link to={`/${data.url}`}>
                  <ListItem
                    className={`${
                      activeRoute(data.url)
                        ? classes.activeItem
                        : classes.inActiveItem
                    } my-list`}
                    onClick={() => setCurrent(data.url)}
                  >
                    <ListItemIcon
                      className={
                        activeRoute(data.url)
                          ? classes.activeItem
                          : classes.inActiveItem
                      }
                    >
                      <Icon>{data.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={data.text} />
                  </ListItem>
                </Link>
              </React.Fragment>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} color='default'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Router>
        <nav className={classes.drawer} aria-label='Mailbox folders'>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            <Drawer
              container={container}
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path=''>
            <Bank />
          </Route>
        </main>
      </Router>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
};

export default withRouter(ResponsiveDrawer);
