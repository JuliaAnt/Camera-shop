import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">
      <main style={{ background: 'url(../img/fon-fotoapparat-404.jpg)', backgroundSize: 'cover' }}>
        <div style={{ margin: '20%' }}>
          <h1 className="title title--h2" style={{ marginBottom: '10px' }}>404 - page not found</h1>
          <h1 className="title title--h3" style={{ marginBottom: '20px' }}>Страница не найдена</h1>
          <Link className="breadcrumbs__link" style={{ fontSize: '20px' }} to={AppRoute.Catalog}>Перейти на главную страницу</Link>
        </div>
      </main>
    </div >
  );

}

export default NotFoundPage;
