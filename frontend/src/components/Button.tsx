import * as React from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "primary" | "black" | "info";
  gradient?: "light" | "dark";
  rounded?: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    className, type, rounded, gradient, ...rest
  } = props;
  const btnClass = classNames('btn', className, {
    'btn--primary': type == "primary",
    'btn--info': type === "info",
    'btn--black': type === "black",
    'btn--rounded': rounded,
    'btn--gradient-lightblue': gradient == "light",
    'btn--gradient-darkblue': gradient == "dark",
  });

  return (
    <button
      className={btnClass}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default Button;
