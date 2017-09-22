import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import IconDone from 'material-ui/svg-icons/action/done';
import IconError from 'material-ui/svg-icons/alert/error';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import { lightGreen500, yellow500, red500 } from 'material-ui/styles/colors';
import { selectNotificationState } from './selectors';
import { close, actionLaunchBegin } from './actions/notification';
import './notification.css';

class Notification extends Component {
  static propTypes = {
    notificationState: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
      actionName: PropTypes.string,
      actionFunction: PropTypes.func,
      status: PropTypes.oneOf(['success', 'warning', 'fail', '']),
    }).isRequired,
    close: PropTypes.func.isRequired,
    actionLaunch: PropTypes.func.isRequired,
  };

  render() {
    const { close, notificationState, actionLaunch } = this.props;
    const { isOpen, status, message, actionName, actionFunction } = notificationState;
    let statusIcon = '';
    if (status === 'success') {
      statusIcon = <IconDone color={lightGreen500} />
    } else if (status === 'warning') {
      statusIcon = <IconWarning color={yellow500} />
    } else if (status === 'fail') {
      statusIcon = <IconError color={red500} />
    }

    return (
      <Snackbar
        open={isOpen}
        message={<div className="notification">{statusIcon}<span>{message}</span></div>}
        bodyStyle={{ padding: '0 20px 0 10px' }}
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
