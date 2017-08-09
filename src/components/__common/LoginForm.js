import React                         from 'react'
import PropTypes                     from 'prop-types'
import { Link }                      from 'react-router'

import Dialog                        from 'material-ui/Dialog'
import TextField                     from 'material-ui/TextField'
import Checkbox                      from 'material-ui/Checkbox'
import FlatButton                    from 'material-ui/FlatButton'
import RaisedButton                  from 'material-ui/RaisedButton'

const LoginForm = ({
	className = "", 
	title, 
	openLoginForm,
	handleCloseLoginForm,
	formData,
	formError,
	handleRememberLogin,
	handleSignIn,
	dataFormLogin,
}) => {
	return (
		<Dialog
			title={title}
			modal={false}
			autoScrollBodyContent={true}
			titleStyle={{padding: "12px 24px"}}
			open={openLoginForm}
			onRequestClose={handleCloseLoginForm}
		>
			<div className={`LoginForm ${className}`}>
				<TextField
					className="input__group"
					errorText={formError.username || null}
					floatingLabelText="Username"
					name="username"
					defaultValue={dataFormLogin.username}
					ref={ ref=>{formData.InputUsername = ref} }
				/>
				<TextField
					className="input__group"
					errorText={formError.password || null}
					type="password"
					floatingLabelText="Password"
					name="password"
					defaultValue={dataFormLogin.password}
					ref={ ref=>{formData.InputPassword = ref} }
				/>
				<Checkbox
					label="Keep me logged in"
					onCheck={handleRememberLogin}
					style={{marginTop: "1rem"}}
					labelStyle={{color: "#8a8a8a"}}
					defaultChecked={dataFormLogin.remember}
				/>
				<p>This operation requires your Posting key or Master password.</p>
				<div className="LoginForm__button">
					<RaisedButton
						label="SIGN IN"
						primary={true}
						onTouchTap={handleSignIn}
					/>
					<FlatButton
						label="CANCEL"
						primary={true}
						onTouchTap={handleCloseLoginForm}
					/>
				</div>
				<hr/>
				<p>Join our <strong>amazing community</strong> to comment and reward others.</p>
				<Link to="signup" style={{textAlign: "center", display: "inherit"}}>
					<RaisedButton
						label="Sign up now to receive FREE STEEM"
						primary={true}
						labelStyle={{textTransform: 'initial'}}
						buttonStyle={{background: "#368dd2"}}
					/>
				</Link>
			</div>
		</Dialog>
	)
}

export default LoginForm

LoginForm.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	openLoginForm: PropTypes.bool,
	handleCloseLoginForm: PropTypes.func,
	formData: PropTypes.object,
	formError: PropTypes.object,
	handleRememberLogin: PropTypes.func,
	handleSignIn: PropTypes.func,
	dataFormLogin: PropTypes.object, // all values were typed by user
}
