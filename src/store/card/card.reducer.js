import { CARD_ACTION_TYPES } from './card.types';

export const INITIAL_STATE = {
  cardItems: [],
  isCardOpen: false,
};

export const cardReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CARD_ACTION_TYPES.SET_CARD_ITEMS:
      return {
        ...state,
        cardItems: payload,
      };
    case CARD_ACTION_TYPES.SET_IS_CARD_OPEN:
      return {
        ...state,
        isCardOpen: payload,
      };
    default:
      return state;
  }
};
