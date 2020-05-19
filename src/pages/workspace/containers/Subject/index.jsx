/* eslint-disable */
import React, { Component } from 'react';

class Subject extends Component { 
    // react 의 Component 클래스를 상속
    render() {
        console.log('subject render');

      // render라는 메소드를 오버라이딩해준다.
      return (
        <header>
          <h1><a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;