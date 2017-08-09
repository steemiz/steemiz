import React                         from 'react'
import { Link }                      from 'react-router'
import PropTypes                     from 'prop-types'

const PostCard = ({className = "", data, styleShow = "", handleGoAhead, handleProcessLink = () => {} }) => {
	return (
		<div className={`post_card ${className}`} data-style={styleShow}>
			<Link onClick={handleProcessLink(data.id)} to={`/posts/${data.id}`} className="post_card__block post_card__block--img" style={{background: `url(${data.img}) no-repeat transparent center center / cover`}}/>
			<div className="post_card__block post_card__block--content">
				<Link onClick={handleProcessLink(data.id)} to={`/posts/${data.id}`} className="post_card__block">
					<h3>{data.title}</h3>
					<p>{data.content}</p>
				</Link>
				<div className="post_card__block post_card__block--info">
					<div className="float_right">
						<div className="author float_left">
							<p><span>by </span> {data.author.name} <i>{data.author.rate.toLocaleString()}</i></p>
						</div>
						<div className="datetime float_left">
							<p>{data.created_at} <Link to={data.tagLink}>{data.tag}</Link></p>
						</div>
					</div>
					<div className="details float_right">
						<button className="btn_go_ahead"><i className="material-icons" onClick={handleGoAhead}>forward</i></button>
						<div className="price"><span>$</span>{data.price}</div>
						<Link title="Favorites" className="social_area social_area--like">
							<i className="material-icons">favorite</i>
							<span>{data.like.toLocaleString()}</span>
						</Link>
						<Link title="Responses" to={`/posts/${data.id}#comments`} className="social_area social_area--comment">
							<i className="material-icons">sms</i>
							<span>{data.comment.toLocaleString()}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostCard

PostCard.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object, // data of a post
	styleShow: PropTypes.string, // view all postcard with grid column of grid row
	handleGoAhead: PropTypes.func, // function to handle button go ahead
	handleProcessLink: PropTypes.func, // handle link before an event default
}
