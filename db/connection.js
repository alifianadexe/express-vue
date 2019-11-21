const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost:27017/basicData';
const db = monk(connectionString);
db.then(() => {
    console.log('Connected correctly to server')
});
module.exports = db;