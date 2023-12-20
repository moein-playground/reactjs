import { useContext } from 'react';
import { CardContext } from '../../contex/card.context';
import { useNavigate } from 'react-router-dom';
import CardItem from '../card-item/card-item.component';
import Button from '../button/button.component';
import './card-dropdown.styles.scss';

const CardDropdown = () => {
  const { cardItems } = useContext(CardContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="card-dropdown-container">
      <div className="card-items">
        {cardItems.map((item) => (
          <CardItem key={item.id} cardItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </div>
  );
};

export default CardDropdown;
