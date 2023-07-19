import React, { Component } from 'react';
import { bool, string, shape } from 'prop-types';
import { validatePasswordField } from './js/passwordHints';
import Input from '../Input';
// import Tooltip from '../Tooltip';
// import PasswordTooltip from './PasswordTooltip';

const types = ['text', 'password'];
const classes = 'show-password icon-eye-blocked';

class FormFieldPassword extends Component {
  constructor(props) {
    super(props);
    this.showPassword = false;
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword(event) {
    const icon = event.target;
    if (this.showPassword) {
      icon.className = classes;
    } else {
      icon.className = `show-password icon-eye`;
    }
    this.showPassword = !this.showPassword;
    this.passwordInput.type = types[this.showPassword ? 0 : 1];
    event.preventDefault();
  }

  render() {
    const {
      name, label, value, showPassword, customLabelContent, hints, ...rest
    } = this.props;
    const htmlFor = `field-${name}`;
    let passwordEye = null;
    if (showPassword) {
      passwordEye = (<i
        tabIndex={0}
        role="button"
        className={classes}
        onClick={this.togglePassword}
      />);
    }

    let inputField = (
      <Input
        id={htmlFor}
        type="password"
        name={name}
        value={value}
        inputRef={(input) => { this.passwordInput = input; }}
        {...rest}
      />
    );

    // if (hints) {
    //   const tooltipContent = () => {
    //     const validation = validatePasswordField(value, hints);
    //     return (<PasswordTooltip {...validation} />);
    //   };
    //   inputField = (<Tooltip
    //     overlayClassName="rc-tooltip--custom-arrow"
    //     trigger={['click', 'focus']}
    //     placement="left"
    //     overlay={tooltipContent}
    //     align={{
    //       // set up Y offset due to different input height in guest and home forms
    //       offset: /profile/.test(window.location.hash) ? [-16, -5] : [-16, 14],
    //     }}
    //   >
    //     {inputField}
    //   </Tooltip >);
    // }

    return (<span>
      <label htmlFor={htmlFor}>{label}{passwordEye}{customLabelContent}</label>
      {inputField}
    </span>);
  }
}

FormFieldPassword.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  showPassword: bool,
  hints: shape({}),
};

FormFieldPassword.defaultProps = {
  autoComplete: false,
  showPassword: false,
  hints: {},
};

export default FormFieldPassword;
