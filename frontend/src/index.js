import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-phqdz4hgiein8bc7.us.auth0.com";
const clientId = "1pkE9tqyaLeMRz52LJPxXm1xHYGWqqTh";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </Auth0Provider>
);

reportWebVitals();
