const express = require('express');
const path = require('path');
const http = require('http');
const webpack = require('webpack');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redis = require('redis');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io'); 
const cors = require('cors');
const middlewares = require('./middlewares');
const axios = require('axios');

const initExpress = (redisClient) => {
	const app = express();
	const PORT = 3000;
	
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(
		session({
			key: 'app.sid',
			secret: 'session-secret',
			store: new redisStore({
				host: '127.0.0.1',
				port: 6379,
				client: redisClient,
				prefix: 'session:',
				db: 0
			}),
			resave: false,
			saveUninitialized: true,
			cookie: { path: '/', maxAge: 1800000 }
		})
	);
	app.use(express.static(path.resolve('./dist/client')));
	app.use(express.static(path.resolve('./statics')));
	app.use(express.static(path.resolve('./node_modules')));
	// path.resolve는 /를 만나면 절대경로로 인식해서 앞의 경로를 무시
	
	app.use('/', require('./routes/view'));
	app.use('/api', require('./routes/api'));
	
	app.use(middlewares.error.logging);
	app.use(middlewares.error.ajaxHandler);
	app.use(middlewares.error.handler);

	return require('http')
		.createServer(app)
		.listen(PORT, () => {
			console.log('Express server listening on port ' + PORT);
		});
};

const initRedis = () => redis.createClient();
const initMongo = async () => {
	await mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true });
};

const main = () => {
	initMongo().then(() => {
		const redisClient = initRedis();
		const server = initExpress(redisClient);
		const io= socketio.listen(server);
		console.log("socket io open");
		
		io.on('connection', (socket) => {
			console.log("connection info : ",socket.request.connection._peername);
			socket.on('chat message',(msg)=>{
				// console.log(socket.handshake.address);
				io.emit('update message',msg);
			});
			socket.on('new members',(data)=>{
				io.emit('update member');
				console.log('new members',data);
			});
			socket.on('remove member',(data)=>{
				io.emit('removes members',data);
			})
			socket.on('disconnect',(id)=>{
				console.log('user disconnected',id);
				// axios.get('/api/member/removemembers');
			});
			socket.on('scroll',()=>{
				console.log('scroll changed');
			});
		});
	});
};

main();

