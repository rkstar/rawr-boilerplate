import mongoose from 'mongoose'
import settings from '../../config/settings.json'

// get the mongoose promise to Promise
mongoose.Promise = global.Promise

// connect to db
const db = mongoose.connect(settings.mongoUrl)
const EntrySchema = mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  favoriteColor: String
})
const Entry = mongoose.model('entries', EntrySchema)

export {
  EntrySchema,
  Entry
}