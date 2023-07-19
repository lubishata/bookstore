import React, { Fragment, PureComponent } from 'react';
import { string, bool, number, node, func, shape, oneOfType } from 'prop-types';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Checkbox from '../Checkbox';
import FormValidator from './FormValidator';
import FormFieldPassword from './FormFieldPassword';
import RadioButton from '../RadioButton';

class FormField extends PureComponent {
  render() {
    const {
      field, fieldState, onChange, hints, tabIndex, disabled
    } = this.props;
    const {
      name, type, label, placeholder, autoComplete, isOptional, readOnly,
    } = field;
    let fieldLabel = label;
    if (!isOptional) {
      if (typeof label !== 'object') {
        fieldLabel = `${label} *`;
      }
    }
    var radioButtonState1 = false;
    var radioButtonState2 = false;
    function onRadioButtonChange(evt) {
      if (evt.currentTarget.value === 'doNotCallLeads') {
        radioButtonState1 = true;
        radioButtonState2 = false;
      }
      else {
        radioButtonState1 = false;
        radioButtonState2 = true;
      }
    }

    let inputField = null;
    const htmlFor = `field-${name}`;
    switch (type) {

      case 'number':
        inputField = (<Fragment>
          <label htmlFor={htmlFor}>{fieldLabel}</label>
          <Input
            id={htmlFor}
            type={type}
            name={name}
            value={(disabled === false) ? fieldState.value : ""}
            onChange={onChange}
            tabIndex={tabIndex}
            min={field.min}
            max={field.max}
            step={field.step}
            readOnly={readOnly}
            disabled={field.disabled}
          />
        </Fragment>);
        break;
      case 'text':
      case 'textarea':
        inputField = (<Fragment>
          <label htmlFor={htmlFor}>{fieldLabel}</label>
          <Input
            id={htmlFor}
            type={type}
            name={name}
            value={(disabled === false) ? fieldState.value : ""}
            onChange={onChange}
            placeholder={placeholder}
            tabIndex={tabIndex}
            minLength={field.minLength}
            maxLength={field.maxLength}
            readOnly={readOnly}
            autoComplete={autoComplete}
            disabled={disabled}
          />
        </Fragment>);
        break;
      case 'password':
        inputField = (
          <FormFieldPassword
            name={name}
            label={fieldLabel}
            value={(disabled === false) ? fieldState.value : ""}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            showPassword={field.showPassword}
            hints={hints}
            tabIndex={tabIndex}
            minLength={field.minLength}
            maxLength={field.maxLength}
            customLabelContent={field.customLabelContent}
            disabled={disabled}
          />);
        break;
      case 'captcha':
        return (<div
          className="field-group clearfix"
          style={{ overflow: 'hidden' }}
        >
          <input
            name="captcha"
            type="text"
            style={{ display: 'none' }}
            tabIndex={tabIndex}
          />
          <div id="recaptcha-container" />
          {console.log("captcha")}
          <FormValidator
            isValid={fieldState.valid}
            message={fieldState.message}
            hideBox
          />
        </div>);
      case 'checkbox':
        return (<div className="field-group mt-20 clearfix">
          {
            field.checkboxHuge ? (<label tabIndex={tabIndex} className="control control--checkbox" style={{ float: 'left', width: '90%' }}>
              <span>{fieldLabel}</span>
              <input type={type} name={name} checked={!!fieldState.value} onChange={onChange} />
              <div className="control__indicator" />
            </label>)
              : (<Checkbox
                label={fieldLabel}
                checked={!!fieldState.value}
                onChange={(checked) => onChange({ target: { type: 'checkbox', name, checked } })}
              />)
          }
          <FormValidator
            isValid={!!fieldState.valid}
            message={fieldState.message}
            hideBox
          />
        </div>);
      case 'radio':
        return (<div className="field-group mt-20 clearfix">
          {
            field.checkboxHuge ? (<label tabIndex={tabIndex} className="control control--radio" style={{ float: 'left', width: '90%' }}>
              <span>{fieldLabel}</span>
              <input type={type} name={name} checked={!!fieldState.value} onChange={onChange} />
              <div className="control__indicator" />
            </label>)
              : (<RadioButton
                label={fieldLabel}
                name={name}
                checked={!!fieldState.value}
                disabled={disabled}
                onChange={(checked) => onChange({ target: { type: 'radio', name, checked } })}
                value={fieldState.value}
              />)
          }
          <FormValidator
            isValid={!!fieldState.valid}
            message={fieldState.message}
            hideBox
          />
        </div>);
      case 'select':
        return (<div className="field-group clearfix">
          <label htmlFor={name}>{fieldLabel}</label>
          <Dropdown
            options={field.options}
            value={fieldState.value || field.options[field.selected].value}
            onChange={e => onChange({ target: { type: 'select', name, value: e.target.value } })}
            disabled={field.disabled}
          />
        </div>);
      case 'select-leads':
        return (<div className="field-group clearfix">
          <label htmlFor={name}>{fieldLabel}</label>
          <Dropdown
            options={field.options}
            value={fieldState.value || field.options[field.selected].value}
            onChange={e => onChange({ target: { type: 'select', name, value: e.target.value } })}
            disabled={field.disabled}
          />
          <FormValidator
            isValid={fieldState.valid}
            message={fieldState.message}
          />
        </div>);
      case 'select-validation':
        return (<div className="field-group clearfix">
          <label htmlFor={name}>{fieldLabel}</label>
          <Dropdown
            options={field.options}
            value={fieldState.value || field.options[field.selected].value}
            onChange={e => onChange({ target: { type: 'select', name, value: e.target.value } })}
            disabled={field.disabled || disabled}
          />
          <span className="select-validation">
            <FormValidator
              isValid={fieldState.valid}
              message={fieldState.message}
            />
          </span>
        </div>);
      default:
        break;
    }

    let style = {};
    if (this.props.hide) {
      style = { display: 'none' };
    }
    return (<div className="field-group clearfix m-10 mt-3 p-2" style={style}>
      {inputField}
      <FormValidator
        isValid={fieldState.valid}
        message={fieldState.message}
      />
    </div>);
  }
}

FormField.propTypes = {
  tabIndex: number,
  field: shape({
    name: string,
    type: string,
    label: oneOfType([
      string,
      node,
    ]),
    placeholder: string,
    autoComplete: bool,
    isOptional: bool,
    checkboxHuge: bool,
  }).isRequired,
  fieldState: shape({
    value: oneOfType([
      bool,
      number,
      string,
    ]),
    message: string,
    valid: bool,
  }).isRequired,
  onChange: func.isRequired,
  hints: shape({}),
  hide: bool,
  disabled: bool,
};

FormField.defaultProps = {
  tabIndex: 0,
  hints: {},
  hide: false,
  disabled: false,
  resizable: true
};

export default FormField;
