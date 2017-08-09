import React                         from 'react'
import PropTypes                     from 'prop-types'
import { Link }                      from 'react-router'

const TagListComponent = ({
	className, 
	data, 
}) => {
	return (
		<div className={`TagList ${className}`}>
			{
				data.map(tag => {
					return (
						<Link key={tag.id} to={tag.link} className="TagList__tag">{tag.name}</Link>
					)
				})
			}
		</div>
	)
}

TagListComponent.propTypes = {
	className: PropTypes.string,
	data: PropTypes.array, // data of tags
}

export default class TagList extends React.Component {
	render() {
		return (
			<TagListComponent
				className={ this.props.className || "" }
				data={ this.props.data || {} }
			/>
		)
	}
}

TagList.propTypes = {
	className: PropTypes.string,
	data: PropTypes.array, // data of tags
}
