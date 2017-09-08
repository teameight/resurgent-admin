import React from 'react';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';

class Transaction extends React.Component {

	constructor() {
		super();


	}

	render() {
		const {details} = this.props;
		const showDate = dateFormat(details.date, "mmm d, yyyy");

    const pName = this.props.pname;
    const aName = this.props.aname;
    const cName = this.props.cname;

		// console.log(details);
		return (
			<div className="details-box">
        <div className="details-row">
            <p>{cName}: {aName}</p>
            <p><strong>{details.cost} tokens</strong></p>
        </div>
        <div className="details-row">
            <p><em>{pName}</em></p>
            <p>contacted {showDate}</p>
        </div>
      </div>
		)
	}
}

export default withRouter(Transaction);