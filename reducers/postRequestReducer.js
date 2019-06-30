export default function itemReducer(state={ itemList : [], s1 : 0}, action) {

    switch (action.type) {
      
      case "UPDATE_ITEM_LIST": {
        state = {...state, itemList : action.payload.allItems}
        break
      }
      case "X": {
        state = {...state, s1 : ""}
        break
      }
      default: break
    }

    return state
}
