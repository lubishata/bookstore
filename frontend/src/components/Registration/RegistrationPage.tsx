import * as React from 'react';
import RegistrationForm from './RegistrationForm';

const RegistrationPage = (props: any) => (
    <div className="form-page">
        <h1 className="form-page__title">
            {"РЕГИСТРАЦИЯ"}
        </h1>
        <RegistrationForm {...props} />
    </div>);

export default RegistrationPage;

