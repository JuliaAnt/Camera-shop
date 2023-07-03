import { Link } from 'react-router-dom';
import { ProductCard } from '../../types/product-card';
import { PromoProduct } from '../../types/promo';

type BannerProps = {
  promoProduct: PromoProduct;
  promoProductCard: ProductCard;
}

function Banner({ promoProduct, promoProductCard }: BannerProps): JSX.Element {
  const { name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = promoProduct;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x"`} />
        <img src={`${previewImg}`} srcSet={`${previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1" data-testid={'bannerTitle'}>{name}</span>
        <span className="banner__text" data-testid={'bannerDescription'}>Профессиональная камера от известного производителя</span>
        <Link className="btn" to={`/camera/${promoProductCard.id}?tab=description`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
