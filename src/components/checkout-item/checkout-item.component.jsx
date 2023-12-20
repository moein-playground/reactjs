import { useContext } from 'react';
import { CardContext } from '../../contex/card.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cardItem }) => {
  const { name, imageUrl, price, quantity } = cardItem;
  const { clearCardItem, addItemToCard, removeItemFromCard, cardTotal } =
    useContext(CardContext);

  const clearItemHandler = () => clearCardItem(cardItem.id);
  const incrementCardItemHandler = () => addItemToCard(cardItem);
  const decrementCardItemHandler = () => removeItemFromCard(cardItem);

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
