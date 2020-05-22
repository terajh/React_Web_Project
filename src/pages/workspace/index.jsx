import React from 'react';


import Header from './containers/Header';
import Body from './containers/Body';

import axios from 'axios';

				
class Workspace extends React.Component {
	constructor(props) {
		super(props);
			this.max_content_id=3; 
			// 데이터를 추가할 때 사용하는 정보일 뿐
			// ui에 영향을 주는 놈이 아니니 state 값으로 할 필요가 없다. 
			// 왜냐 불필요한 렌더링이 발생하기 떄문이다.
	}
	
	render() {
		console.log('WorkSpace render');
		// render라는 메소드를 오버라이딩해준다.
		return (
		  <div className="App">
			<Header />
			<Body />
		  </div>
		);
	}
}

export default Workspace;
