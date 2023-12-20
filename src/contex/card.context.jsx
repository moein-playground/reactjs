import { createContext, useEffect, useState } from 'react';

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
  isCardOpen: false,
  setIsCardOpen: () => {},
  cardItems: [],
  addItemToCard: () => {},
  removeItemFromCard: () => {},
  clearCardItem: () => {},
  cardCount: 0,
  cardTotal: 0,
});

export const CardProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [cardTotal, setCardTotal] = useState(0);

  useEffect(() => {
    const newCardCount = cardItems.reduce(
      (total, cardItem) => total + cardItem.quantity,
      0,
    );
    setCardCount(newCardCount);
  }, [cardItems]);

  useEffect(() => {
    const newCardTotal = cardItems.reduce(
      (total, cardItem) => total + cardItem.quantity * cardItem.price,
      0,
    );
    setCardTotal(newCardTotal);
  }, [cardItems]);

  const addItemToCard = (productToAdd) => {
    setCardItems(addCardItem(cardItems, productToAdd));
  };

  const removeItemFromCard = (cardToRemove) => {
    setCardItems(removeCardItem(cardItems, cardToRemove));
  };
  const clearCardItem = (cardId) => {
    setCardItems(clearCard(cardItems, cardId));
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
