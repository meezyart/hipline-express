import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { asFreeForm } from '../../UI/FreeForm/toolkit'

import LoginStep from './LoginStep'
import ContactStep from './ContactStep'
import AcceptStep from './AcceptStep'


/**
 * RegistrationForm
 */

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props)
		const fieldConfig = this.sortFields(props)
		this.state = { fieldConfig }
	}

	componentWillReceiveProps(nextProps) {
		const fieldConfig = this.sortFields(nextProps)
		this.setState({ fieldConfig })
	}

	onSubmit(values) {
		this.props.registerUser(values)
	}

	sortFields(props = this.props) {
		if (!props.fieldConfig) return false
		return R.pipe(
			R.map(f => R.assoc('id', f.name, f)),
			R.reduce((acc, f) => R.assoc(f.name, f, acc), {}),
		)(props.fieldConfig)
	}

	render() {
		if (!this.state.fieldConfig) return null
		const loginFields = R.pick(['Email', 'Password', 'Password2'])(this.state.fieldConfig)
		const contactFields = R.pick(['FirstName', 'LastName', 'BirthDate', 'MobilePhone', 'AddressLine1', 'City', 'PostalCode', 'ReferredBy', 'ReferredByOtherText'])(this.state.fieldConfig)
		const acceptFields = R.pick(['LiabilityRelease', 'EmailOptIn'])(this.state.fieldConfig)

		const commonProps = {
			subscribe: this.props.subscribe,
			unsubscribe: this.props.unsubscribe,
			// emit: this.props.emit,
			updateField: this.props.updateField,
		}
		// return null
		return (
			<div className="form__steps">
				<LoginStep
					active={this.props.currentStep === 1}
					advance={this.props.advance}
					fieldConfig={loginFields}
					getFieldValues={this.props.getFieldValues}
					{...commonProps}
				/>
				{/* <ContactStep
					active={this.props.currentStep === 2}
					advance={this.props.advance}
					fieldConfig={contactFields}
					getFieldValues={this.props.getFieldValues}
					{...commonProps}
				/>
				<AcceptStep
					active={this.props.currentStep === 3}
					fieldConfig={acceptFields}
					getFieldValues={this.props.getFieldValues}
					{...commonProps}
				/> */}
			</div>
		)
	}
}

RegistrationForm.propTypes = {
	// registerUser: PropTypes.func.isRequired,
	// fieldConfig: PropTypes.arrayOf(PropTypes.shape),
	// currentStep: PropTypes.number.isRequired,
	// subscribe: PropTypes.func.isRequired,
	// unsubscribe: PropTypes.func.isRequired,
	// emit: PropTypes.func.isRequired,
}

RegistrationForm.defaultProps = {
	fieldConfig: undefined,
}

export default asFreeForm(RegistrationForm)
