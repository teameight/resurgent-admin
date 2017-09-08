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
        const type = details.type;

		// console.log(details);
		return (
            <div>
            {
                (type === 'book-a-session') && (
                    <div className="details-box">
                        <div className="details-row">
                            <h4>Booked a Session</h4>
                        </div>
                        <div className="details-row">
                            <p>{cName}: {aName}</p>
                            <p><strong>{details.cost} tokens</strong></p>
                        </div>
                        <div className="details-row">
                            <p>Provider: <em>{pName}</em></p>
                            <p>contacted {showDate}</p>
                        </div>
                    </div>
                )
            }
            {
                (type === 'rating-review') && (
                    <div className="details-box">
                        <div className="details-row">
                            <h4>Rated or Reviewed</h4>
                        </div>
                        <div className="details-row">
                            <p>{cName}: {aName}</p>
                            <p><strong>{details.rating} star rating</strong></p>
                        </div>
                        <div className="details-row">
                            {/* Show user name here instead*/}
                            <p>Provider: <em>{pName}</em></p>
                            <p>reviewed {showDate}</p>
                        </div>
                        <div>
                            <p>Review Headline: <strong>{details.review.headline}</strong></p>
                            <p>Review Body: {details.review.message}</p>
                        </div>
                    </div>
                )
            }
            </div>
		)
	}
}

export default withRouter(Transaction);