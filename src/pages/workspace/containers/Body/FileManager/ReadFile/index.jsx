/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

class ReadFile extends Component { 
	constructor(props){
		super(props);
		this.selected_id = 0;
		this._isMounted = false;
		this._title='';
		this._desc='';
		this.state={
			title:'',
			desc:''
		}
		this.inputFormHandler = this.inputFormHandler.bind(this);
		this.getTitleValue = this.getTitleValue.bind(this);
		this.getDescValue = this.getDescValue.bind(this);
		this.updatefile = this.updatefile.bind(this);
};

	componentDidMount(){
		this._isMounted = true;
		
		this.setState({
			title:this.props.title,
			desc:this.props.desc
		})
	}
	componentWillUnmount() {
   		this._isMounted = false;
	}
	inputFormHandler(e){
		this.setState({[e.target.name]:e.target.value});
	}
	updatefile(e){
		// this.props.title 파일로 write 요청 후 값 수정
		axios.get('/api/filemanager/updatefile',{params :
			{
				title:this.props.title,
				descriptions:this.state.desc,
				newtitle:this.state.title
			} 
		}).then(res=>{
			alert('수정완료');
			this.props.updateContent();
		})
	}
	getTitleValue(){
		if(this._title!=this.props.title) {
			this._title=this.props.title;
			this.setState({
				title:this.props.title
			})
		}
		return this.state.title;
	}
	getDescValue(){
		if(this._desc!=this.props.desc) {
			this._desc=this.props.desc;
			this.setState({
				desc:this.props.desc
			})
		}
		return this.state.desc;
	}
	
    render() {
		
		console.log("ReadFile render");
      	// render라는 메소드를 오버라이딩해준다.
		return (
			<article>
                <p>
					<input 
						type="text" 
						name="title" 
						placeholder={this.props.title}
						value={this.getTitleValue()}
						onChange={this.inputFormHandler}
					>
					</input>
				</p>
				<p>
					<textarea name="desc" placeholder={this.props.desc}
					value={this.getDescValue()}
					onChange={this.inputFormHandler}></textarea>
				</p>
				<button onClick={this.updatefile}>수정</button>
            </article>
      );
    }
  }

  export default ReadFile;