import { createSelector } from 'reselect';

const selectCardReducer = (state) => state.card;

export const selectCardItems = createSelector(
  [selectCardReducer],
  (card) => card.cardItems,
);

export const selectCardCount = createSelector([selectCardItems], (cardItems) =>
  cardItems.reduce((total, cardItem) => total + cardItem.quantity, 0),
);

export const selectCardTotal = createSelector([selectCardItems], (cardItems) =>
  cardItems.reduce(
    (total, cardItem) => total + cardItem.quantity * cardItem.price,
    0,
  ),
);

export const selectCardIsOpen = createSelector(
  [selectCardReducer],
  (card) => card.isCardOpen,
);
