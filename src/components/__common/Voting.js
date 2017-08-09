import React                         from 'react'
import PropTypes                     from 'prop-types'
import { Link }                      from 'react-router'

import { Popover }                   from 'material-ui'

import { getRegExp }                 from '../__utilities'

import LoginForm                     from './LoginForm'

const VotingComponent = ({
	className, 
	data, 
	handleUpVote, 
	stateMoneyCard, 
	handleViewMoneyCard, 
	handleCloseMoneyCard, 
	stateVoteCard, 
	handleViewVoteCard, 
	handleCloseVoteCard, 
	optsLoginForm,  // optional of LoginForm
}) => {
	return (
		<div className={`Voting ${className}`}>
			<div className="Voting__button">
				<span title="Upvote" onClick={handleUpVote}>
					<i className="material-icons">forward</i>
				</span>
				<LoginForm 
					title="Returning Users: Login to Vote"
					openLoginForm={optsLoginForm.openLoginForm}
					handleCloseLoginForm={optsLoginForm.handleCloseLoginForm}
					formData={optsLoginForm.formData}
					formError={optsLoginForm.formError}
					handleRememberLogin={optsLoginForm.handleRememberLogin}
					handleSignIn={optsLoginForm.handleSignIn}
					dataFormLogin={optsLoginForm.dataFormLogin}
				/>
			</div>
			<div className="Voting__money">
				<span onClick={handleViewMoneyCard}>${data.money.toLocaleString()}</span>
				<Popover
				  open={stateMoneyCard.open}
				  anchorEl={stateMoneyCard.anchorEl}
				  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				  targetOrigin={{horizontal: 'left', vertical: 'top'}}
				  onRequestClose={handleCloseMoneyCard}
				>
					<div className="MoneyCard">
						<p>Potential Payout ${data.money.toLocaleString()}</p>
						<p>in {data.time}</p>
					</div>
				</Popover>
			</div>
			<div className="Voting__voters_list">
				<span onClick={handleViewVoteCard}>{data.vote_list.length.toLocaleString()} votes</span>
				<Popover
				  open={stateVoteCard.open}
				  anchorEl={stateVoteCard.anchorEl}
				  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				  targetOrigin={{horizontal: 'left', vertical: 'top'}}
				  onRequestClose={handleCloseVoteCard}
				>
					<div className="VoteCard">
						<ul>
							{
								data.vote_list.map(item => {
									return (
										<li key={item.id}><Link to={`/users/${item.id}/profile`}>{item.name}</Link></li>
									)
								})
							}
						</ul>
					</div>
				</Popover>
			</div>
		</div>
	)
}

VotingComponent.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object, // data of author
	handleUpVote: PropTypes.func, 
	stateMoneyCard: PropTypes.object,
	handleViewMoneyCard: PropTypes.func,
	handleCloseMoneyCard: PropTypes.func,
	stateVoteCard: PropTypes.object,
	handleViewVoteCard: PropTypes.func,
	handleCloseVoteCard: PropTypes.func,
	optsLoginForm: PropTypes.object, // optional of LoginForm
}

export default class Voting extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stateMoneyCard: {
				open: false
			}, 
			stateVoteCard: {
				open: false
			},
			openLoginForm: false,
			formError: {}
		}

		this.formData = {}

		this.dataFormLogin = {}
	}

	handleViewMoneyCard = (event) => {
		// This prevents ghost click.
		event.preventDefault()

		this.setState({
			stateMoneyCard: {
				open: true,
				anchorEl: event.currentTarget,
			}
		})
	}

	handleCloseMoneyCard = () => {
		this.setState(state => {state.stateMoneyCard.open = false})
	}


	handleViewVoteCard = (event) => {
		// This prevents ghost click.
		event.preventDefault()

		this.setState({
			stateVoteCard: {
				open: true,
				anchorEl: event.currentTarget,
			}
		})
	}

	handleCloseVoteCard = () => {
		this.setState(state => {state.stateVoteCard.open = false})
	}

	handleUpVote = () => {
		// check Logged here, you must manage state isLogged as a Global variable
		// right now it is just temporary
		let isLogged = false

		if (!isLogged) {
			this.setState(state => {state.openLoginForm = true})
		} else {
			console.log("handleUpVote default")

			// If you have special action
			if (this.props.onUpVote) this.props.onUpVote()
		}
	}

	handleCloseLoginForm = () => {
		this.setState(state => {state.openLoginForm = false})
	}

	handleRememberLogin = (event, isInputChecked) => {
		this.dataFormLogin.remember = isInputChecked
	}

	handleSignIn = () => {
		let countError = 0
		for (let inputRef in this.formData) {
			let input = this.formData[inputRef].input
			if (!getRegExp.typeString().test(input.value)) {
				countError++
				this.dataFormLogin[input.name] = null
				this.setState((state) => { state.formError[input.name] = "This field is not null." })
			} else {
				this.setState((state) => { state.formError[input.name] = null })
				this.dataFormLogin[input.name] = input.value
			}
		}

		console.log(this.dataFormLogin)

		if(countError === 0) {
			this.handleCloseLoginForm()
		}
	}

	render() {
		return (
			<VotingComponent
				className={ this.props.className || "" }
				data={ this.props.data || {} }

				handleUpVote={this.handleUpVote}
				stateMoneyCard={this.state.stateMoneyCard}
				handleViewMoneyCard={ this.handleViewMoneyCard }
				handleCloseMoneyCard={this.handleCloseMoneyCard}
				stateVoteCard={this.state.stateVoteCard}
				handleViewVoteCard={ this.handleViewVoteCard }
				handleCloseVoteCard={this.handleCloseVoteCard}
				optsLoginForm={{
					openLoginForm: this.state.openLoginForm,
					handleCloseLoginForm: this.handleCloseLoginForm,
					formData: this.formData,
					formError: this.state.formError,
					handleRememberLogin: this.handleRememberLogin,
					handleSignIn: this.handleSignIn,
					dataFormLogin: this.dataFormLogin,
				}}
			/>
		)
	}
}

Voting.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object.isRequired, // data of author
	onUpVote: PropTypes.func, // handle up vote if you have different action for UpVote button
}
