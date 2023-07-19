import * as React from 'react';

export interface RadioButtonProps {
  value: string | number;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void
  label?: string | React.ReactNode;
  name?: string,
  checked?: boolean;
  disabled?: boolean;
};

function RadioButton(props: RadioButtonProps) {
  const {
    label, name, value, checked, disabled, onChange,
  } = props;
  return (
    /* eslint-disable jsx-a11y/label-has-for */
    <label className="control control--radio">{label}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <div className="control__indicator" />
    </label>);
}

export default RadioButton;
