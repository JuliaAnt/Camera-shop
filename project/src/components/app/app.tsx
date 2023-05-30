import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import CameraPage from '../../pages/camera-page/camera-page';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Catalog}>
          <Route index element={<CatalogPage />} />
          <Route path={AppRoute.Camera} element={<CameraPage />} />
          <Route path={AppRoute.Basket} element={<BasketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
