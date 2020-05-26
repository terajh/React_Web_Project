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
		const mymessages = logs.map((e,index)=>{
			var space = " ";
			console.log("chatroom  ",typeof(e.name), typeof(e.message), typeof(e.to));
			console.log(e.name , typeof(this.props.name), Number(this.props.name));
			if(e.name === Number(this.props.name) && Number(e.to) != this.props.name){
				return 	<div className="myMsg" key={index}>
					<div className="msg" key={index}>
						<span className="msg" key={index}> {e.name} : {e.message} </span>
					</div>
				</div>;
			}
			else if(e.to === 'every' && e.name != Number(this.props.name)){
				return 	<div className="whisperMsg" key={index}>
						<div className="msg" key={index}>
							<span className="msg" key={index}> {e.name} : {e.message}</span>
						</div>
					</div>
			}
			else if(Number(e.to) === this.props.name){
				if(e.name === this.props.name){
					return <div className="myMsg" key={index}>
						<div className="msg" key={index}>
						<span className="msg" key={index}> {e.to}(나)에게 귓속말 => {e.name} : {e.message}</span>
					</div></div>;
				}else{
					return <div className="whisperMsg" key={index}>
						<div className="msg" key={index}>
						<span className="msg" key={index}> {e.to}에게 귓속말 => {e.name} : {e.message}</span>
					</div></div>;
				}
				
			}
		});
		
        // console.log(messages);

      // render라는 메소드를 오버라이딩해준다.
      return (
		<div id="chatWrap">
			<div id="chatHeader">ChatRoom</div>
			<div id="chatLog">
				{mymessages}
			</div>
			<ChatClient members={this.props.members}></ChatClient>
		</div>
			
				
				
      );
    }
  }

  export default ChatRoom;