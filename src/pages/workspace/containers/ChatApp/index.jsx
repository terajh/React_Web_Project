/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import ChatRoom from './ChatRoom'
import ChatList from './ChatList'
import axios from 'axios';

class ChatApp extends Component { 
	constructor(props){
		super(props);
		this.socket = this.props.socket;
		this.members = []
		this.state={
			logs:[]			
		}
};

	componentDidMount(){
		// 실시간으로 로그를 받게 설정한다.
		console.log("set message log");
		this.socket.on('update message',(obj)=>{
			const logs2 = Array.from(this.state.logs);
			obj.key = 'key_'+(this.state.logs.length + 1);
			console.log(obj);
			logs2.push(obj); // 로그에 추가하기
			this.setState({logs:logs2});
		});
	}
    // react 의 Component 클래스를 상속
    render() {
		axios.get('/api/member/readmembers').then(({ data }) => {
			console.log("axios in onchat readMembers",data);
			var memberList = [];
			data.forEach((e)=>{
				memberList.push(e.name);
			});
			this.members=memberList;
		});
		console.log("chatapp render");
		// console.log(this.props.data);
      // render라는 메소드를 오버라이딩해준다.
		return (
			<div id="container">
				<div id="contentCover">
					<ChatRoom data={this.state.logs} socket={this.socket}></ChatRoom>
					<ChatList data={this.members} socket={this.socket}></ChatList>
				</div>
			</div>
      );
    }
  }

  export default ChatApp;