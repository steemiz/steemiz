import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CommentCard = ({ className = "", data, handleGoAhead }) => {
  return (
    <div className={`comment_card ${className}`}>
      <div className="comment_card__block comment_card__block--content">
        <Link to={data.link} className="comment_card__block">
          <h3>{data.title}</h3>
          <p>{data.content}</p>
        </Link>
        <div className="comment_card__block comment_card__block--info">
          <div className="float_right">
            <div className="author float_left">
              <p><span>by </span> {data.author.name} <i>{data.author.rate.toLocaleString()}</i></p>
            </div>
            <div className="datetime float_left">
              <p>{data.created_at} <Link to={data.tagLink}>{data.tag}</Link></p>
            </div>
          </div>
          <div className="details float_right">
            <button className="btn_go_ahead"><i className="material-icons" onClick={handleGoAhead}>forward</i>
            </button>
            <div className="price"><span>$</span>{data.price}</div>
            <div className="social_area social_area--like">
              <i className="material-icons">favorite</i>
              <span>{data.like.toLocaleString()}</span>
            </div>
            <div className="social_area social_area--comment">
              <i className="material-icons">sms</i>
              <span>{data.comment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CommentCard

CommentCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object, // data of a post
  handleGoAhead: PropTypes.func, // function to handle button go ahead
};
