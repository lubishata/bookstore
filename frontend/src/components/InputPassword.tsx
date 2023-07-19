import * as React from 'react';
 
function setAtribute(bool: boolean) {
  return bool ? 'on' : 'off';
}
 
export interface InputProps {
  type: 'number' | 'text' | 'password' | 'textarea';
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (...args: any[]) => void;
  inputRef?: (el: any) => void;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  custumIcon?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
};
 
function Input(props) {
  const {
    type, name, value, onChange, placeholder, autoComplete, autoCorrect, inputRef, custumIcon, wrapperStyle, ...rest
  } = props;
  const inputProps: any = {
    type,
    autoComplete: setAtribute(autoComplete),
    autoCorrect: setAtribute(autoCorrect),
    spellCheck: false,
  };
 
  ['name', 'placeholder', 'onChange'].forEach((prop) => {
    const propValue = props[prop];
    if (propValue) {
      inputProps[prop] = propValue;
    }
  });
 
  // if component is controlled value must be set
  if (onChange) {
    inputProps.value = value || '';
  }
 
  if (inputRef) {
    inputProps.ref = inputRef;
  }
 
  if (type === 'textarea') {
    return (<textarea
      {...inputProps}
      {...rest}
    />);
  }
 
  return (<span className="input-wrapper security-password" style={wrapperStyle} >
    <input
      {...inputProps}
      {...rest}
    />
    <span className="focus-border" />
    {custumIcon}
  </span>);
}
 
export default Input;