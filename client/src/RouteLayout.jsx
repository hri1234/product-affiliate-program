import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
// import { AUTH_ROUTES } from './AuthRoutes';
// import { ROUTES } from './Routes';
const RouteLayout = () => {
  return (
    <>
      {/* <Routes>
        {ROUTES.map(({ path, element }, i) => (
          <Route element={<Layout />} key={i}>
            <Route path={path} element={element} />
          </Route>
        ))}
        {AUTH_ROUTES.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes> */}
      <Layout />
    </>
  );
};

export default RouteLayout;
