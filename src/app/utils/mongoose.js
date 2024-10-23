import { connect, connection } from "mongoose";

const{ MOONGODB_URI } = process.env

const conn = {
  isConnected: false
};

export async function dbConnected(){
  if (conn.isConnected) return;
  const db =  await connect(MOONGODB_URI);
  conn.isConnected = db.connections[0].readyState;
  console.log(db.connection.db.databaseName)
}


connection.on('connected', () => {
  console.log('mongoDb is connected')
});