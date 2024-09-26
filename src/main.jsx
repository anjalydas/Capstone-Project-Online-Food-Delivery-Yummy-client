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
import AddStore from './pages/vendor/create-store.jsx';
import AddFoodItem from './pages/vendor/add-item.jsx';
import UpdateFoodItem from './pages/vendor/update-item.jsx';
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
import VendorHome from "./pages/vendor/vendorHome.jsx";
import UserRoot from "./pages/admin/root.jsx";
import LoginPage from "./pages/admin/login.jsx";
import AdminHome,{loader as adminHomeLoader} from "./pages/admin/home.jsx";
import User, {loader as userLoader} from "./pages/admin/users.jsx";
import Unauthorized from "./routes/unauthorised.jsx";
import DeleteFoodItem from "./pages/vendor/delete-item.jsx"
import VendorLogin from "./pages/vendor/vendor-login.jsx";
import VendorSignUp from "./pages/vendor/vendor-signup.jsx";
import SuccessPage from "./pages/user/success.jsx";
import CancelPage from "./pages/user/cancel.jsx";

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
        path:"unauthorised",
        element:<Unauthorized/>
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
            path: "mycart",
            element:<Cart />
          },
          {path: "/payment/create-checkout-session",
            element: <PaymentSummary />
          },
              {
                path:"success",
                element: <SuccessPage />
              },
              {
                path: "cancel",
                element: <CancelPage />
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
          path: "admin-home",
          element: <AdminHome />,
      }
    ]
  },
  
  {
    path: "user",
    element: <UserRoot />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:"",
        element: <LoginPage />,
      },
      {
        path:"home-page",
        element: <AdminHome />,
        loader: adminHomeLoader
      },
      {
        path:"users",
        element: <User />,
        loader: userLoader
      },
    ]},
    {
      path: "vendor-login",
      element: <VendorLogin />,
    },
      {
        path: "vendor-home",
        element:<VendorHome />
          
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
        path:"delete-foodItem",
        element: <DeleteFoodItem />
      },
    
      {
        path: "vendor-signup",
        element: <VendorSignUp />
      }
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

