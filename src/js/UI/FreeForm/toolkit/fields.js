import PropTypes from 'prop-types'
import R from 'ramda'
import cn from 'classnames'

import { withHandlers, getContext, compose, lifecycle, defaultProps, pure, withProps } from 'recompose'

const addLifecycleRegistrationMethods = lifecycle({
  componentDidMount() {
    this.props.form.addField({ ...this.props })
  },
  componentWillUnmount() {
    // TODO: Will removing this be better:
    // to allow the form to contain all values even if their inputs have been unmounted?
    this.props.form.removeField({ ...this.props })
  },
})
//

const withDefaultProps = defaultProps({ valid: true, disabled: false, classNames: [] })

const mapFieldProps = withProps(props => {
  const newFieldValues = R.prop(props.id, props.form.getFieldValues())
  return {
    value: props.initialValue,
    ...newFieldValues,
  }
})

const addFieldHandlers = withHandlers({
  onChange: props => event => {
    event.persist()
    const value = props.type === 'checkbox' ? event.target.checked : event.target.value
    props.form.updateField(props.id, { ...props, value }, () => {
      props.form.emit({ topic: 'fieldChanged', triggerFieldId: props.id, event })
    })
  },
  onFocus: props => event => {
    props.form.emit({ topic: 'fieldFocused', triggerFieldId: props.id, event })
  },
  onBlur: props => event => {
    event.target.checkValidity()
    props.form.emit({ topic: 'fieldBlurred', triggerFieldId: props.id, event })
  },
  onKeyDown: props => event => {
    event.persist()
    if (event.keyCode === 13) {
      props.form.emit({ topic: 'enterKeyPressed', triggerFieldId: props.id, event })
    }
  },
})

export const getFormContext = getContext({
  form: PropTypes.object,
})

export const addFieldClassNames = withProps(props => {
  const ffClassNames = ['input']
  if (props.disabled) ffClassNames.push('input--disabled')
  if (props.valid === false) ffClassNames.push('input--invalid')
  const prefixedClassNames = R.map(c => `${props.form.classNamePrefix}${c}`, ffClassNames)
  return R.assoc('className', cn([...props.classNames, ...prefixedClassNames]), props)
})

export const withInputHelpers = compose(
  withDefaultProps,
  addLifecycleRegistrationMethods,
  getFormContext,
  pure,
  addFieldHandlers,
  mapFieldProps,
  addFieldClassNames,
)

export const withFieldHelpers = compose(
  withDefaultProps,
  getFormContext,
  mapFieldProps,
  pure,
)
