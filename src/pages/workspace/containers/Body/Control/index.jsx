/* eslint-disable */
import React, { Component } from 'react';
import {  Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.scss';

class Control extends Component { 
    // react 의 Component 클래스를 상속
    render() {
        console.log('subject render');

      // render라는 메소드를 오버라이딩해준다.
      return (
		<Nav className={style.Header}>
			<NavItem>
				<NavLink href='/' onClick={function(e){
					e.preventDefault();
					this.props.onChangeMode('control');
				}.bind(this)} className="navbar-brand mb-0 h1" style={{color:'black'}}>Home</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/chat' onClick={function(e){
					e.preventDefault();
					this.props.onChangeMode('chat');
					console.log('chat room click');
				}.bind(this)} className="navbar-brand mb-0 h1" style={{color:'black'}}>Chat Room</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/fm' onClick={function(e){
					e.preventDefault();
					this.props.onChangeMode('fm');
					console.log('fm click');
				}.bind(this)} className="navbar-brand mb-0 h1" style={{color:'black'}}>File Manager</NavLink>
			</NavItem>
		</Nav>
		
      );
    }
  }

  export default Control;