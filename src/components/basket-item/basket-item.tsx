import { ProductCard } from '../../types/product-card';

type BasketItemProps = {
  product: ProductCard;
  amount: number;
}

function BasketItem({ product, amount }: BasketItemProps): JSX.Element {
  const { id, name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode, category, level, type } = product;
  const productCost = price * amount;

  return (
    <li key={id} className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={`${category} ${name}`} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${type} ${category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}`}</li>
          <li className="basket-item__list-item">{`${level} уровень`}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${price?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} &#x20BD;</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={amount} min="1" max="99" aria-label="количество товара" />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{`${productCost?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`} &#x20BD;
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
