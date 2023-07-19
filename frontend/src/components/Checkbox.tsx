import React from 'react';
import classNames from 'classnames';

export interface CheckboxProps {
  label: string | React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean, evt: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  disabled = false,
  onChange,
  className,
  ...rest
}) => {
  const labelClassName = classNames('checkbox', className, {
    'checkbox--disabled': disabled,
  });

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e);
  };

  return (
    <label className={labelClassName} {...rest}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={toggleCheckbox}
      />
      <span className="checkbox__control">{label}</span>
    </label>
  );
};

export default Checkbox;
