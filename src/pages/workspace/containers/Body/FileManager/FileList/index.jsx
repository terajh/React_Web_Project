/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

class FileList extends Component { 
	constructor(props){
		super(props)
		this._isMounted = false;
		this._lists = null;
		this.state={
			mode:'lists',
			title:'',
			desc:'',
			fileList:[],
			fileli:null
		}
		
};

	componentDidMount(){
		this._isMounted = true;
		axios.get('/api/filemanager/getLists').then((data)=>{
			var templist = data.data.list;
			console.log("123123",templist);
			var temp =  templist.map((e,index)=>{
				return <div key={index}><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
			})
			this._lists = temp;
			this.setState({
				fileList:data.data.list,
				fileli:temp
			})
		})
	}
	componentWillUnmount() {
   		this._isMounted = false;
	}


	
    // react 의 Component 클래스를 상속
    render() {
		console.log("FileList render");
      	// render라는 메소드를 오버라이딩해준다.
		return (
				<div className="filelist">
					<ul>
						{this.props.list}
					</ul>
				</div>
			)
      
    }
  }

  export default FileList;