import React                           from 'react'
import PropTypes                       from 'prop-types'
import { Link }                        from 'react-router'
import Author                          from '../__common/Author'
import Voting                          from '../__common/Voting'
import TagList                         from '../__common/TagList'
import MarkdownEditor                  from '../__common/MarkdownEditor'
import Comment                         from '../__common/Comment'

import { RaisedButton, SelectField, IconButton, MenuItem } from 'material-ui'


export default class PostDetail extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			replyRootPost: false,
			sortOrder: 1
		}
	}

	componentDidMount() {
		if (this.props.routerHash) {
			let heightHeader = 84
			window.scrollBy(0, document.querySelector(this.props.routerHash).getBoundingClientRect().top - heightHeader)
		} else {
			// Scroll to top page
			window.scrollBy(0, -10000)
		}
	}

	handlePostRootComment = content => {
		console.log("handlePostRootComment")
		console.log(content)

		this.setState(state => {state.replyRootPost = null});
	}

	handleCancelRootComment = () => {
		console.log("handleCancelRootComment")
		this.setState(state => {state.replyRootPost = null});
	}

	handleReply = () => {
		console.log("handleReply")
		this.setState(state => {state.replyRootPost = true })
	}

	handlePostChildComment = () => {
		console.log("handlePostChildComment")
	}

	handleCancelChildComment = () => {
		console.log("handleCancelChildComment")
	}

	render() {
		let data = this.props.data
		return (
			<div className="PostDetail">
				<div className="PostDetail__content">
					<article className="article">
						<div className="article__post">
							<h1>Post Title</h1>

							<div className="article__post__author">
								<img className="article__post__author__avatar" src={data.author.avatar} alt=""/>
								<Author data={data.author} />
								<span>in</span>
								<Link className="article__post__author__link" to="#">beer</Link>
							</div>

							<div className="article__post__detail">
								<div dangerouslySetInnerHTML={{
									__html: data.content
								}}></div>
							</div>
						</div>

						<TagList data={data.tags} />

						<div className="article__footer">
							<div className="article__footer__left">
								<div className="time_author">
									<i className="time_author__icon material-icons">watch_later</i>
									<span className="timestamp">7 hours ago</span>
									<span>by</span>
									<Author data={data.author} />
								</div>

								<Voting data={data.voting} />
							</div>

							<div className="article__footer__right">
								<div className="btn_resteem" title="Resteem"><IconButton><i className="fa fa-exchange" aria-hidden="true"></i></IconButton></div>
								<div><span className="btn_reply" title="Reply" onClick={this.handleReply}>Reply</span></div>
								<div className="statistics">
									<Link to="" title="Responses"><i className="fa fa-comments" aria-hidden="true"></i>5</Link>
									<Link to="" title="Views"><i className="fa fa-eye" aria-hidden="true"></i>186</Link>
								</div>
								<div>
									<Link to="#" target="_blank" title="Share on Facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></Link>
									<Link to="#" target="_blank" title="Share on Twitter"><i className="fa fa-twitter-square" aria-hidden="true"></i></Link>
									<Link to="#" target="_blank" title="Share on Linkedin"><i className="fa fa-linkedin-square" aria-hidden="true"></i></Link>
								</div>
							</div>

							<div>
								{
									this.state.replyRootPost ? <MarkdownEditor onPost={this.handlePostRootComment} onCancel={this.handleCancelRootComment}	/> : null
								}
							</div>
						</div>
					</article>
				</div>

				<div className="PostDetail__signup">
					<p>Authors get paid when people like you upvote their post.</p>
					<p>Join our amazing community to comment and reward others.</p>
					<Link to="/signup">
						<RaisedButton 
							label="Sign up now to receive FREE STEEM" 
							primary={true}
							labelStyle={{textTransform: 'initial'}}
							buttonStyle={{background: "#368dd2"}}
						>
						</RaisedButton>
					</Link>
				</div>

				<div id="comments" className="PostDetail__comments">
					<div className="PostDetail__comments__control">
						<SelectField
							floatingLabelText="Sort Order"
							value={this.props.sortOrder}
							onChange={this.props.onChangeSortOrder}
							style={{float: "right"}}
						>
							<MenuItem value={1} primaryText="Trending" />
							<MenuItem value={2} primaryText="Votes" />
							<MenuItem value={3} primaryText="Age" />
						</SelectField>
					</div>
					{
						data.comments.map((item, index) => {
							return (
								<Comment 
									key={index}
									mode={this.props.mode}
									dataRootComment={item.data}
									dataChildComments={item.child_comments}
									handleCancelComment={this.handleCancelChildComment}
									handlePostComment={this.handlePostChildComment}
								/>
							)
						})
					}
				</div>
			</div>
		)
	}
}

PostDetail.propTypes = {
	sortOrder: PropTypes.number,
	onChangeSortOrder: PropTypes.func,
	routerHash: PropTypes.string,
	mode: PropTypes.string,
}
