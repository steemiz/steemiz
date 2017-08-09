import React                         from 'react'
import PropTypes                     from 'prop-types'

import Author                        from './Author'
import Voting                        from './Voting'
import MarkdownEditor                from './MarkdownEditor'
import Markdown                      from './Markdown'

const CommentComponent = props => {
	return (
		<div className="CommentComponent">
			<div className="CommentComponent__avatar">
				<img src={props.data.author.avatar} alt=""/>
			</div>
			<div className="CommentComponent__detail">
				<div className="CommentComponent__head">
					<Author data={props.data.author} />
					<span className="timestamp">{props.data.time}</span>
				</div>
				<div className="CommentComponent__body">
					<div className="CommentComponent__content">
						<Markdown  text={props.data.content}/>
					</div>
				</div>
				<div className="CommentComponent__footer">
					<Voting data={props.data.voting} />
					<span className="CommentComponent__reply" onClick={props.onReply}>Reply</span>
				</div>
			</div>
		</div>
	)
}

CommentComponent.propTypes = {
	data: PropTypes.object.isRequired, // data of comment
	onReply: PropTypes.func, 
}

export default class Comment extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			replyComment: false
		}
	}

	handlePostComment = content => {
		console.log("handlePostComment")
		console.log(content)
		this.setState(state => {state.replyComment = null})

		// If you have other scenario for this action
		if (this.props.handlePostComment) this.props.handlePostComment()
	}

	handleCancelComment = () => {
		console.log("handleCancelComment")
		this.setState(state => {state.replyComment = false})

		// If you have other scenario for this action
		if (this.props.handleCancelComment) this.props.handleCancelComment()
	}

	handleReply = e => {
		if (this.props.mode !== "popup") {
			let rootCommentElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
			let replyElement = rootCommentElement.querySelector('.Comment__reply')

			// scroll to write comment area
			window.scrollBy(0, replyElement.getBoundingClientRect().top)
		}

		this.setState(state => {state.replyComment = true})
	}

	render() {
		return (
			<div className="Comment">
				<div className="Comment__parent">
					<CommentComponent
						data={this.props.dataRootComment}
						onReply={this.handleReply}
					/>
				</div>
				<div className="Comment__child">
					{
						this.props.dataChildComments.map((item, index) => {
							return (
								<CommentComponent
									key={index}
									data={item.data}
									onReply={this.handleReply}
								/>
							)
						})
					}
					<div className="Comment__reply">
						{
							this.state.replyComment ? <MarkdownEditor onPost={this.handlePostComment} onCancel={this.handleCancelComment} /> : null
						}
					</div>
				</div>
			</div>
		)
	}
}

Comment.propTypes = {
	dataRootComment: PropTypes.object.isRequired,
	dataChildComments: PropTypes.array.isRequired,
	handleCancelComment: PropTypes.func,
	handlePostComment: PropTypes.func,
	mode: PropTypes.string,
}
