import React                         from 'react'
import PropTypes                     from 'prop-types'
import { FlatButton, RaisedButton }  from 'material-ui'

import Markdown                      from './Markdown'

const Editor = props => {
	return (
		<textarea rows="4" onChange={props.onEdit}>
		</textarea>
	)
}

Editor.propTypes = {
	onEdit:PropTypes.func.isRequired,
}


export default class MarkdownEditor extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			text: "",
		}

		this.x = 1
	}

	handleEdit = (e) => {
		this.setState({text: e.target.value})
	}

	render() {
		return (
			<div className="MarkdownEditor">
				<section className="MarkdownEditor__editor">
					<Editor onEdit={this.handleEdit} />
				</section>
				<section className="MarkdownEditor__control">
					<RaisedButton
						label="POST"
						primary={true}
						onTouchTap={() => this.props.onPost(this.state.text)}
						buttonStyle={{background: "#368dd2"}}
					/>
					<FlatButton
						label="CANCEL"
						primary={true}
						onTouchTap={this.props.onCancel}
					/>
				</section>
				{
					this.state.text ? (
						<section className="MarkdownEditor__preview">
							<label>Preview</label>
							<a id="markdown_guide" target="_blank" href="https://guides.github.com/features/mastering-markdown/" rel="noopener noreferrer">Markdown Styling Guide</a>
							<div className="MarkdownEditor__preview_content">
								<Markdown text={this.state.text} />
							</div>
						</section>
					) : null
				}
			</div>
		)
	}
}

MarkdownEditor.propTypes = {
	onPost:PropTypes.func,
	onCancel:PropTypes.func,
}
