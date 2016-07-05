import gql from 'graphql-tag'

function buildMutation(data){
  return {
    mutation: gql`
    mutation someArbitraryName(
      $name: String!
      $email: String!
      $favoriteColor: String
    ){
      nameOfTypeAndResolveFunctionOnServer(
        name: $name
        email: $email
        favoriteColor: $favoriteColor
      ){
        _id, name
      }
    }`,
    variables: data
  }
}

export function myActionCreator({name, email, favoriteColor}){
  // we're going to do something with this person's email address
  // and choice of color...
  return (dispatch, getState, client)=>{
    client.mutate(buildMutation({name, email, favoriteColor}))
      .then((GraphQLResult)=>{
        dispatch({
          type: "SOME:ACTION:TYPE",
          name, email, favoriteColor,
          result: GraphQLResult
        })
      })

    // client.mutate(...)
    //   .then((GraphQLResult)=>{
    //     dispatch({
    //       type: "SOME:ACTION:TYPE",
    //       name, email, favoriteColor,
    //       result: GraphQLResult
    //     })
    //   })
    // -- or --
    // client.query(...)
    //   .then((GraphQLResult)=>{
    //     dispatch({
    //       type: "SOME:ACTION:TYPE",
    //       result: GraphQLResult
    //     })
    //   })
  }
}