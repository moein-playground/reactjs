import { createContext, useEffect, useState } from 'react';

const addCardItem = (cardItems, productToAdd) => {
  const exsitingCardItem = cardItems.find(
    (cardItem) => cardItem.id === productToAdd.id,
  );

  if (exsitingCardItem) {
    return cardItems.map((cardItem) =>
      cardItem.id === productToAdd.id
        ? { ...cardItem, quantity: cardItem.quantity + 1 }
        : cardItem,
    );
  }

  return [...cardItems, { ...productToAdd, quantity: 1 }];
};

export const CardContext = createContext({
  isCardOpen: false,
  setIsCardOpen: () => {},
  cardItems: [],
  addItemToCard: () => {},
  cardCount: 0,
});

export const CardProvider = ({ children }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    const newCardCount = cardItems.reduce(
      (total, cardItem) => total + cardItem.quantity,
      0,
    );
    setCardCount(newCardCount);
  }, [cardItems]);

  const addItemToCard = (productToAdd) => {
    setCardItems(addCardItem(cardItems, productToAdd));
  };

  const value = {
    isCardOpen,
    setIsCardOpen,
    addItemToCard,
    cardItems,
    cardCount,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
