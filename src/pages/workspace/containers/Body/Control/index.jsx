/* eslint-disable */
import React, { Component } from 'react';

class Control extends Component { 
    // react 의 Component 클래스를 상속
    render() {
        console.log('subject render');

      // render라는 메소드를 오버라이딩해준다.
      return (
        <ul>
			<li>
				<a href='/' onClick={function(e){
					e.preventDefault();
					this.props.onChangeMode('control');
				}.bind(this)}>Main Page</a>
			</li>
			<li>
				<a href='/chat' onClick={function(e){
					e.preventDefault();
					this.props.onChangeMode('chat');
					console.log('chat room click');
				}.bind(this)}>Chat room</a>
			</li>
			<li>
				<a href='/fm' onClick={function(e){
					e.preventDefault();
					this.props.onChangeMode('fm');
					console.log('fm click');
				}.bind(this)}>File manager</a>
			</li>
        </ul>
      );
    }
  }

  export default Control;