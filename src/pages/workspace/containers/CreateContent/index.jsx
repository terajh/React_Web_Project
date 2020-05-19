/* eslint-disable */
import React, { Component } from 'react';
// react 라이브러리를 가져와야 
// Component 를 상속받아 사용할 수 있다.

class CreateContent extends Component{
    render(){
        console.log('Content render');
        var data = this.props;
        var title = data.title;
        var desc = data.desc;
        return(
            <article>
                <h2>Create</h2>
                <form action="/create_process" method="post"
                onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmit(
                        e.target.title.value,
                        e.target.desc.value
                    );
                }.bind(this)}> 
                    <p><input type="text" name="title" placeholder="title"></input></p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}
export default CreateContent;