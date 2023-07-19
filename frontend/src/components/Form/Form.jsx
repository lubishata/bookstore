import React, { PureComponent } from 'react';
import { string, bool, node, func, shape, objectOf, oneOfType } from 'prop-types';
import classNames from 'classnames';
import FormField from './FormField';
import Button from '../Button';
import { validateField as validateInputField } from './js/formValidation';

function preventDefault(e) {
  e.preventDefault();
}

class Form extends PureComponent {
  constructor(props) {
    super(props);
    const state = {};
    const { fields } = props;
    for (const name in fields) {
      const field = fields[name];
      state[name] = {
        value: field.value || '',
        valid: field.valid !== undefined ? field.valid : (!!field.value),
        message: null,
      };
    }
    state.activeField = null;
    state.inProgress = null;

    this.state = state;
    this.hasSubmitAttempt = false;
    this.activeCompositeFieldName = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  //   UNSAFE_componentWillMount() {
  //     if (this.props.fields.captcha) {
  //       const verifyCallback = (value) => {
  //         this.setState({
  //           captcha: {
  //             value,
  //             message: null,
  //             valid: true,
  //           },
  //         });
  //       };
  //       const expiredCallback = () => {
  //         this.validateField({ name: 'captcha', value: '' });
  //       };
  //       setTimeout(() => {
  //         window.grecaptcha.render('recaptcha-container', {
  //           sitekey: '6Le_0vMUAAAAAHnGyFO05ixQmqEvP0amsY3zaR-T',
  //           callback: verifyCallback,
  //           'expired-callback': expiredCallback,
  //         });
  //       }, 300);
  //       // window.onloadCallback = function () {
  //       //   window.grecaptcha.render('recaptcha-container', {
  //       //     sitekey: '6Le_0vMUAAAAAHnGyFO05ixQmqEvP0amsY3zaR-T',
  //       //     callback: verifyCallback,
  //       //     'expired-callback': expiredCallback,
  //       //   });
  //       // };
  //     }
  //   }

  componentDidUpdate(prevProps) {
    if (prevProps.fields !== this.props.fields) {
      const { fields } = this.props;
      this.setState((prevState) => {
        const newState = { ...prevState };
        for (const name in fields) {
          const field = fields[name];
          newState[name] = {
            value: field.value || '',
            valid: field.valid !== undefined ? field.valid : !!field.value,
            message: null,
          };
        }
        newState.activeField = null;
        newState.inProgress = null;
        return newState;
      });
    }
  }

  validateField({ name, value }) {
    let message = null;
    let valid = false;
    const { fields } = this.props;
    const field = fields[name];
    if (field.type === 'checkbox') {
      valid = !!value;
      if (!field.isOptional && !value) {
        message = field.message;
      }
    } else if (!field.isOptional || value.trim() !== '' || field.compositeFieldChild === this.activeCompositeFieldName) {
      message = validateInputField(name, value);
      valid = !message;
    }

    if (valid && field.customRules) {
      const length = field.customRules.length;
      for (let i = 0; i < length; i++) {
        const rule = field.customRules[i];
        const params = rule.fields.map(fname => this.state[fname].value);
        const inValid = rule.validate(value, ...params);
        if (inValid) {
          valid = false;
          message = rule.message;
          break;
        }
      }
    }

    this.setState({
      [name]: {
        value,
        message,
        valid,
      },
      activeField: name,
    });
  }

  handleUserInput(e) {

    if (this.state.inProgress) {
      return;
    }
    const { target } = e;
    let param = target;

    if (target.type === 'checkbox') {
      const { name } = target;
      param = { name, value: target.checked };
      if (this.props.fields[name].compositeFieldParent) {
        if (!this.activeCompositeFieldName) {
          this.activeCompositeFieldName = name;
        } else if (this.activeCompositeFieldName === name) {
          this.activeCompositeFieldName = null;
        } else {
          this.setState({ [this.activeCompositeFieldName]: { value: false, message: null, valid: false } });
          this.activeCompositeFieldName = name;
        }
      }
    }

    this.validateField(param);
  }

  formIsValid() {
    const { fields } = this.props;
    for (const name in fields) {
      const field = fields[name];
      const valid = this.state[name].valid;
      if (name === this.activeCompositeFieldName && valid) {
        // TODO refactor code for composite fields
        // todo swipe props compositeFieldParent and compositeFieldChild
        // const childName = field.compositeFieldParent;
        return this.state[field.compositeFieldParent].valid;
      }

      if (!valid && field.compositeFieldParent === undefined && field.compositeFieldChild === undefined) {
        if (!field.isOptional || (field.isOptional && this.state[name].value !== '' && field.type !== 'checkbox')) {
          return false;
        }
      }
    }
    return true;
  }

  showServerValidationErrors(fields, messages) {
    const newState = {};
    fields.forEach((fieldName, i) => {
      if (this.state[fieldName]) {
        newState[fieldName] = {
          valid: false,
          message: messages[i],
          value: this.state[fieldName].value,
        };
      }
    });
    newState.inProgress = false;
    this.setState(newState);
    if (this.props.fields.captcha) {
      window.grecaptcha.reset();
    }
  }

  reset() {
    const newState = {
      inProgress: false,
    };
    for (const name in this.props.fields) {
      newState[name] = {
        value: '',
        valid: false,
        message: null,
      };
    }
    this.hasSubmitAttempt = false;
    this.setState(newState);
  }

  handleSubmit() {
    if (this.state.inProgress) {
      return;
    }

    if (!this.hasSubmitAttempt) {
      this.hasSubmitAttempt = true;
    }

    const { fields, onSubmit, onSubmitForm } = this.props;

    for (const name in fields) {
      const { valid, value } = this.state[name];
      if (name === 'captcha') {
        this.validateField({ name, value: window.grecaptcha.getResponse() });
      } else if (!valid || name === 'confirmPassword') {
        this.validateField({ name, value });
      }
      if (fields[name].compositeFieldChild === this.activeCompositeFieldName) {
        this.validateField({ name, value });
      }
    }

    if (this.formIsValid()) {
      this.setState({ inProgress: true });
      if (onSubmit) {
        onSubmit(this.state);
      }

      if (onSubmitForm) {
        const data = {};
        for (const name in fields) {
          data[name] = this.state[name].value;
        }
        onSubmitForm(data);
      }
    }
  }

  render() {
    const {
      fields, children, buttonLabel, afterButton, formClassName, hideFooter,
    } = this.props;
    let btnClass = {};
    if (!hideFooter) {
      btnClass = classNames({
        'btn--shake': this.hasSubmitAttempt && !this.formIsValid(),
        'btn--spin': this.state.inProgress,
      });
    }

    let tabIndex = 0;
    let inputFields = [];
    for (const name in fields) {
      const field = fields[name];
      let tooltipHints = null;
      if (field.showTooltipHints) {
        const {
          email, currentPassword, firstName, lastName,
        } = this.state;
        tooltipHints = {
          email: email ? email.value : undefined,
          currentPassword: currentPassword ? currentPassword.value : undefined,
          firstName: firstName ? firstName.value : undefined,
          lastName: lastName ? lastName.value : undefined,
        };
      }
      inputFields.push(<FormField
        key={field.name}
        hide={field.compositeFieldChild && !this.state[field.compositeFieldChild].value}
        field={field}
        fieldState={this.state[field.name]}
        onChange={this.handleUserInput}
        hints={tooltipHints}
        tabIndex={++tabIndex}
      />);
    }

    // in case you want to show to input fields in row each fields get 50% of the available width
    if (this.props.twoFieldsPerRow) {
      const wrappedFields = [];
      const len = inputFields.length;
      for (let i = 0; i < len; i++) {
        wrappedFields.push(<div className="form-group-wraper" key={i} style={{ width: '100%' }}>
          {inputFields[i]}
          {inputFields[i + 1] && inputFields[i + 1]}
        </div>);
        if (i + 1 < len) {
          i++;
        }
      }
      inputFields = wrappedFields;
    }

    return (
      <form className={classNames('form', formClassName)} onSubmit={preventDefault}>
        {inputFields}
        {children}
        {
          !hideFooter &&
          <div className="field-group mt-30">
            <Button
              className={btnClass}
              gradient="dark"
              rounded
              disabled={this.state.inProgress}
              onClick={this.handleSubmit}
              tabIndex={tabIndex++}
            >
              <span>
                <span className="text-uppercase">{buttonLabel}</span>
                <i className="spinner icon-spinner2" />
              </span>
            </Button>
            {afterButton}
          </div>
        }
      </form>
    );
  }
}

Form.propTypes = {
  buttonLabel: string,
  fields: objectOf(shape({
    name: string,
    type: string,
    label: oneOfType([
      string,
      node,
    ]),
    placeholder: string,
    autoComplete: bool,
    isOptional: bool,
  })).isRequired,
  children: node,
  onSubmit: func,
  onSubmitForm: func,
  afterButton: node,
  formClassName: string,
  hideFooter: bool,
  twoFieldsPerRow: bool,
};

Form.defaultProps = {
  children: null,
  onSubmit: null,
  onSubmitForm: null,
  afterButton: null,
  buttonLabel: '',
  formClassName: 'form-base',
  hideFooter: false,
  twoFieldsPerRow: false,
};

export default Form;
