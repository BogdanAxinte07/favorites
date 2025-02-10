import React from 'react';
import { Link } from 'react-router-dom';
// Importam ce avem nevoie.
import { CartContext } from '../store/Cart/context';
import { useContext } from 'react';

export function Header() {
  // Accesam state-ul global al cart-ului.
  const { state } = useContext(CartContext);

  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          {/* Afisam datele din state pe ecran. */}
          <Link to="/cart">Coș ({state.products.length})</Link>
          <Link to="/favorites"> Favorite ({(state.favorites) ? state.favorites.length : 0}) </Link>
        </div>
      </div>
    </header>
  );
}
