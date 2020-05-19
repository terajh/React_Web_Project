import React from 'react';

import Header from './containers/Header';
import CreateContent from './containers/CreateContent'
import ReadContent from './containers/ReadContent'
import UpdateContent from './containers/UpdateContent'
import ChatContent from './containers/ChatContent'
import Subject from './containers/Subject'
import Control from './containers/Control'
import TOC from './containers/TOC'

class Workspace extends React.Component {
	constructor(props) {
		super(props);
		this.max_content_id=3; 
		// 데이터를 추가할 때 사용하는 정보일 뿐
		// ui에 영향을 주는 놈이 아니니 state 값으로 할 필요가 없다. 
		// 왜냐 불필요한 렌더링이 발생하기 떄문이다.
		this.state = {
		  mode:'welcome',
		  selected_content_id:2,
		  subject:{title:'WEB',sub:'world wide web fuck!'},
		  welcome:{title:'Welcom',desc:'Hello, React!!'},
		  contents:[
			{id:1,title:"HTML",desc:"html is for "},
			{id:2,title:"CSS",desc:"CSS is for "},
			{id:3,title:"JavaScript",desc:"JavaScript is for "}
		  ]
    	}
	}
	getReadContent(){
		for(var i=0;i<this.state.contents.length;i++){
		  var data = this.state.contents[i];
		  if(data.id === this.state.selected_content_id){
			return data;
			break;
      		}
    	}
  	}
  	getContent(){
		var _title, _desc, _article, _contents = null;
		if(this.state.mode ==='welcome'){
		  _title = this.state.welcome.title;
		  _desc = this.state.welcome.desc;
		  _article = <ReadContent title={_title} desc={_desc}></ReadContent>
		}
		// rendering 재호출되면 else if 가 실행된다.
		else if(this.state.mode === 'read'){
		  _contents = this.getReadContent();
		  _article = <ReadContent title={_contents.title} desc={_contents.desc}></ReadContent>
		}
		else if(this.state.mode === 'create'){
		  _article = <CreateContent onSubmit={function(_title, _desc){
			this.max_content_id = this.max_content_id+1;
			_contents = Array.from(this.state.contents);
			_contents.push({id:this.max_content_id,title:_title,desc:_desc})
			this.setState({
			  contents:_contents,
			  mode:"read",
			  selected_content_id:this.max_content_id
			});
		  }.bind(this)}></CreateContent>
		}
		else if(this.state.mode === 'update'){
		  _contents = this.getReadContent();
		  _article = <UpdateContent onSubmit={
			function(_id,_title, _desc){
			  var _content = Array.from(this.state.contents);
			  for(var i=0;i<_content.length;i++){
				if(_content[i].id===_id){
				  _content[i] = {id:_id,title:_title,desc:_desc};
				  break;
				}
			  } 
			  this.setState({
				contents:_content,
				mode:"read",
				selected_content_id:_id
			  });
		  }.bind(this)} data={_contents}></UpdateContent>
		}
		else if(this.state.mode === 'chat'){
			_article = <ChatContent></ChatContent>
		}
		return _article;
	}
	render() {
		const { userId } = this.state;
		console.log('App render');
		// render라는 메소드를 오버라이딩해준다.
		return (
		  <div className="App">
			<Header />
			<Subject 
			title={this.state.subject.title} 
			sub={this.state.subject.sub}
			onChangePage={function(){
			  this.setState({
				mode :"welcome"
			  });
			}.bind(this)} // 페이지가 바꼇을 떄 이 함수 호출할 것
			>
			</Subject>

			<TOC onChangePage={function(num){
			  // 이런식으로 props에 함수를 전달할 수 있다.
			  this.setState({
				mode:"read",
				selected_content_id:Number(num)
			  });
			}.bind(this)}
			  data={this.state.contents}></TOC> 
			<Control onChangeMode={function(_mode){
			  if(_mode==="delete"){
				if(window.confirm("really?")){
				  var _contents = Array.from(this.state.contents);
				  for(var i=0;i<_contents.length;i++){
					if(_contents[i].id === this.state.selected_content_id){
					  _contents.splice(i,1); // i부터 1개를 지우겠다.
					  break;
					}
				  }
				  this.setState({
					mode:'welcome',
					contents:_contents
				  })
				}
			  }else{
				this.setState({
				  mode:_mode
				});
			  }

			}.bind(this)}></Control>
			{this.getContent()}

		  </div>
		);
	}
}

export default Workspace;
