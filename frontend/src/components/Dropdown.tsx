import * as React from 'react';
import classNames from 'classnames';

export interface DropdownProps {
  options: {
    value: string | number;
    label?: string,
    disabled?: boolean
  }[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (evt: React.FormEvent<HTMLSelectElement>) => void;
  onBlur?: (evt: React.FormEvent<HTMLSelectElement>) => void;
  className?: string;
  refs?: (el: any) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
};

function Dropdown({
  options, onChange, value: selectedValue, defaultValue, className, disabled, refs, ...rest
}: DropdownProps) {
  const props: any = {};
  if (selectedValue) {
    props.value = selectedValue;
  } else {
    props.defaultValue = defaultValue;
  }
  if (refs) {
    props.ref = refs;
  }

  // if (options[0].label == "No persistence") {
  //   PersistanceTimeOut.disabled = true;
  // }
  const selectClassName = classNames('select', className, {
    'select--disabled': disabled,
  });


  return (<div className={selectClassName}>
    <select
      onChange={onChange}
      {...props}
      {...rest}
    >
      {
        options.map(({ value, label, disabled }) => (<option
          key={value}
          value={value}
          disabled={disabled}
        >
          {label || value}
        </option>))
      }
    </select>
    <div className="select__arrow" />
  </div>);
}

export default Dropdown;
