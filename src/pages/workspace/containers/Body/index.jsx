import React from 'react';
import axios from 'axios';
import socketio from 'socket.io-client'
import ChatApp from './ChatApp'
import FileManager from './FileManager'
import Control from './Control'
import { Jumbotron, Container } from 'reactstrap';

class Body extends React.Component {
	constructor(props) {
		super(props);
		this.socket = socketio(window.location.origin);
		this.state = {
			userId: '',
			removemembers: [],
			mode:'control'
		};
	}
	
  	getContent(){
		var _article;
		if(this.state.mode === 'chat'){
			_article = <ChatApp socket={this.socket}></ChatApp>;
			
			axios.get('api/member/writemembers').then(()=>{
				axios.get('/api/account/id').then(({data})=>{
					this.socket.emit('new members',{
						name:data
					});
					console.log("new members is",data);
				});
			})
		}
		else if(this.state.mode === 'control'){
			_article = <Jumbotron fluid>
							<Container fluid>
								<h1 className="display-3">Main Page</h1>
								<p className="lead">Chat Room and File Manager Web Page</p>
							</Container>
						</Jumbotron>;
			
			axios.get('/api/member/removemembers').then(()=>{
				axios.get('/api/account/id').then(({data})=>{
					this.socket.emit('remove member',data);
					console.log("remove members is",data);
				});
			});
		}
		else if(this.state.mode === 'fm'){
			_article = <FileManager></FileManager>
		}
		return _article;
	}
	
	signOut = () => {
		window.location.href = '/api/account/signout';
	};

	render() {
		const { userId } = this.state;
		return (
			<div>
				<Control onChangeMode={function(_mode){
				this.setState({
				  mode:_mode
				})
				}.bind(this)}>
				</Control>
				{this.getContent()}
			</div>
		);
	}
}

export default Body;