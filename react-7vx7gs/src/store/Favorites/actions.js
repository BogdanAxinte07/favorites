//actiunde de adaugare la favorite
export function addToFavorites(product){
  return{
    type: 'ADD_TO_FAVORITES',
    payload: product,
  };
}

//actiunea de stergere de la favorite
export function removeFromFavorite(productId){
  return{
    type: 'REMOVE_FROM_FAVORITES',
    payload: product,
  };
}