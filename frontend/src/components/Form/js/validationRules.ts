type ValidationRules = {
    isRequired?: {
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  
  const validationRules: {
    [key: string]: ValidationRules;
  } = {
    email: {
      isRequired: {
        message: "Полето е задължително",
      },
      pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "грешен имейл",
      },
    },
    password: {
      isRequired: {
        message: "Полето е задължително",
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?\s<>'\":;`%|-]){1,})(?!.*\s)[a-zA-Z0-9~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?\s<>'\":;`%|-]{8,20}$/,
        message: "трябва да съдържа",
      },
    },
    confirmPassword: {
      isRequired: {
        message: "Полето е задъжлително",
      },
    },
  };

  export function addRules(rules: any) {
    const names = Object.keys(rules);
    names.forEach((name) => {
      if (!validationRules[name]) {
        validationRules[name] = rules[name];
      } else {
        console.error(`Validation rule with name "${name}" already exists.`);
      }
    });
  }
  
  export default validationRules;
  