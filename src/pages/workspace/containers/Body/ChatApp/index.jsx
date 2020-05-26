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
		this._isMounted = false;
		this.user = '';
		this.state={
			logs:[],
			members:[]
		}
};

	componentDidMount(){
		
		// 실시간으로 로그를 받게 설정한다.
		axios.get('/api/account/id').then((data)=>{
			this.user = data.data;
		});
		this._isMounted = true;
		console.log("set message log",this.user);
		
		
		this._isMounted && this.socket.on('update message',(obj)=>{
			console.log(typeof(Number(obj.to)),typeof(obj.name),typeof(this.user));
			const logs2 = Array.from(this.state.logs);
			if(obj.name===this.user || Number(obj.to)===this.user || obj.to==='every'){
				obj.key = 'key_'+(this.state.logs.length + 1);
				console.log(obj.message,obj.to);
				logs2.push(obj); // 로그에 추가하기
				if(this._isMounted) this.setState({logs:logs2});
			}
			
		});
		
		
		this._isMounted && this.socket.on('update member',()=>{
			axios.get('/api/member/readmembers').then(({data})=>{
				console.log('updatae members to',data);
				let newMembers = [];
				data.forEach((e)=>{
					newMembers.push(e.name);
				})
				this._isMounted && this.setState({
					members:newMembers
				});
			});
		});
		this._isMounted && this.socket.on('removes members',(name)=>{
			axios.get('/api/member/readmembers').then(({data})=>{
				console.log('remove members to',data);
				let newMembers = [];
				data.forEach((e)=>{
					if(e.name!=name){
						newMembers.push(e.name);
					}
				});
				console.log("remove and",newMembers);
				
				this._isMounted && this.setState({
					members:newMembers
				});
			});
		});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
    // react 의 Component 클래스를 상속
    render() {
		console.log('chatapp render');
		this._isMounted && axios.get('/api/member/readmembers').then(({ data }) => {
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
					<ChatRoom members={this.state.members} name={this.user} data={this.state.logs} socket={this.socket}></ChatRoom>
					<ChatList data={this.state.members} socket={this.socket}></ChatList>
				</div>
			</div>
      );
    }
  }

  export default ChatApp;