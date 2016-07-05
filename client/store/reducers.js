export function myReducer(state={}, action){
  switch( action.type ){
    case "SOME:ACTION:TYPE":
      // do some stuff with the data...
      return {
        ...state,
        user: {...action}
      }

    default:
      return state
  }
}