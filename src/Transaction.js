import React from 'react';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';
import fire from './fire';
import { Link } from 'react-router-dom';

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


        let providers = this.props.providers;
        let pkey = this.props.pkey;
        let pId = providers[pkey].id;
        let pReviews = providers[pkey].reviews;
        let currentReview = Object.keys(pReviews).filter((current) => pReviews[current].transaction === tId );

        if ( currentReview.length > 0 ) {
            // Update transaction state
            transactions[tId].approved = true;
            // Update transaction on firebase
            tRef.child(tId).update({'approved': true});
            // Update provider review state
            pReviews[currentReview].approved = true;
            // get ref to providers
            let pRef = fire.database().ref('providers');
            // update provider review on firebase
            pRef.child(pId).child('reviews').child(currentReview[0]).update({'approved': true});
        } else {
            alert('This is not a real transaction and can not be approved');
        }
    }

    disapprove() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');


        let providers = this.props.providers;
        let pkey = this.props.pkey;
        let pId = providers[pkey].id;
        let pReviews = providers[pkey].reviews;
        let currentReview = Object.keys(pReviews).filter((current) => pReviews[current].transaction === tId );
        if ( currentReview > 0 ) {
            transactions[tId].approved = false;
            tRef.child(tId).update({'approved': false});
            // Update state
            pReviews[currentReview].approved = false;
            // get ref to providers
            let pRef = fire.database().ref('providers');
            // update providers on firebase
            pRef.child(pId).child('reviews').child(currentReview[0]).update({'approved': false});
        } else {
            alert('This is not a real transaction and can not be disapproved');
        }
    }

    archive() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');

        let providers = this.props.providers;
        let pkey = this.props.pkey;
        let pId = providers[pkey].id;
        let pReviews = providers[pkey].reviews;
        let currentReview = Object.keys(pReviews).filter((current) => pReviews[current].transaction === tId );

        if ( currentReview.length > 0 ) {
            transactions[tId].isArchived = true;
            tRef.child(tId).update({'isArchived': true});

            // Update state
            pReviews[currentReview].isArchived = true;
            // get ref to providers
            let pRef = fire.database().ref('providers');
            // update providers on firebase
            pRef.child(pId).child('reviews').child(currentReview[0]).update({'isArchived': true});
        } else {
            alert('This is not a real transaction and can not be archived');
        }
    }

    unarchive() {
        let transactions = this.props.transactions;
        let tId = this.props.keyId;
        let tRef = fire.database().ref('transactions');

        let providers = this.props.providers;
        let pkey = this.props.pkey;
        let pId = providers[pkey].id;
        let pReviews = providers[pkey].reviews;
        let currentReview = Object.keys(pReviews).filter((current) => pReviews[current].transaction === tId );

        if ( currentReview.length > 0 ) {
            transactions[tId].isArchived = false;
            tRef.child(tId).update({'isArchived': false});

            // Update state
            pReviews[currentReview].isArchived = false;
            // get ref to providers
            let pRef = fire.database().ref('providers');
            // update providers on firebase
            pRef.child(pId).child('reviews').child(currentReview[0]).update({'isArchived': false});
        } else {
            alert('This is not a real transaction and can not be unarchived');
        }
    }

	render() {
		const {details} = this.props;
		const showDate = dateFormat(details.date, "mmm d, yyyy");

        const pName = this.props.pname;
        const aName = this.props.aname;
        const cName = this.props.cname;
        const uid = details.uid;
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

		return (
            <div>
            {
                (type === 'book-a-session') && (
                    <div className={wrapperClass}>
                        <div className="details-row">
                            <h4>Booked a Session</h4>
                        </div>
                        <div className="details-row">
                            <p>User: <Link to={{pathname: '/users/' + uid, state: { ukey: uid } }}>{this.props.users[uid].name + ' ' + this.props.users[uid].lastname}</Link></p>
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
                            <p>User: <Link to={{pathname: '/users/' + uid, state: { ukey: uid } }}>{this.props.users[uid].name}</Link></p>
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
            {
                (type === 'interview-stream') && (
                    <div className={wrapperClass}>
                        <div className="details-row">
                            <h4>Signed up for Interview Stream</h4>
                        </div>
                        <div className="details-row">
                            <p>User: <Link to={{pathname: '/users/' + uid, state: { ukey: uid } }}>{this.props.users[uid].name}</Link></p>
                        </div>
                        <div className="details-row">
                            <p>{cName}: {aName}</p>
                            <p><strong>{details.cost} tokens</strong></p>
                        </div>
                        <div className="details-row">
                            <p>Provider: <em>{pName}</em></p>
                            <p>signed up {showDate}</p>
                        </div>
                        <div className="details-buttons">
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