import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store';
import { email, password } from '../Form/js/fields';
import Form from '../Form';
import { translate } from '../../l10n';
import { login } from './reducer/loginSlice';

const t = (str: string, context = "bg-localization") => translate(context, str);


interface FormValidatorProps {
  email: string;
  password: string;
}

const fields = {
  email: {
    ...email
  },
  password: {
    ...password,
    showTooltipHints: false
  }
};

const Login = () => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = ({ email, password }: FormValidatorProps) => {
    dispatch(login(email, password));
  };
  console.log(loginState.token);
  if (loginState.token) {
    const userToken = "Bearer " + loginState.token;

    sessionStorage.setItem('Authorization', JSON.stringify(userToken))
  }

  return (
    <div
      className="form-page"
      style={{
        marginTop: "200px",
        position: "relative",
        display: "block",
        textAlign: "center",
      }}
    >
      <h1 className="form-page__title">Login</h1>
      <Form
        fields={fields}
        buttonLabel={t('login')}
        onSubmitForm={onSubmit}
        formClassName="form-group col-xs-6"
      />
      <div className="form-page__bottom-link">
        <Link className="anim-underline" to="/registration">
          {t('registration')}
        </Link>
      </div>
      <div className="form-page__bottom-link">
        <Link
          className="form-page__forgotten-password-link anim-underline"
          to="/forgotten-password"
        >
          {t('forgottenPassword')}
        </Link>
      </div>
    </div>
  );
};

export default Login;
