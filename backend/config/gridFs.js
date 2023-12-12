const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

const gfs = Grid(conn.db);

const File = mongoose.model('File', new mongoose.Schema({
    filename: String,
}));
