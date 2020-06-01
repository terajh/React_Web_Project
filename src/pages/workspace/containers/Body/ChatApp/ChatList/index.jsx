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
			whisperId:'',
			members:[]
		}
	}
	
	
	getlist(){
		var temp = Array.from(this.props.data);
		var newlist = temp.map((name, index)=>{
			return <div className="members" key={index}> {name} 님 </div>;
		});
		return newlist;
	}
	
    render() {
		console.log("Chatlist render");
		return (
			<div id="memberWrap">
				<div id="memberList">
					<div id="memberHeader">사 람</div>	
					<div id="memberSelect">{this.getlist()}</div>	
				</div>
			</div>
      );
    }
  }

  export default ChatList;