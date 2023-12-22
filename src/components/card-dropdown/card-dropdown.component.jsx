import { useContext } from 'react';
import { CardContext } from '../../contex/card.context';
import { useNavigate } from 'react-router-dom';
import CardItem from '../card-item/card-item.component';
import Button from '../button/button.component';
import {
  CardDropDownContainer,
  EmptyMessage,
  CardItems,
} from './card-dropdown.styles';

const CardDropdown = () => {
  const { cardItems } = useContext(CardContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CardDropDownContainer>
      <CardItems>
        {cardItems.length ? (
          cardItems.map((item) => <CardItem key={item.id} cardItem={item} />)
        ) : (
          <EmptyMessage>You card is empry</EmptyMessage>
        )}
      </CardItems>
      <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </CardDropDownContainer>
  );
};

export default CardDropdown;
