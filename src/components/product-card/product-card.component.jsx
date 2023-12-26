import { useDispatch, useSelector } from 'react-redux';
import { addItemToCard } from '../../store/card/card.actions';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './product-card.styles.scss';
import { selectCardItems } from '../../store/card/card.selector';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cardItems = useSelector(selectCardItems);
  const addProductToCard = () => dispatch(addItemToCard(cardItems, product));

  return (
    <div className="product-card-container">
      <img alt={name} src={imageUrl} />

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCard}
      >
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
