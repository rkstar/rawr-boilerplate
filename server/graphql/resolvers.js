import {Entry} from './connectors'
import Random from 'meteor-random'

const resolvers = {
  RootQuery: {
    entry(root, {email}){
      return Entry.findOne({email})
    }
  },

  RootMutation: {
    nameOfTypeAndResolveFunctionOnServer(root, args, context){
      const {name, email, favoriteColor} = args

      // do some validation on name, email, favoriteColor
      const _id = Random.id()
      const entry = new Entry({name, email, favoriteColor, _id})
      return entry.save()
    }
  }
}

export default resolvers