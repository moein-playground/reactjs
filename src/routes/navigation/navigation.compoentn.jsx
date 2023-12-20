import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase-utils/firebase.utils';

import { UserContext } from '../../contex/user.contex';
import { CardContext } from '../../contex/card.context';

import { ReactComponent as CrwLogo } from '../../assets/crown.svg';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';
import CardIcon from '../../components/card-icon/card-icon.component';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCardOpen } = useContext(CardContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}
          <CardIcon />
        </div>
        {isCardOpen && <CardDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
