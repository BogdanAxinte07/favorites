import React from 'react';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import {Favorites} from './pages/Favorites'
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { Header } from './components/Header';
// Importam elementele necesare
import { useReducer } from 'react';
import { initialState, cartReducer } from './store/Cart/reducer';
import { CartContext } from './store/Cart/context';
import {initialState as favoritesInitialState, favoritesReducer} from './store/Favorites/reducer';
import {FavoritesContext} from './store/Favorites/context'
import {
  initialState as themeInitialState,
  themeReducer,
} from './store/Theme/reducer';
import { ThemeContext } from './store/Theme/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: '/favorites',
    element: (
      <>
      <Header />
      <Favorites />
      </>
    ),
  },
]);

export default function App() {
  // Initializam reducerul pentru cart.
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [favoritesState, favoritesDispatch] = useReducer(favoritesReducer, favoritesInitialState);
  // Initializam reducerul pentru tema.
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );
  // Cream valoarea pe care o vom pasa lui CartContext.Provider.
  const cartContextValue = {
    state,
    dispatch,
  };
  const favoritesContextValue = {
    state: favoritesState,
    dispatch: favoritesDispatch,
  }
  // Cream valoarea pe care o vom pasa lui ThemeContext.Provider.
  const themeContextValue = {
    themeState,
    themeDispatch,
  };

  return (
    // Facem dissponibile catre intreaga aplicatie state-urile globale, precum si functiile ce modifica state-urile globale.
    <CartContext.Provider value={cartContextValue}>
      <FavoritesContext.Provider value ={favoritesContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="App primary">
          <RouterProvider router={router} />
        </div>
      </ThemeContext.Provider>
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
}
