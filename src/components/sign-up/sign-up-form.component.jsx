import { useState } from 'react';
import {
  createAuthWithUserEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase-utils/firebase.utils';
import FormInput from '../../components/form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFileds = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFileds, setFormFileds] = useState(defaultFormFileds);

  const { displayName, email, password, confirmPassword } = formFileds;
  const resetFormFileds = () => {
    setFormFileds(defaultFormFileds);
  };
  const handleChnage = (event) => {
    const { name, value } = event.target;
    setFormFileds({ ...formFileds, [name]: value });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      const { user } = await createAuthWithUserEmailAndPassword(
        email,
        password,
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFileds();
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log(
          'error on creating user with email and password',
          error.message,
        );
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don`t have an account</h2>
      <span>Sin up with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput
          label="Display name"
          required
          type="text"
          onChange={handleChnage}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChnage}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChnage}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm password"
          required
          type="password"
          onChange={handleChnage}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="google" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
