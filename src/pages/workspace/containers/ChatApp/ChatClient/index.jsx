/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'



class ChatContent extends Component { 
	constructor(props){
		
		super(props);
		this.socket = null;
		this.state={
			name:"",
			message:""
		}
		this.messageChanged = this.messageChanged.bind(this);
		this.send = this.send.bind(this);
	}
	
	
	
	messageChanged(e){
		this.setState({message: e.target.value});
	}
	// bind 해줘야 됨
	
	// 서버에 이름과 메시지 전송
	send(){
		this.socket = socketio(window.location.origin);
		console.log(this.socket);
		this.socket.emit('chat message',{
			name: this.state.name,
			message: this.state.message
		});
		this.setState({message:''});
		// 입력양식을 다시 비운다.
	}
	
    // react 의 Component 클래스를 상속
    render() {
        console.log('subject render');
      // render라는 메소드를 오버라이딩해준다.
      return (
		<form id="chatForm"  onSubmit={function(e){
			e.preventDefault();
			this.send();
		}.bind(this)}>
			<input size="30" id="message" onChange={this.messageChanged} value={this.state.message}></input>
			<input type="hidden" name="name" id="nickname" value='temp'></input>
			<button id="send">send</button>
		</form>
				
      );
    }
  }

  export default ChatContent;