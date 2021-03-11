export default function ItemReducer(state = {items: [], cart: []}, action){

    switch (action.type) {
        case ("ADD_ITEMS"):
            return {state, items: [...state.items, action.newItem]}
        case ("SET_ITEMS"):
            return {items: action.items}
        default: 
            return state
    }
}

// addToItems = (item) => {
//     this.setState((prevState) => {
//         return { items: [...prevState.items, item] };
//     });
//   };