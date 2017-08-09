import React                         from 'react'
import PropTypes                     from 'prop-types'
import marked                        from 'marked'

const Markdown = props => {
	return ( 
		<div dangerouslySetInnerHTML={{
			__html: marked(props.text, {sanitize: true, breaks: true})
		}}></div>
	)
}

export default Markdown

Markdown.defaultProps = {
	text: '',
}

Markdown.propTypes = {
	text:PropTypes.string,
}
