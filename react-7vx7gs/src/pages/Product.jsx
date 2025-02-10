import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
// Importam ce avem nevoie.
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import {FavoritesContext} from '../store/Favorites/context';
import {addToFavorites} from '../store/Favorites/actions';

export function Product() {
  // vom modifica state-ul cart-ului, deci avem nevoie de dispatch.

  const { dispatch } = useContext(CartContext);
  const { dispatch: favoritesDispatch } = useContext(FavoritesContext);
  let { id } = useParams(); //in url idul este codificat cu functia encodeURI. il decodam
  id = decodeURI(id);
  //cerem produsul de la API si actualizam stateul
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  function handleAddToCart(product) {
    // Apelam actiunea, cu payload-ul aferent.
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer.
    dispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    // Apelam actiunea, cu payload-ul aferent.
    const actionResult = addToFavorites(product);
    // Trimitem rezultatul actiunii catre reducer.
    favoritesDispatch(actionResult);
  }
  //extragem datele de interes din produs.
  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  return (
    //afisam datele despre produs pe ecran
    <div className="d-flex my-3">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Pret Intreg: {retailPrice}$</p>
        <p>
          Pret redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button
          variant="success"
          onClick={() => {
            //construim payload-ul si il pasam ca argument functiei care va apela actiunea addToCart
            handleAddToCart({
              id,
              image: thumb,
              name: name,
              price: retailPrice,
            });
          }}
        >
          Adauga in cos
        </Button>

        <Button
          variant="warning"
          className="ms-2"
          onClick={() => {
            handleAddToFavorites({
              id,
              image: thumb,
              name: name,
              price: retailPrice,
            });
          }}
        >
          Adauga la favorite
        </Button>
        
      </div>
    </div>
  );
}
