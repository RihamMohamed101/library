import { connect } from "mongoose";


export const dbConnection = connect('mongodb://localhost:27017/library_db')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));