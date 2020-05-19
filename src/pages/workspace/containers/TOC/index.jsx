/* eslint-disable */
import React, { Component } from 'react';
// react 라이브러리에서 Component를 로딩

class TOC extends Component { 
    // react 의 Component 클래스를 상속
    shouldComponentUpdate(newProps, newState){
      if(newProps.data===this.props.data){
        return false;
      }
      return true;
      
    }
    render() {
        console.log('TOC render');

        var lists = []
        var data = this.props.data;
        console.log(data);
        var i =0;
        while(i < data.length){
            // eslint-disable-next-line
            lists.push(
                <li key={data[i].id}>
                    <a href={"/content/"+data[i].id}
                    data-id={data[i].id}
                    onClick={function(id,num,e){
                        e.preventDefault();
                        this.props.onChangePage(id);
                    }.bind(this, data[i].id,10)}>
                        {data[i].title}
                    </a>
                </li>);
            i=i+1;
            
        }
        
      // render라는 메소드를 오버라이딩해준다.
      return (
        <nav>
          <ul>
              {lists}
          </ul>
        </nav>
      );
    }
  }

  export default TOC;