import * as React from 'react';
import classNames from 'classnames';



export interface FormValidatorProps {
  isValid: boolean;
  message: string;
  hideBox: boolean;
};

const FormValidator = ({ isValid, message, hideBox }: FormValidatorProps) => {
  let emailMessage;
  let validationBox;
  if (message) {
    emailMessage = (<p className="validation__message">
      <i className="icon-info-sign" /> {message}
    </p>);
  }

  if (!hideBox) {
    const boxClassNames = classNames('validation__box', {
      'validation__box--invalid': message,
      'validation__box--valid': isValid,
    });
    validationBox = (<span className={boxClassNames}>
      {
        !!message && <i className="icon-cross" />
      }
      {
        isValid && <i className="icon-checkmark" />
      }
    </span>);
  }
  return (
    <span className="validation">
      {validationBox}
      {emailMessage}
    </span>
  );
};

export default FormValidator;
