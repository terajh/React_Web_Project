/* eslint-disable */
import React, { Component } from 'react';
import {Table} from 'reactstrap'
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
			// console.log("123123",templist);
			var temp =  templist.map((e,index)=>{
				return <div key={index} className="fileLists"><a href="/" key={index} name={temp} onClick={this.props.readContent}>{e}</a></div>;
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

	
    render() {
		console.log("FileList render");
		return (
			<table id="fileList">
				<tr>
					<th id="fileName" style={{align:'center'}}>File name</th>
				</tr>
				<tr>
					{this.props.list}
				</tr>
			</table>
			)
      
    }
  }

  export default FileList;