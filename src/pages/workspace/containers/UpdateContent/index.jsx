/* eslint-disable */
import React, { Component } from 'react';
// react 라이브러리를 가져와야 
// Component 를 상속받아 사용할 수 있다.

class UpdateContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        console.log('Content render');
        return(
            <article>
                <h2>Create</h2>
                <form action="/update_process" method="post"
                onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        this.state.title,
                        this.state.desc
                    );
                }.bind(this)}> 
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFormHandler}
                        >
                        </input>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description"
                        value={this.state.desc}
                        onChange={this.inputFormHandler}></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}
export default UpdateContent;