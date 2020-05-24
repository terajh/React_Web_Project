/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import axios from 'axios'



class ChatList extends Component { 
	constructor(props){
		super(props);
		this.socket = this.props.socket;
		this._isMounted = false;
		this.member_count;
		this.state={
			whisperId:'',
			members:[]
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount(){
		this._isMounted = true;
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
	
	getlist(){
		var temp = Array.from(this.state.members);
		let index = -1;
		var newlist = temp.map((name, index)=>{
			return <div className="members" key={index}> {name} </div>;
		});
		return newlist;
		
	}
    // react 의 Component 클래스를 상속
    render() {
		console.log("Chatlist render");
		
		return (
			<div id="memberWrap">
				<div id="memberList">
					<div id="memberHeader">사람</div>	
					<div id="memberSelect">{this.getlist()}</div>
					
				</div>
			</div>
      );
    }
  }

  export default ChatList;