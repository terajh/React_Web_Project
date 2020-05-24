/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import FileList from './FileList'
import ReadFile from './ReadFile'



class FileManager extends Component { 
	constructor(props){
		super(props);
		this.members = []
		this._isMounted = false;
		this.state={
			file:[],
			current:0,
			fileli:null,
			title:'',
			desc:''
		}
		this.handlePost = this.handlePost.bind(this);
		this.handleFileInput = this.handleFileInput.bind(this);
		this.readContent = this.readContent.bind(this);
		this.updateContent = this.updateContent.bind(this);
		
};

	componentDidMount(){
		this._isMounted = true;
		axios.get('/api/filemanager/getLists').then((data)=>{
					var templist = data.data.list;
					console.log("123123",templist);
					var temp =  templist.map((e,index)=>{
						return <div key={index}><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
					})
					this.setState({
						fileli:temp
					})
				})
	}
	componentWillUnmount() {
   		this._isMounted = false;
	}
	
	readContent(e){
		e.preventDefault();
		var title = e.target.text;
		axios.get('/api/filemanager/readfile',{params :
			{
				data:e.target.text
			} 
		}).then(res=>{
			this.setState({
				title:title,
				desc:res.data
			})
		})
	}
	updateContent(){
		// this.props.title 파일로 write 요청 후 값 수정
		
		axios.get('/api/filemanager/getLists').then((data)=>{
				var templist = data.data.list;
				console.log("123123",templist);
				var temp =  templist.map((e,index)=>{
					return <div key={index}><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
				})
				this.setState({
					fileli:temp
				})
			})
		
	}
	
	handleFileInput(e){
		console.log(e.target.files);
		this._isMounted && this.setState({
			file : e.target.files
		})
	}
	handlePost(){
		if(this._isMounted){
			const formData = new FormData();
			let tempFiles = Array.from(this.state.file);
			tempFiles.forEach(item=>{
				console.log(item.webkitRelativePath);
				formData.append('file', item);
				formData.append('aa',item.webkitRelativePath);
			})
			return axios.post("/api/filemanager/uploadFile",formData).then(res =>{
				alert('upload 성공');
				axios.get('/api/filemanager/getLists').then((data)=>{
					var templist = data.data.list;
					console.log("123123",templist);
					var temp =  templist.map((e,index)=>{
						return <div key={index}><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
					})
					this.setState({
						fileli:temp
					})
				})
			}).catch(err => {alert('실패')});
		}
	}
    // react 의 Component 클래스를 상속
    render() {
		console.log("FileManager render");
      	// render라는 메소드를 오버라이딩해준다.
		return (
			<div>
				<FileList list={this.state.fileli}></FileList>
				<ReadFile list={this.state.fileli} title={this.state.title} desc={this.state.desc} updateContent={this.updateContent}></ReadFile>
				<input type="file" name="user_file" onChange={(e)=>this.handleFileInput(e)} directory="" webkitdirectory=""></input>
				<button type="button" value="제출" onClick={this.handlePost}>button</button>
			</div>
      );
    }
  }

  export default FileManager;