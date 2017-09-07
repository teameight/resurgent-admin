import React, { Component } from 'react';

class Loading extends Component {
	render() {
		return(
			<div className="spinner-wrap">
        <div className="spinner">
				  <div className="double-bounce1"></div>
				  <div className="double-bounce2"></div>
				</div>
      </div>
		)
	}
}

export default Loading;