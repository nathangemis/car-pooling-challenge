import express from 'express';
const server = express();
const maxRequestBodySize = '20mb'
server.use(express.json({limit: maxRequestBodySize}));
server.use(express.urlencoded({ extended: true }))

export default server