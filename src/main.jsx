import React from "react";
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root.jsx';
import ErrorPage from './error-page.jsx';
import Home, {loader as homeLoader} from './routes/home.jsx';
import FoodItem, {loader as itemLoader} from './pages/user/foodItem.jsx';
import Login from './pages/user/login.jsx';
import Logout from './pages/user/logout.jsx';
import SignUp from './pages/user/sign-up.jsx';
import { Provider } from 'react-redux';
import store  from './app/store.jsx';
import UpdateStore , {loader as updateStoreLoader}from './pages/admin/update-store.jsx';
import AddStore from './pages/vender/create-store.jsx';
import AddFoodItem from './pages/vender/add-item.jsx';
import UpdateFoodItem from './pages/vender/update-item.jsx';
import DeleteFoodItem from './pages/vender/delete-item.jsx';
import Cart from './pages/user/cart.jsx';
import PaymentSummary from './pages/user/payment.jsx';
import About from './pages/admin/about.jsx';
import FoodItemDetails, {loader as foodItemDetailsLoader} from './pages/user/foodItemDetails.jsx';
import StoreDetails, {loader as storeDetailsLoader}  from './pages/user/storeDetails.jsx';
import PrivacyPolicy from './pages/admin/privacyAndPolicy.jsx';
import TermsAndConditions from './pages/admin/terms-conditions.jsx';
import CancellationAndRefundPolicy from './pages/admin/cancellation-refund-policy.jsx';
import CustomerCare from './pages/admin/customercare.jsx';
import { SearchProvider } from './context/searchContext.jsx';
import SearchResults from './pages/user/search.jsx';
import Store, {loader as storeLoader} from './pages/user/store.jsx';
import VendorHome from "./pages/vender/venderHome.jsx";
import AdminHome from "./pages/admin/adminHome.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children:[
      {
      path:"",
      element: <Home />,
      loader: homeLoader 
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"item",
        element: <FoodItem />,
        loader:itemLoader
        },
        {
          path:"store",
          element: <Store />,
          loader: storeLoader
          },
          {
            path:"login",
            element: <Login />
          },
          {
            path:"logout",
            element: <Logout />
          },
          {
            path:"sign-up",
            element: <SignUp />
          },
          {
            path:"update-store",
            element: <UpdateStore />,
            loader: updateStoreLoader
          },
          {
            path:"create-store",
            element: <AddStore/>
          },
          {
            path:"add-foodItem",
            element: <AddFoodItem/>
          },
          {
            path:"edit-foodItem/:foodItemId",
            element:<UpdateFoodItem/>
          },
          {
            path:"/delete-foodItem",
            element:<DeleteFoodItem />
          },
          {
            path: "mycart",
            element:<Cart />
          },
          {path: "payment-gateway",
            element: <PaymentSummary />
          },
          {
            path: "item/:foodItemId",
            element: <FoodItemDetails />,
            loader: foodItemDetailsLoader
          },
          {
            path: "store/:storeId",
            element: <StoreDetails />,
            loader: storeDetailsLoader
          },
          {
            path:"/privacy-policy",
            element: <PrivacyPolicy />
          },
          {
            path:"/terms-conditions",
            element: <TermsAndConditions />
          },
          {
            path:"/cancellation-refund-policy",
            element: <CancellationAndRefundPolicy />
          },
          {
            path:"/customer-care",
            element: <CustomerCare />
          },
          {
            path:"/search",
            element: <SearchResults />
          },
        {
            path: "vender-home",
            element: <VendorHome />,
        },
        {
          path: "admin-home",
          element: <AdminHome />,
      }
    ]
  },
]
);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
      <SearchProvider >
    <RouterProvider router={router} />
    </SearchProvider>
    </Provider>
  </React.StrictMode>,
)

