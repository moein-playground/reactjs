import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/categories.selector';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories);

  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="cat-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
