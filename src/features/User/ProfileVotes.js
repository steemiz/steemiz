import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { FormattedRelative } from 'react-intl';

import { selectVoteHistory } from './selectors';
import { getVoteHistoryBegin } from './actions/getVoteHistory';

class ProfileVotes extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    getVoteHistory: PropTypes.func.isRequired,
    voteHistory: PropTypes.array,
  };

  static defaultProps = {
    voteHistory: undefined,
  };

  componentDidMount() {
    if (!this.props.voteHistory) {
      this.props.getVoteHistory();
    }
  }

  render() {
    const { voteHistory } = this.props;
    return (
      <div>
        {!isEmpty(voteHistory) && (
          <div className="votes_container clearfix">
            <div className="votes__body">
              <div className="votes__result votes__result--given">
                <div className="votes__result__number">
                  <h2>{voteHistory.length}</h2>
                  <p>Givens Upvotes</p>
                </div>
                <ul className="votes__result__list">
                  {
                    voteHistory.map((vote, index) => {
                      return (
                        <li key={`${vote.authorperm}-${index}`}>
                          <div className="timestamp">
                            <FormattedRelative value={`${vote.time}Z`} />
                          </div>
                          <div className="author">{ vote.author }</div>
                          <div className="source">
                            <Link to={`/trending/@${vote.authorperm}`}>{ vote.authorperm }</Link>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  voteHistory: selectVoteHistory(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getVoteHistory: () => dispatch(getVoteHistoryBegin(props.match.params.accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileVotes);
