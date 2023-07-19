import * as React from 'react';
import RegistrationForm from './RegistrationForm';
import { translate } from '../../l10n';
const t = (str: string, context = "bg-localization") => translate(context, str);

const RegistrationPage = (props: any) => (
    <div className="form-page">
        <h1 className="form-page__title">
            {t('registration')}
        </h1>
        <RegistrationForm {...props} />
    </div>);

export default RegistrationPage;

