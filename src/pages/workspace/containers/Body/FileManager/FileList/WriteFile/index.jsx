/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

class FileManager extends Component { 
	constructor(props){
		super(props);
		this.members = []
		this._isMounted = false;
		this.state={
			title:'',
			desc:''
		}
		this.handlePost = this.handlePost.bind(this);
		this.handleFileInput = this.handleFileInput.bind(this);
		
};

	componentDidMount(){
		this._isMounted = true;
	}
	componentWillUnmount() {
   		this._isMounted = false;
	}
	inputFormHandler(){
		
	}
    render() {
		console.log("FileContent render");
      	// render라는 메소드를 오버라이딩해준다.
		return (
			<div>
				<p>
					<input 
						type="text" 
						name="title" 
						placeholder="title"
						value={this.state.title}
						onChange={this.inputFormHandler}
					>
					</input>
				</p>
				<p>
					<textarea name="desc" placeholder="description"
					value={this.state.desc}
					onChange={this.inputFormHandler}></textarea>
				</p>
			</div>
      );
    }
  }

  export default FileManager;