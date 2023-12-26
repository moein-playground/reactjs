import { useSelector, useDispatch } from 'react-redux';
import {
  addItemToCard,
  clearCardItem,
  removeItemFromCard,
} from '../../store/card/card.actions';
import './checkout-item.styles.scss';
import { selectCardItems } from '../../store/card/card.selector';

const CheckoutItem = ({ cardItem }) => {
  const dispatch = useDispatch();
  const cardItems = useSelector(selectCardItems);
  const { name, imageUrl, price, quantity } = cardItem;

  const clearItemHandler = () =>
    dispatch(clearCardItem(cardItems, cardItem.id));
  const incrementCardItemHandler = () =>
    dispatch(addItemToCard(cardItems, cardItem));
  const decrementCardItemHandler = () =>
    dispatch(removeItemFromCard(cardItems, cardItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementCardItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementCardItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
