import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PayPalScriptProvider>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
    </PayPalScriptProvider>
  </Provider>
);

 
 
