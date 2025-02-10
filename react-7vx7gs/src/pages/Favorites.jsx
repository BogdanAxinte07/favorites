import React from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
// Importam ce avem nevoie.
import { FavoritesContext } from '../store/Favorites/context';
import { removeFromFavorites } from '../store/Favorites/actions';

export function Favorites() {
  // Extragem state-ul si dispatch-ul asociate cart-ului.
  const { state, dispatch } = useContext(FavoritesContext);

  function handleFavoritesRemove(id) {
    // Apelam actiunea, cu payload-ul aferent.
    const actionResult = removeFromFavorites(id);
    // Trimitem rezultatul actiunii catre reducer.
    dispatch(actionResult);
  }

  return (
    <div>
      {/* Afisam continutul state-ului cart-ului pe ecran. */}
      {state.favorites.length === 0 ? (
        <p>Nu ai produse la favorite.</p>
      ) : (
        state.favorites.map((product) => {
          const totalProductPrice = product.price;
          return (
            <div key={product.id} className="m-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <img src={product.image} alt="" />
                <strong>{product.name}</strong>
                <p>
                  {product.quantity} X {product.price}$ = {totalProductPrice}$
                </p>
              </div>
              <Button
                variant="danger"
                // La click pe buton, apelam functia ce va declansa modificarea state-ului.
                onClick={() => handleFavoritesRemove(product.id)}
              >
                Remove
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}
