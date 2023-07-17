export const email = {
    name: 'email',
    type: 'text',
    label: 'email',
    placeholder: 'email',
    autoComplete: true,
    value: ''
  };

  export const password = {
    name: 'password',
    type: 'password',
    label: 'password',
    minLength: 8,
    maxLength: 20,
    placeholder: 'password',
    showPassword: true,
    //showTooltipHints: window.innerWidth > MOBILE_WIDTH,
    value: ''
  };

  export const confirmPassword = {
    name: 'confirmPassword',
    type: 'password',
    label: "потвърди парола",
    minLength: 8,
    maxLength: 20,
    placeholder: 'потвърди парола',
  };