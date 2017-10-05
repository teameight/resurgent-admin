import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Providers extends Component {
	constructor() {
    super();

    // get initial state
    this.state = {
      isArchive: false
    }

    this.toggleArchive = this.toggleArchive.bind(this);

  }

  toggleArchive(e) {
  	e.preventDefault();
    this.setState({
    	isArchive: !this.state.isArchive
    })
  }

	render() {

		let titlePre = "";
		if(this.state.isArchive){
			titlePre = "Archived ";
		}


		return (
			<div className="admin-screen">
				<h2>{titlePre}Providers</h2>
				{ !this.state.isArchive && (
						<div>
							<Link className="btn btn-primary" to={{pathname: '/add-provider'}}>Add New Provider</Link>
							<p>&nbsp;</p>
							<p><a onClick={ (e) => this.toggleArchive(e) }>View Archived Providers</a></p>
							<p>Or select a provider to edit.</p>
							<ul>
							{
								Object
									.keys(this.props.providers)
									.filter(pkey => !this.props.providers[pkey].isArchived)
									.map( pkey =>
										<li key={pkey}><Link key={pkey} to={{pathname: '/providers/' + pkey, state: { ckey: this.props.providers[pkey].ckey, akey: this.props.providers[pkey].area, pkey: pkey } }}>{this.props.providers[pkey].name}</Link></li>
									)
							}
							</ul>
						</div>
					)
				}
				{ this.state.isArchive && (
						<div>
							<p><a onClick={ (e) => this.toggleArchive(e) }>Back to Active Providers</a></p>
							<p>Or select a provider to edit.</p>
							<ul>
							{
								Object
									.keys(this.props.providers)
									.filter(pkey => this.props.providers[pkey].isArchived)
									.map( pkey =>
										<li key={pkey}><Link key={pkey} to={{pathname: '/providers/' + pkey, state: { ckey: this.props.providers[pkey].ckey, akey: this.props.providers[pkey].area, pkey: pkey } }}>{this.props.providers[pkey].name}</Link></li>
									)
							}
							</ul>
						</div>
					)
				}
			</div>
		)
	}
}

export default Providers;