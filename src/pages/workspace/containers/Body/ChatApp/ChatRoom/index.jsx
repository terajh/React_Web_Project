/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import ChatClient from './ChatClient'



class ChatRoom extends Component { 
	constructor(props){
		super(props);
		this._isMounted = false;
		this.socket = this.props.socket;
	}
	
	componentDidMount(){
		this._isMounted = true;
	}
	componentWillUnmount() {
   		this._isMounted = false;
	}
    // react 의 Component 클래스를 상속
    render() {
		const logs = this.props.data;
		const messages = logs.map((e,index)=>{
			
			return <div className="msg" key={index}>
				<span className="msg" key={index}>{e.name} : {e.message}</span>
			</div>;
		});
        // console.log(messages);

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

  export default ChatRoom;