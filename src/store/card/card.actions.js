import { createAction } from '../../utils/reducer/reducer.utils';
import { CARD_ACTION_TYPES } from './card.types';

const existingCardItem = (cardItems, product) =>
  cardItems.find((cardItem) => cardItem.id === product.id);

const addCardItem = (cardItems, productToAdd) => {
  if (existingCardItem(cardItems, productToAdd)) {
    return cardItems.map((cardItem) =>
      cardItem.id === productToAdd.id
        ? { ...cardItem, quantity: cardItem.quantity + 1 }
        : cardItem,
    );
  }

  return [...cardItems, { ...productToAdd, quantity: 1 }];
};
const removeCardItem = (cardItems, cardToRemove) => {
  if (existingCardItem(cardItems, cardToRemove).quantity === 1) {
    return cardItems.filter((cardItem) => cardItem.id !== cardToRemove.id);
  }

  if (existingCardItem(cardItems, cardToRemove)) {
    return cardItems.map((cardItem) =>
      cardItem.id === cardToRemove.id
        ? { ...cardItem, quantity: cardItem.quantity - 1 }
        : cardItem,
    );
  }
};

const clearCard = (cardItems, cardId) =>
  cardItems.filter((cardItem) => cardItem.id !== cardId);

export const addItemToCard = (cardItems, productToAdd) => {
  const newCardItems = addCardItem(cardItems, productToAdd);
  return createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, newCardItems);
};

export const removeItemFromCard = (cardItems, cardToRemove) => {
  const newCardItems = removeCardItem(cardItems, cardToRemove);
  return createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, newCardItems);
};
export const clearCardItem = (cardItems, cardId) => {
  const newCardItems = clearCard(cardItems, cardId);
  return createAction(CARD_ACTION_TYPES.SET_CARD_ITEMS, newCardItems);
};

export const setIsCardOpen = (bool) =>
  createAction(CARD_ACTION_TYPES.SET_IS_CARD_OPEN, bool);
