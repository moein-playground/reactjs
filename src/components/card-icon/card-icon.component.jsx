import { useContext } from 'react';
import { CardContext } from '../../contex/card.context';
import {
  CardIconContainer,
  ShoppingIcon,
  ItemCount,
} from './card-icon.styles.jsx';

const CardIcon = () => {
  const { isCardOpen, setIsCardOpen, cardCount } = useContext(CardContext);

  const toggleIsCardOpen = () => setIsCardOpen(!isCardOpen);

  return (
    <CardIconContainer onClick={toggleIsCardOpen}>
      <ShoppingIcon />
      <ItemCount>{cardCount}</ItemCount>
    </CardIconContainer>
  );
};

export default CardIcon;
