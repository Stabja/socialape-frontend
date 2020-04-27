import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NavbarButton from '../util/NavbarButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../redux/actions/dataActions';


const styles = (theme) => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
});

const PostScream = (props) => {

  const { classes, UI: {loading} } = props;
  const [newScream, setNewScream] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setOpen(false);
      setErrors({});
      setNewScream({ body: '' });
    }
  }, [props.UI]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.clearErrors();
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewScream({ [event.target.name]: event.target.value });
    console.log(newScream);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postScream(newScream);
  };

  return (
    <div>
      <NavbarButton tip="Post a Scream!" onClick={handleOpen}>
        <AddIcon />
      </NavbarButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <NavbarButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </NavbarButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

const mapActionsToProps = {
  postScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));