import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// Importam ce avem nevoie.
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import {FavoritesContext} from '../store/Favorites/context';
import {addToFavorites} from '../store/Favorites/actions';
export function Products() {
  // vom modifica state-ul cart-ului, deci avem nevoie de dispatch
  const { dispatch } = useContext(CartContext);
  const { dispatch: favoritesDispatch } = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  function handleAddToCart(product) {
    // Apelam actiunea, cu payload-ul aferent.
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer.
    dispatch(actionResult);
  }
  function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        {/* Afisam produsele pe ecran, sub forma de carduri de Bootstrap. */}
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
              {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url */}
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  // Construim payload-ul si il pasam ca argument functiei care va apela actiunea addToCart.
                  handleAddToCart({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>

              <Button
                variant="warning"
                className="mt-2"
                onClick={() => {
                  handleAddToFavorites({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
              
            </Card>
          );
        })}
      </div>
    </div>
  );
}
