import { translate } from '../../../l10n';
const t = (str: string, context = "bg-localization") => translate(context, str);

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
      message: t('fields.isRequired'),
    },
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: t('fields.invalidEmail'),
    },
  },
  password: {
    isRequired: {
      message: t('fields.isRequired'),
    },
    pattern: {
      value: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?\s<>'\":;`%|-]){1,})(?!.*\s)[a-zA-Z0-9~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?\s<>'\":;`%|-]{8,20}$/,
      message: t('fields.invalidPassword'),
    },
  },
  confirmPassword: {
    isRequired: {
      message: t('fields.isRequired'),
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
