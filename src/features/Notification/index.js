import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { selectNotificationState } from './selectors';
import { close, actionLaunchBegin } from './actions/notification';

class Notification extends Component {
  static propTypes = {
    notificationState: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
      actionName: PropTypes.string,
      actionFunction: PropTypes.func,
      status: PropTypes.oneOf(['success', 'warning', 'fail']),
    }).isRequired,
    close: PropTypes.func.isRequired,
    actionLaunch: PropTypes.func.isRequired,
  };

  render() {
    const { close, notificationState, actionLaunch } = this.props;
    const { isOpen, message, actionName, actionFunction } = notificationState;
    return (
      <Snackbar
        open={isOpen}
        message={message}
        action={actionName}
        autoHideDuration={4000}
        onActionTouchTap={() => actionLaunch(actionFunction)}
        onRequestClose={close}
      />
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  notificationState: selectNotificationState(),
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(close()),
  actionLaunch: actionFunction => dispatch(actionLaunchBegin(actionFunction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
