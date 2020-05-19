/* eslint-disable */
import React, { Component } from 'react';

class ChatContent extends Component { 
    // react 의 Component 클래스를 상속
    render() {
        console.log('subject render');

      // render라는 메소드를 오버라이딩해준다.
      return (
		<div id="container">
			<div id="contentCover">
				<div id="roomWrap">
					<div id="roomList">
						<div id="roomHeader">
							<div id="roomSelect">
								<div class="roomEl active" data-id="1">ROOM[1]</div>
								<div class="roomEl" data-id="2">ROOM[2]</div>
								<div class="roomEl" data-id="3">ROOM[3]</div>
								<div class="roomEl" data-id="4">ROOM[4]</div>
							</div>
						</div>
					</div>
				</div>

				<div id="chatWrap">
					<div id="chatHeader">Everyone</div>
					<div id="chatLog">
						<div class="anotherMsg"></div>
						<div class="myMsg"></div>
					</div>
					
					<form id="chatForm">
						<input autocomplete="off" size="30" id="message" placeholder=" 메시지를 입력하세요"></input>
						<input type="hidden" id="nickname" value='temp'></input>
						<button id="send">send</button>
					</form>
				</div>
				<div id="memberWrap">
					<div id="memberList">
						<div id="memberHeader">사람</div>
						<div id="memberSelect"></div>
					</div>
				</div>
				
			</div>
		</div>
      );
    }
  }

  export default ChatContent;