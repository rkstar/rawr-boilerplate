const typeDefinitions = [`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  
  type Entry {
    _id: String
    name: String!
    email: String!
    favoriteColor: String
  }
  
  type RootQuery {
    entry: Entry
  }
  
  type RootMutation {
    nameOfTypeAndResolveFunctionOnServer(
      name: String!
      email: String!
      favoriteColor: String
    ): Entry
  }
`]

export default typeDefinitions