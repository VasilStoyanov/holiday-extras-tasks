import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Navigation = props => (
  <div className={props.classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" variant="raised" className={props.classes.marginRight} color="secondary">
            Flicker API
        </Button>
        <Button component={Link} to="/users" variant="raised" color="default">
            Users API
        </Button>
      </Toolbar>
    </AppBar>

  </div>
);

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

  marginRight: {
    marginRight: 10,
  },
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
