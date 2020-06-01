/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import FileList from './FileList'
import ReadFile from './ReadFile'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



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
					var temp =  templist.map((e,index)=>{
						return <div className="fileLists" key={index}><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
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
		var title = e.target.text.split('/').join('_#@');
		
		axios.get('/api/filemanager/readfile',{params :
			{
				data:title
			} 
		}).then(res=>{
			let temp;
			if(title.indexOf('_#@')!=-1){
				temp = title.split('_#@').join('/');
			}
			else temp = title;
			this.setState({
				title:temp,
				desc:res.data
			})
		})
	}
	updateContent(){
		// this.props.title 파일로 write 요청 후 값 수정
		
		axios.get('/api/filemanager/getLists').then((data)=>{
				var templist = data.data.list;
				var temp =  templist.map((e,index)=>{
					return <div key={index} className="fileLists"><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
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
				formData.append('path',item.webkitRelativePath);
				formData.append('file', item);
				console.log(item, item.webkitRelativePath);
			})
			return axios.post("/api/filemanager/uploadFile",formData).then(res =>{
				alert('upload 성공');
				axios.get('/api/filemanager/getLists').then((data)=>{
					var templist = data.data.list;
					var temp =  templist.map((e,index)=>{
						return <div key={index+1} className="fileLists" ><a href="/" key={index} name={e} onClick={this.readContent}>{e}</a></div>;
						
					});
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
			<div id="container">
				<div id="contentCover">
					<div id="showlist">
						<FileList list={this.state.fileli} readContent={this.readContent}></FileList>
					</div>
					<div id="showcontent">
						
						<ReadFile list={this.state.fileli} 
							 title={this.state.title} 
							 desc={this.state.desc} 
							 updateContent={this.updateContent} 
							 readContent={this.readContent}>
						</ReadFile>
						
						<div id="putFile">					
							<div id="fileInput">
								<p>폴더 선택 <Input style={{
										width:'300px'						
									}}  
									type="file" 
									name="user_file" 
									onChange={(e)=>this.handleFileInput(e)} 
									directory="" 
									webkitdirectory="">
								</Input></p>
								<p>파일 선택 <Input  style={{
										width:'300px'								
										}} 
										type="file" 
										name="user_file" 
										onChange={(e)=>this.handleFileInput(e)} 
										accept=".zip, .tar">
								</Input></p>
								<Button id="filebutton" type="button" value="제출" onClick={this.handlePost}>업로드</Button>
							</div>
							
						</div>						
					</div>
				</div>
			</div>
      );
    }
  }

  export default FileManager;