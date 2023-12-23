import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';
import { act } from 'react-dom/test-utils';

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

export const CardContext = createContext({
  setIsCardOpen: () => {},
  addItemToCard: () => {},
  removeItemFromCard: () => {},
  clearCardItem: () => {},
  cardItems: [],
  isCardOpen: false,
  cardCount: 0,
  cardTotal: 0,
});

export const CARD_ACTION_TYPE_ACTION = {
  SET_CARD_ITEMS: 'SET_CARD_ITEMS',
  SET_IS_CARD_OPEN: 'SET_IS_CARD_OPEN',
};

const INITIAL_STATE = {
  cardItems: [],
  isCardOpen: false,
  cardCount: 0,
  cardTotal: 0,
};

const cardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CARD_ACTION_TYPE_ACTION.SET_CARD_ITEMS:
      console.log('inam payload');
      console.log(payload);
      return {
        ...state,
        ...payload,
      };
    case CARD_ACTION_TYPE_ACTION.SET_IS_CARD_OPEN:
      return {
        ...state,
        isCardOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cardReducer`);
  }
};

export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, INITIAL_STATE);

  const { cardItems, cardTotal, cardCount, isCardOpen } = state;

  const updateCardItemsReducer = (newCardItems) => {
    const newCardCount = newCardItems.reduce(
      (total, cardItem) => total + cardItem.quantity,
      0,
    );
    const newCardTotal = newCardItems.reduce(
      (total, cardItem) => total + cardItem.quantity * cardItem.price,
      0,
    );
    console.log(newCardCount);
    console.log(newCardTotal);

    dispatch(
      createAction(CARD_ACTION_TYPE_ACTION.SET_CARD_ITEMS, {
        cardItems: newCardItems,
        cardCount: newCardCount,
        cardTotal: newCardTotal,
      }),
    );
  };

  const addItemToCard = (productToAdd) => {
    const newCardItems = addCardItem(cardItems, productToAdd);
    updateCardItemsReducer(newCardItems);
  };

  const removeItemFromCard = (cardToRemove) => {
    const newCardItems = removeCardItem(cardItems, cardToRemove);
    updateCardItemsReducer(newCardItems);
  };
  const clearCardItem = (cardId) => {
    const newCardItems = clearCard(cardItems, cardId);
    updateCardItemsReducer(newCardItems);
  };

  const setIsCardOpen = (bool) => {
    dispatch(createAction(CARD_ACTION_TYPE_ACTION.SET_IS_CARD_OPEN, bool));
  };

  const value = {
    isCardOpen,
    cardItems,
    cardCount,
    cardTotal,
    setIsCardOpen,
    addItemToCard,
    removeItemFromCard,
    clearCardItem,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
