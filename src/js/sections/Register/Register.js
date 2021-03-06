import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import axios from 'axios'

import RegistrationForm from './RegistrationForm'
import FormStepsHeader from '../../components/Forms/FormStepsHeader'

import { serializeForSoap } from '../../utils/mbo'

/**
 * Register
 */

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.advance = this.advance.bind(this)
    this.goBack = this.goBack.bind(this)
    this.closeDropdown = this.closeDropdown.bind(this)
    this.state = {
      currentStep: 1,
      totalSteps: 3,
    }
  }

  closeDropdown() {
    this.props.setDropdown(false)
  }

  advance() {
    const currentStep = Math.min(this.state.currentStep + 1, this.state.totalSteps)
    this.setState({ currentStep })
  }

  goBack() {
    const currentStep = Math.max(this.state.currentStep - 1, 1)
    this.setState({ currentStep })
  }

  handleSubmit(userInfo) {
    const serializedUserInfo = serializeForSoap(userInfo)
    axios
      .post('/api/mbo/register', serializedUserInfo)
      .then(response => {
        this.props.loginUser(response.data.Client)
      })
      .catch(err => {})
  }

  render() {
    const classNames = ['register', 'dropdown']
    if (this.props.open) classNames.push('dropdown--open')

    if (!this.props.fieldConfig) {
      return (
        <section className={cn(classNames)}>
          <h4>error?</h4>
        </section>
      )
    }
    return (
      <section className={cn(classNames)}>
        <div className="column sequentialForm">
          <button onClick={this.closeDropdown} className="dropdown__ex" />
          <FormStepsHeader {...this.state} advance={this.advance} goBack={this.goBack} />
          <RegistrationForm
            classNamePrefix=""
            advance={this.advance}
            currentStep={this.state.currentStep}
            onSubmit={this.handleSubmit}
            fieldConfig={this.props.fieldConfig}
            liabilityText={this.props.liabilityText}
          />
        </div>
      </section>
    )
  }
}

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registrationFields: PropTypes.arrayOf(PropTypes.shape),
}

Register.defaultProps = {
  registrationFields: undefined,
}

export default Register
