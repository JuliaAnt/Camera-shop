import { useAppSelector } from '../../hooks/redux-hooks';
import { getProducts } from '../../store/catalog-data/catalog-data-selectors';
import BasketItem from '../basket-item/basket-item';

type BasketListProps = {
  addedProducts: Record<number, number>;
}

function BasketList({ addedProducts }: BasketListProps): JSX.Element {
  const allProducts = useAppSelector(getProducts);
  const idList = Object.keys(addedProducts);

  return (
    <ul className="basket__list">
      {idList.map((productId) => {
        const product = allProducts.find((prod) => prod.id === +productId);
        if (product && addedProducts[+productId] > 0) {
          return <BasketItem key={productId} product={product} amount={addedProducts[+productId]} />;
        } else {
          return false;
        }
      })}
    </ul>
  );
}

export default BasketList;
