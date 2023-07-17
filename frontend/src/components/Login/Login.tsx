import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { email, password } from '../Form/js/fields';
import Form, { IForm } from '../Form';
import { useRef } from 'react';
import { login } from './reducer/authSlice';

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

interface LoginProps {
  onSubmitHandler: (data: {
    UserEmail: string;
    LoginPassword: string;
  }) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmitHandler }) => {
  const formRef = React.useRef<IForm | null>(null);
  const dispatch = useDispatch();
  let ref = useRef(0);

  const onSubmit = ({ email, password }: FormValidatorProps) => {
    const body: any = {
      UserEmail: email,
      LoginPassword: password,
    };
    console.log(body);
    onSubmitHandler(body);
    dispatch(login());
    localStorage.setItem('username', body.UserEmail); // Store username in localStorage
  };

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
        buttonLabel="Login"
        onSubmitForm={onSubmit}
        afterButton={
          <Link
            className="form-page__forgotten-password-link anim-underline"
            to="/forgotten-password"
          >
            Забравена Парола
          </Link>
        }
      // ref={() => {
      //   ref.current = ref.current + 1
      // }}
      />
      <div className="form-page__bottom-link">
        <Link className="anim-underline" to="/registration">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;
