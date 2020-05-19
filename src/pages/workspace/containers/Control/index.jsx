/* eslint-disable */
import React, { Component } from 'react';

class Control extends Component { 
    // react 의 Component 클래스를 상속
    render() {
        console.log('subject render');

      // render라는 메소드를 오버라이딩해준다.
      return (
        <ul>
			<li><a href='/create' onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('create');
			}.bind(this)}>Create</a></li>
			<li><a href='/update' onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('update');
			}.bind(this)}>Update</a></li>
			<li><input onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('delete');
			}.bind(this)} type="button" value="Delete"></input></li>
			<li><a href='/chat' onClick={function(e){
				e.preventDefault();
				this.props.onChangeMode('chat');
			}.bind(this)}>Chat room</a></li>
        </ul>
      );
    }
  }

  export default Control;