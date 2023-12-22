import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase-utils/firebase.utils';

import { UserContext } from '../../contex/user.contex';
import { CardContext } from '../../contex/card.context';

import { ReactComponent as CrwLogo } from '../../assets/crown.svg';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';
import CardIcon from '../../components/card-icon/card-icon.component';

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCardOpen } = useContext(CardContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign in</NavLink>
          )}
          <CardIcon />
        </NavLinks>
        {isCardOpen && <CardDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
