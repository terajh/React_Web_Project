/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import socketio from 'socket.io-client'
import axios from 'axios';

class chatClient extends Component { 
	constructor(props){
		super(props);
		this.socket = null;
		this._isMounted = false;
		this.state={
			name:"",
			message:""
		}
		this.messageChanged = this.messageChanged.bind(this);
		this.send = this.send.bind(this);
	}
	
	messageChanged(e){
		this._isMounted && this.setState({message: e.target.value});
	}
	
	// 서버에 이름과 메시지 전송
	send(e){
		var to = e.target[0].value;
		this.socket = socketio(window.location.origin);
		console.log(to);
		this.socket.emit('chat message',{
			name: this.state.name,
			message: this.state.message,
			to:to
		});
		this._isMounted && this.setState({message:''}); // 데이터 전송 후 입력양식을 다시 비운다.
	}
	
	componentDidMount() {
		this._isMounted = true;
		this._isMounted && axios.get('/api/account/id').then(({ data }) => {
			this._isMounted && this.setState({
				name: data
			});
		});
	}
	
	componentWillUnmount(){
		this._isMounted = false;
	}
	
	getmemberlist(){
		var temp = Array.from(this.props.members);
		temp.push("every");
		return temp.map((e,index)=>{
			return <option value={e} key={index}>{e}</option>
		})
	}
	
    render() {
        console.log('ChatClient render');
      	return (
			<form id="chatForm"  
				onSubmit={function(e){
					e.preventDefault();
					this.send(e); // 메시지 전송
				}.bind(this)}>
				<select id="memberlist" style={{
					left:'1px',
					right:'1px',
					width:'10%'
				}}>{this.getmemberlist()}</select>
				<input size="30" id="message" onChange={this.messageChanged} value={this.state.message}></input>
				<input type="hidden" name="name" id="nickname" value={this.state.name}></input>
				<button id="send">send</button>
			</form>
      	);
    }
  }

  export default chatClient;