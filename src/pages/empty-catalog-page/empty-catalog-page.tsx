import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import Header from '../../components/header/header';
import { ProductCard } from '../../types/product-card';
import { PromoProduct } from '../../types/promo';

type EmptyCatalogPageProps = {
  promoProduct: PromoProduct | null;
  promoProductCard: ProductCard | undefined;
}

function EmptyCatalogPage({ promoProduct, promoProductCard }: EmptyCatalogPageProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        {!!promoProduct && promoProductCard && <Banner promoProduct={promoProduct} promoProductCard={promoProductCard} />}
        <div className="page-content">
          <section className="catalog">
            <div className="container">
              <h2 className="title title--h2">Не удалось загрузить товары</h2>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EmptyCatalogPage;
