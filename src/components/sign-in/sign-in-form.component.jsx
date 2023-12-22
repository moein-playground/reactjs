import { useState } from 'react';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithUserEmailAndPassword,
} from '../../utils/firebase-utils/firebase.utils';
import FormInput from '../../components/form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFormFileds = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFileds, setFormFileds] = useState(defaultFormFileds);
  const { email, password } = formFileds;

  const resetFormFileds = () => {
    setFormFileds(defaultFormFileds);
  };
  const handleChnage = (event) => {
    const { name, value } = event.target;
    setFormFileds({ ...formFileds, [name]: value });
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithUserEmailAndPassword(email, password);
      resetFormFileds();
    } catch (error) {
      // TODO:you can add more error handeling like switch case ...
      // auth-wrong-paswword / auth-user-not-found / ...
      if (error.code === 'auth/invalid-credential') {
        alert('Your credential data is not correct');
      }
      console.log(
        'error on creating user with email and password',
        error.message,
      );
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sin up with your email and password</span>
      <form onSubmit={handelSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

// TODO: Sign in with redirect method example
// async function fetUser) {
//   const response = await getRedirectResult(auth);
//   if (response) {
//     const userDocRef = await createUserDocumentFromAuth(response.user);
//   }
// }
// useEffect(() => {
//   fetUser();
// }, []);
