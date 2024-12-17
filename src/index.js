import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AdminRoutes, publicRoutes,VendorRoutes } from './routes';
import { Suspense } from 'react';
import { Loader } from 'react-feather';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { VendorOrderProvider } from './components/context/VendorOrderContext';
import './@core/assets/fonts/feather/iconfont.css';
import "./@core/scss/core.scss";
import FallBackSpinner from "./components/common/FallBackSpinner";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <VendorOrderProvider>
  <Suspense fallback={<Loader/>}>
  <React.StrictMode fallback={<FallBackSpinner />}>
    <Provider store={store}>
    <VendorOrderProvider>
      <BrowserRouter>
        <Routes>
          {AdminRoutes.map(({path,Component}) => (
            <Route
            key={path}
            path={path}
            element={
              <App>
                <Component/>
              </App>
            }
            ></Route>
          ))}
          { VendorRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <App>
                  <Component />
                </App>
              }
            ></Route>
          ))}
          {publicRoutes.map(({ path, Component }) => (
            <>
            <Route
              key={path}
              path={path}
              element={
                  <Component />
              }
            ></Route>
            <Route path="/" element={<Navigate to="/login" />} />
            </>
          ))}
        </Routes>
      </BrowserRouter>
      </VendorOrderProvider>
    </Provider>
  </React.StrictMode>
  </Suspense>
  // {/* </VendorOrderProvider> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
