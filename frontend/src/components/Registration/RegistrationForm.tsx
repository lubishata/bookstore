import React from "react";
import Form, { IForm } from "../Form";
import {
    email,
    password,
    confirmPassword,
} from "../Form/js/fields";
import { checkStringNotInAnotherString } from "../Form/js/passwordHints";
import { useDispatch } from "react-redux";

const fields = {
    email,
    password: {
        ...password,
        customRules: [
            {
                fields: ['email'],
                validate: checkStringNotInAnotherString,
                message: "съдържа",
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
                message: "не съвпада",
            },
        ],
    },
};

export interface RegistrationFormProps {
    onSubmitHandler: (data: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onSubmitHandler,
}) => {
    const formRef = React.useRef<IForm | null>(null);
    const dispatch = useDispatch();

    const onSubmit = (data: any) => {
        onSubmitHandler(data);
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
                buttonLabel="регистрация"
                onSubmitForm={onSubmit}
            // ref={(instance) => {
            //   formRef.current = instance;
            // }}
            />
        </div>
    );
};

export default RegistrationForm;
