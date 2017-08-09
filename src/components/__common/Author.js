import React                         from 'react'
import PropTypes                     from 'prop-types'

import Popover                       from 'material-ui/Popover'

import avatarDefault                 from '../../styles/assets/imgs/users/default.png'

const AuthorComponent = ({className, data, stateAuthorCard, handleViewAuthorCard, handleFollow, handleCloseAuthorCard}) => {
	return (
		<div className={`Author ${className}`}>
			<span className="Author__name" onClick={handleViewAuthorCard}>{data.name}</span>
			<span className="Author__reputation" title="Reputation">{data.reputation}</span>

	        <Popover
	          open={stateAuthorCard.open}
	          anchorEl={stateAuthorCard.anchorEl}
	          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
	          targetOrigin={{horizontal: 'left', vertical: 'top'}}
	          onRequestClose={handleCloseAuthorCard}
	        >
	        	<div className="AuthorCard">
	        		<div className="AuthorCard__avatar">
	        			<img src={data.avatar || avatarDefault} alt=""/>
	        		</div>
	        		<div className="AuthorCard__content">
	        			<p>{data.name}</p>
	        			<button onClick={handleFollow}>FOLLOW</button>
	        		</div>
	        		<p className="AuthorCard__slogan">{data.slogan}</p>
	        	</div>
	        </Popover>
		</div>
	)
}

AuthorComponent.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object, // data of author
	stateAuthorCard: PropTypes.object, 
	handleViewAuthorCard: PropTypes.func, // view author card after click on author's name
	handleFollow: PropTypes.func,
	handleCloseAuthorCard: PropTypes.func,
}

export default class Author extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stateAuthorCard: {
				open: false
			}
		}
	}

	handleViewAuthorCard = (event) => {
		// This prevents ghost click.
		event.preventDefault()

		this.setState({
			stateAuthorCard: {
				open: true,
				anchorEl: event.currentTarget,
			}
		})
	}

	handleCloseAuthorCard = () => {
		this.setState(state => {state.stateAuthorCard.open = false})
	}

	handleFollow = () => {
		console.log("handleFollow default for all Author")

		// If you have special action
		if (this.props.onFollow) this.props.onFollow()
	}

	render() {
		return (
			<AuthorComponent
				className={ this.props.className || "" }
				data={ this.props.data || {} }

				stateAuthorCard={this.state.stateAuthorCard}
				handleViewAuthorCard={ this.handleViewAuthorCard }
				handleFollow={this.handleFollow}
				handleCloseAuthorCard={this.handleCloseAuthorCard}
			/>
		)
	}
}

Author.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object.isRequired, // data of author
	onFollow: PropTypes.func, // handle follow if you have different action for follow button
}
