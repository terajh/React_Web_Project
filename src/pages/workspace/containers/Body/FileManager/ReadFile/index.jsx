/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import style from './style.scss';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class ReadFile extends Component { 
	constructor(props){
		super(props);
		this.selected_id = 0;
		this._isMounted = false;
		this._title='';
		this._desc='';
		this.state={
			title:'FileName',
			desc:'Description'
		}
		this.inputFormHandler = this.inputFormHandler.bind(this);
		this.getTitleValue = this.getTitleValue.bind(this);
		this.getDescValue = this.getDescValue.bind(this);
		this.updatefile = this.updatefile.bind(this);
		this.deletefile = this.deletefile.bind(this);
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
	updatefile(e){ // 변경된 파일명, 파일내용 업데이트하기
		var newtitle = String(this.state.title)
		axios.get('/api/filemanager/updatefile',{
			params :
				{
					title : this.props.title.split('/').join('_#@'),
					descriptions : this.state.desc,
					newtitle : this.state.title.split('/').join('_#@')
				} 
		}).then(res=>{
			alert('수정완료');
			this.props.updateContent();
		})
	}
	
	deletefile(e){ // 파일 삭제하기
		axios.get('/api/filemanager/deletefile',{params :
			{
				title:this.props.title.split('/').join('_#@')
			} 
		}).then(res=>{
			alert('수정완료');
			this.props.updateContent();
		})
	}
	
	getTitleValue(){ // update 되었는지 파악
		if(this._title!=this.props.title) {
			this._title=this.props.title;
			this.setState({
				title:this.props.title
			})
		}
		return this.state.title;
	}
	
	getDescValue(){ // update 되었는지 파악
		if(this._desc!=this.props.desc) {
			this._desc=this.props.desc;
			this.setState({
				desc:this.props.desc
			})
		}
		return this.state.desc;
	}
	
    render() {
		console.log("ReadFile render", typeof(this.props.title.split('/')));
		return (
			<table style={{
					height:"100%"
				}}>
				<tbody>
					<tr>
						<FormGroup>
							<Label id="title_name">FileName</Label>
							<Input 
							id="read_title"
							type="email" 
							name="title" 				
							placeholder=""
							value={this.getTitleValue()}
							onChange={this.inputFormHandler}
							>
							</Input>
						</FormGroup>
					</tr>
					<tr style={{padding:'1px'}}>
						<FormGroup>
							<Input 
								id="read_description" 
								type="textarea"
								name="desc" 
								placeholder=""
								value={this.getDescValue()}				
								onChange={this.inputFormHandler}
								>
							</Input>
						</FormGroup>
					</tr>

					<tr>
						<Button id="deletecontent" onClick={this.deletefile}>삭제</Button>
						<Button id="writecontent" onClick={this.updatefile}>수정</Button>
					</tr>
				</tbody>
            </table>
      );
    }
  }

  export default ReadFile;