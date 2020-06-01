/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import ChatClient from './ChatClient'



class ChatRoom extends Component { 
	constructor(props){
		super(props);
		this.getMessages = this.getMessages.bind(this);
	}
	
	getMessages(){
		const logs = this.props.data;
		const mymessages = logs.map((e,index)=>{
			var space = " ";
			console.log("chatroom  ",typeof(e.name), typeof(e.message), typeof(e.to));
			if(e.name === Number(this.props.name) && Number(e.to) != this.props.name){ // 내가 보낸 메시지인 경우
				return 	<div className="myMsg" key={index}>
							<div className="msg" key={index}>
								<span className="msg" key={index}> {e.name} : {e.message} </span>
							</div>
						</div>;
			}
			else if(e.to === 'every' && e.name != Number(this.props.name)){ // 전체 채팅치는 경우
				return 	<div className="whisperMsg" key={index}>
							<div className="msg" key={index}>
								<span className="msg" key={index}> {e.name} : {e.message}</span>
							</div>
						</div>;
			}
			else if(Number(e.to) === this.props.name){ // 귓속말하는 경우
				if(e.name === this.props.name){ // 내가 나에게 귓속말 하기
					return  <div className="myMsg" key={index}>
								<div className="msg" key={index}>
									<span className="msg" key={index}> {e.to}(나)에게 귓속말 > {e.name} : {e.message}</span>
								</div>
							</div>;
				}
				else{ // 다른사람이 나에게 귓속말 하기
					return  <div className="whisperMsg" key={index}>
								<div className="msg" key={index}>
									<span className="msg" key={index}> {e.to}에게 귓속말 > {e.name} : {e.message}</span>
								</div>
							</div>;
				}
			}
		});
		return mymessages;
	}
	
	
    render() {
      return (
		<div id="chatWrap">
			<div id="chatHeader">ChatRoom</div>
			<div id="chatLog">
				{this.getMessages()}
			</div>
			<ChatClient members={this.props.members}></ChatClient>
		</div>	
      );
    }
  }

  export default ChatRoom;