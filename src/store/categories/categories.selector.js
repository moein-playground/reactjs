import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategoiries = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories,
);

export const selectCategoriesMap = createSelector(
  [selectCategoiries],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {}),
);
