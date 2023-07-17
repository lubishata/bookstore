import { translate } from '../../../l10n';
const t = (str: string, context = "bg-localization") => translate(context, str);

export const email = {
  name: 'email',
  type: 'text',
  label: t('fields.email'),
  placeholder: t('fields.emailPlaceholder'),
  autoComplete: true,
  value: ''
};

export const password = {
  name: 'password',
  type: 'password',
  label: t('fields.password'),
  minLength: 8,
  maxLength: 20,
  placeholder: t('fields.passwordPlaceholder'),
  showPassword: true,
  //showTooltipHints: window.innerWidth > MOBILE_WIDTH,
  value: ''
};

export const confirmPassword = {
  name: 'confirmPassword',
  type: 'password',
  label: t('fields.confirmPassword'),
  minLength: 8,
  maxLength: 20,
  placeholder: t('fields.confirmPassword'),
};