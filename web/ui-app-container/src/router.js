import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './AuthRoute';
import Login from './components/contents/Login';
// pgr view, search, update
import grievanceCreate from './components/contents/pgr/grievanceCreate';
import grievanceView from './components/contents/pgr/grievanceView';
import grievanceSearch from './components/contents/pgr/grievanceSearch';
// generic component loader
import ComponentLoader from './components/framework/componentloader';
//certificate
import CertificateView from './components/contents/SRNView.js';

const Main = () => {
  return (
    <main style={{ marginBottom: '50px' }}>
      <Switch>
        <Route exact path={'/loadComponent'} component={ComponentLoader} />
        <Route exact path={'/:tenantId?'} component={Login} />
        <Route exact path={'/pgr/createGrievance'} component={grievanceCreate} />
        <Route exact path={'/pgr/viewGrievance/:srn'} component={grievanceView} />
        <Route exact path={'/pgr/searchGrievance'} component={grievanceSearch} />
        <Route exact path={'/service/request/view/:srn/:isCertificate'} component={CertificateView} />;
      </Switch>
    </main>
  );
};

export default <Main />;
