import React, { Component } from 'react';
// react 라이브러리를 가져와야 
// Component 를 상속받아 사용할 수 있다.

class ReadContent extends Component{
    render(){
        console.log('Content render');
        var data = this.props;
        var title = data.title;
        var desc = data.desc;
        return(
            <article>
                <h2>{title}</h2>
                {desc}
            </article>
        );
    }
}
export default ReadContent;