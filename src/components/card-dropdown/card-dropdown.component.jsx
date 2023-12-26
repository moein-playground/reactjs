import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardItem from '../card-item/card-item.component';
import Button from '../button/button.component';
import {
  CardDropDownContainer,
  EmptyMessage,
  CardItems,
} from './card-dropdown.styles';
import { selectCardItems } from '../../store/card/card.selector';

const CardDropdown = () => {
  const cardItems = useSelector(selectCardItems);
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
