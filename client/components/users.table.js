import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const UsersTable = ({ classes }) => (
  <div>
    <Paper className={classes.root} elevation={4}>

      <Typography variant="headline" component="h3">
        This is a test
      </Typography>

      <Typography component="p">
        JS the best
      </Typography>

    </Paper>
  </div>
);

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: '50%',
  }),
});

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);
