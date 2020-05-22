/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import axios from 'axios'



class ChatList extends Component { 
	constructor(props){
		super(props);
		this.socket = this.props.socket;
		this.member_count;
		this.state={
			members:[]
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount(){
		this.socket.on('update member',()=>{
			axios.get('/api/member/readmembers').then(({data})=>{
				console.log('updatae members to',data);
				let newMembers = [];
				data.forEach((e)=>{
					newMembers.push(e.name);
				})
				this.setState({
					members:newMembers
				});
			});
		});
		this.socket.on('removes members',(name)=>{
			axios.get('/api/member/readmembers').then(({data})=>{
				console.log('remove members to',data);
				let newMembers = [];
				data.forEach((e)=>{
					if(e.name!=name){
						newMembers.push(e.name);
					}
				});
				console.log("remove and",newMembers);
				this.setState({
					members:newMembers
				});
			});
		});
	}
	
	getlist(){
		var temp = Array.from(this.state.members);
		var newlist = temp.map((e)=>(
			<div id="memberSelect">{e}</div>
		));
		return newlist;
		
	}
    // react 의 Component 클래스를 상속
    render() {
		console.log("Chatlist render");
		
		// console.log(this.props.data);
		// render라는 메소드를 오버라이딩해준다.
		return (
			<div id="memberWrap">
				<div id="memberList">
					<div id="memberHeader">사람</div>	
					{this.getlist()}
				</div>
			</div>
      );
    }
  }

  export default ChatList;