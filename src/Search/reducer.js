const InitialState = {
  searchItems: [],
  userChoise: {
    engineTo: 0,
    engineFrom: 0,
    yearFrom: 0,
    yearTo: 0,
    manufacturer: '',
    model: '',
    price: '0-0',
    exchange: false,
    withPhoto: false,
    fuel: '',
    condition: '',
    transmission: '',
    drive: '',
    city: '',
  },
  searchResult: [],
};

const reducer = function(state = InitialState, action) {

  switch (action.type) {
    case "SET_SEARCH_ITEMS":
      return {...state, searchItems: action.payload}
      
    case "REMOVE_SEARCH_ITEMS":
      return {...state, searchItems: []}
      
    case "SET_USER_CHOISE":
      return {...state, userChoise: action.payload}
      
    case "REMOVE_USER_CHOISE":
      return {...state, userChoise: {}}
    
    case "SET_SEARCH_RESULT":
      return {...state, searchResult: action.payload}
      
    case "REMOVE_SEARCH_RESULT":
      return {...state, searchResult: []}

    default:
      return state;
  }
}

export default reducer;
