import React from "react";
import Form, { IForm } from "../Form";
import {
    email,
    password,
    confirmPassword,
} from "../Form/js/fields";
import { checkStringNotInAnotherString } from "../Form/js/passwordHints";
import { useDispatch, useSelector } from 'react-redux';
import { translate } from '../../l10n';
import { registerUser } from './reducer/registrationSlice';
import { AppDispatch, RootState } from '../../store';
const t = (str: string, context = "bg-localization") => translate(context, str);

const fields = {
    email,
    password: {
        ...password,
        customRules: [
            {
                fields: ['email'],
                validate: checkStringNotInAnotherString,
                message: t('registrationForm.passwordContainEmail'),
            },
        ],
    },
    confirmPassword: {
        ...confirmPassword,
        customRules: [
            {
                fields: ['password'],
                validate(value: string, pas: string) {
                    return !(pas && pas === value);
                },
                message: t('registrationForm.passwordsDoesntMatch'),
            },
        ],
    },
};

export interface RegistrationFormProps {
    onSubmitHandler: (data: any) => void;
}



const RegistrationForm  = () => {

    const dispatch = useDispatch<AppDispatch>();
        const onSubmit = (data: any) => {
            dispatch(registerUser(data));
    };

    return (
        <div
        className="registration"
        style={{
            marginTop: "200px",
            position: "relative",
            display: "block",
            textAlign: "center",
        }}
    >
        <Form
            fields={fields}
            buttonLabel={t('registration')}
            onSubmitForm={onSubmit}
        />
    </div>

    );
}

export default RegistrationForm;
