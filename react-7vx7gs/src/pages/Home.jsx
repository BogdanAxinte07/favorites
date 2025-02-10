import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// Importam ce avem nevoie.
import {FavoritesContext} from '../store/Favorites/context';
import {addToFavorites} from '../store/Favorites/actions';
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import { ThemeContext } from '../store/Theme/context';
import { setLightTheme, setDarkTheme } from '../store/Theme/actions';

export function Home() {
  //vom modifica state=ul cart-ului deci avem nevoie de dispatch
  const { dispatch } = useContext(CartContext);
  const {dispatch: favoritesDispatch} = useContext(FavoritesContext)
//vom accesa si modifica state=ul temei, deci avem nevoie si de state si de dispatch.
  const { themeState, themeDispatch } = useContext(ThemeContext);
  //cerem 4 produse de la API si actualizam state-ul/
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  //extragem valoarea temei.
  const theme = themeState.theme;

  //cand dam click pe butonul de schimbare a temei, in functie de valoarea temei, declansam actiunea corespunzatoare.
  function handleThemeChange() {
    let actionResult;
    //daca tema este light declansam actiunea ce seteaza tema dark
    if (theme === 'light') {
      actionResult = setDarkTheme();
      themeDispatch(actionResult);
      //daca tema este dark, declansam actiunea ce seteaza tema light
    } else if (theme === 'dark') {
      actionResult = setLightTheme();
      themeDispatch(actionResult);
    }
  }

  //functia care se ocupa de adaugarea in cart a produsului:
  function handleAddToCart(product) {
    //apelam actiunea, cu payloadul aferent.
    const actionResult = addToCart(product);
    //trimitem rezultatul actiunii catre reducer.
    dispatch(actionResult);
  }

  function handleAddToFavorites(product){
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }

  return (
    <div className={theme === 'light' ? 'bg-white' : 'bg-dark'}>
      <div className="d-flex flex-column align-items-center">
        {/* atasam butonul */}
        <Button
          variant="outline-primary"
          className="mt-3"
          //atsam functia care va schimba state-ul global al temei.
          onClick={handleThemeChange}
        >
          Change theme
        </Button>
        {/* afisam produsele din cart */}
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              {/* fiecare card are linkul corespunzator catre pagina de produs */}
              {/* functia encodeURI transforma caracterele care nu sunt acceptate in url */}
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
                  // construim payloadul si il pasam ca argument functiei care va apela actiunea addToCart.
                  handleAddToCart({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                {' '}
                Adauga in cos{' '}
              </Button>
            {/* adaugam butonul de favorite */}
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
                Adauga la favorite
              </Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
