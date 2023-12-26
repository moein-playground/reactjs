import { useDispatch, useSelector } from 'react-redux';
import {
  CardIconContainer,
  ShoppingIcon,
  ItemCount,
} from './card-icon.styles.jsx';
import {
  selectCardIsOpen,
  selectCardCount,
} from '../../store/card/card.selector.js';
import { setIsCardOpen } from '../../store/card/card.actions.js';

const CardIcon = () => {
  const dispatch = useDispatch();
  const isCardOpen = useSelector(selectCardIsOpen);
  const cardCount = useSelector(selectCardCount);

  const toggleIsCardOpen = () => dispatch(setIsCardOpen(!isCardOpen));

  return (
    <CardIconContainer onClick={toggleIsCardOpen}>
      <ShoppingIcon />
      <ItemCount>{cardCount}</ItemCount>
    </CardIconContainer>
  );
};

export default CardIcon;
