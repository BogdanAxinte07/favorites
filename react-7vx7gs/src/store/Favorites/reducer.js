
export const initialState = {
  favorites: [],
};

// Reducerul primeste ca parametri state-ul, respectiv rezultatul apelului unei actiuni.
export function favoritesReducer(state, action) {
  console.log(action);
 
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      let updatedFavorites;
      let newState;
      // Verificam daca produsul continut in actiune exista deja in cart.
      const foundProduct = state.favorites.find((product) => {
        return product.id === action.payload.id;
      });

      if (!foundProduct) {
        updatedFavorites = [...state.favorites, action.payload];
      }else {
        updatedFavorites = state.favorites;
      }

      newState= {
        favorites: updatedFavorites,
      };
      return newState;
    }
    case 'REMOVE_FROM_FAVORITES': {
      const filteredFavorites = state.favorites.filter((product) => {
        return product.id !== action.payload;
      });
      
      const newState = {
       favorites: filteredFavorites,
      };
      return newState;
    }
    // Nu uitam ca in cazul default sa returnam state-ul anterior, nemodificat!
    default:
      return state;
  }
}
