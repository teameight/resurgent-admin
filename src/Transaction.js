import React from 'react';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';
import fire from './fire';

class Transaction extends React.Component {

    constructor() {
        super();

        this.approve = this.approve.bind(this);
        this.disapprove = this.disapprove.bind(this);
        this.archive = this.archive.bind(this);
        this.unarchive = this.unarchive.bind(this);
    }


    approve() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');

        transactions[tId].approved = true;
        tRef.child(tId).update({'approved': true});
    }

    disapprove() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');

        transactions[tId].approved = false;
        tRef.child(tId).update({'approved': false});
    }

    archive() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');

        transactions[tId].isArchived = true;
        tRef.child(tId).update({'isArchived': true});
    }

    unarchive() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');

        transactions[tId].isArchived = false;
        tRef.child(tId).update({'isArchived': false});
    }

	render() {
		const {details} = this.props;
		const showDate = dateFormat(details.date, "mmm d, yyyy");

        const pName = this.props.pname;
        const aName = this.props.aname;
        const cName = this.props.cname;
        const type = details.type;
        const approved = details.approved;
        const isArchived = details.isArchived;

        let wrapperClass = "details-box";

        if ( !approved && type === 'rating-review' ) {
            wrapperClass = wrapperClass + " needs-review";
        }

        if ( isArchived ) {
            wrapperClass = wrapperClass + " archived";
        }

		// console.log(details);
		return (
            <div>
            {
                (type === 'book-a-session') && (
                    <div className={wrapperClass}>
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
                        <div className="details-buttons">
                            <button className="btn btn-danger btn-archive" onClick={this.archive}>Archive</button>
                            <button className="btn btn-secondary btn-unarchive" onClick={this.unarchive}>Unarchive</button>
                        </div>

                    </div>
                )
            }
            {
                (type === 'rating-review') && (
                    <div className={wrapperClass}>
                        <div className="details-row">
                            <h4>Rated or Reviewed</h4>
                        </div>
                        <div className="details-row">
                            <p>{cName}: {aName}</p>
                            <p><strong>{details.rating ? details.rating : 'N/A'} star rating</strong></p>
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
                        <div className="details-buttons">
                            <button className="btn btn-primary" onClick={this.approve}>Approve</button>
                            <button className="btn btn-warning" onClick={this.disapprove}>Disapprove</button>
                            <button className="btn btn-danger btn-archive" onClick={this.archive}>Archive</button>
                            <button className="btn btn-secondary btn-unarchive" onClick={this.unarchive}>Unarchive</button>
                        </div>

                    </div>
                )
            }
            </div>
		)
	}
}

export default withRouter(Transaction);