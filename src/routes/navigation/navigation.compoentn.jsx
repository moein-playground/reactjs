import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCardIsOpen } from '../../store/card/card.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
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
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isCardOpen = useSelector(selectCardIsOpen);

  const signOutUser = () => dispatch(signOutStart());

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
