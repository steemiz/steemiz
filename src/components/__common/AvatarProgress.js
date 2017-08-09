import React                         from 'react'
import Avatar                        from 'material-ui/Avatar'
import PropTypes                     from 'prop-types'


const AvatarProgress = ({className = "", size = "40px", progress, src, avatar_hover = true}) => {
	return (
		<div className={`avatar_progress ${className}`} data-progress={progress} data-size={size}>
			<div className="circle">
				<div className="mask full">
					<div className="fill"></div>
				</div>
				<div className="mask half">
					<div className="fill"></div>
					<div className="fill fix"></div>
				</div>
			</div>
			<div className="inset">
				<div className="avatar">
					<Avatar src={src} />
					{ avatar_hover ? <div className="avatar__hover"><span>{progress}</span></div> : null }
				</div>
			</div>
		</div>
	)
}

export default AvatarProgress

AvatarProgress.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string, // size of avatar
	progress: PropTypes.number, // string value in [24px 28px 32px 36px 40px 44px 48px] or you can define in _avatar-progress.scss
	src: PropTypes.string, // source of image
	avatar_hover: PropTypes.bool, // show progress when hover avatar
}
