import React, { Component } from 'react';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
import './PostFeedEmbed.css';

export default class PostFeedEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIframe: false,
    };
  }

  renderThumbFirst(thumb) {
    return (
      <a className="postFeedEmbed" onClick={this.handleThumbClick}>
        <div className="postFeedEmbed-icon">
          <PlayIcon style={{ width: 60, height: 60 }} />
        </div>
        <img src={thumb} />
      </a>
    );
  }

  handleThumbClick = (e) => {
    e.stopPropagation();
    this.setState({ showIframe: true });
  };

  renderWithIframe(embed) {
    return (
      <div className="PostFeedCard__thumbs" dangerouslySetInnerHTML={{ __html: embed }} />
    );
  }

  render() {
    const { embed } = this.props;

    if (embed.provider_name === 'YouTube' && !this.state.showIframe) {
      return this.renderThumbFirst(embed.thumbnail);
    } else if (embed.embed) {
      return this.renderWithIframe(embed.embed);
    }
    return <div />;
  }
}
