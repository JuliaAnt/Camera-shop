import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function EmptyProductPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container">
              <h2 className="title title--h2">Товар не найден</h2>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EmptyProductPage;
