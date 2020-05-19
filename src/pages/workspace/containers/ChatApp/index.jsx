/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import ChatClient from './ChatClient'



class ChatApp extends Component { 
	constructor(props){
		super(props);
		this.socket = socketio(window.location.origin);
		this.state={
			logs:[]
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount(){
		// 실시간으로 로그를 받게 설정한다.
		console.log("set message log");
		this.socket.on('chat message',(obj)=>{
			const logs2 = Array.from(this.state.logs);
			obj.key = 'key_'+(this.state.logs.length + 1);
			console.log(obj);
			logs2.push(obj); // 로그에 추가하기
			this.setState({logs:logs2});
		})
	}
    // react 의 Component 클래스를 상속
    render() {
		
		
		const messages = this.state.logs.map(e=>(
			<div className="msg">
				<span className="msg">{e.name} : {e.message}</span>
			</div>
		));
        console.log(messages);

      // render라는 메소드를 오버라이딩해준다.
      return (
		<div id="chatWrap">
			<div id="chatHeader">ChatRoom</div>
			<div id="chatLog">
				<div className="anotherMsg"></div>
				<div className="myMsg">
					{messages}
				</div>
					
			</div>

			<ChatClient></ChatClient>
		</div>
				
				
      );
    }
  }

  export default ChatApp;