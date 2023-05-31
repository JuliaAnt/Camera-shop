import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Catalog}>
          <Route index element={<CatalogPage />} />
          <Route path={AppRoute.Camera} element={<ProductPage />} />
          <Route path={AppRoute.Basket} element={<BasketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
