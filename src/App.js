import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import base from './base';

import Auth from './Auth/Auth';
import Callback from './Callback/Callback';

import Header from './Header';
import Loading from './Loading';
import styles from './App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import Categories from './Categories';
import Category from './Category';
import Areas from './Areas';
import Area from './Area';
import Providers from './Providers';
import Provider from './Provider';
import Pages from './Pages';
import Page from './Page';



class App extends Component {
  constructor() {
    super();

    // get initial state
    this.state = {
      users: {},
      categories: {},
      pages: {}
    }

    this.updateCategory = this.updateCategory.bind(this);
    this.updateArea = this.updateArea.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
    this.updatePage = this.updatePage.bind(this);

  }

  updateCategory(key, formValue) {
    const categories = {...this.state.categories};

    if ( formValue.name ) {
      categories[key].name = formValue.name;
    }

    if ( formValue.slug ) {
      categories[key].slug = formValue.slug;
    }

    this.setState({categories});
  }

  updateArea(ckey, akey, formValue) {
    const categories = {...this.state.categories};

    if ( formValue.name ) {
      categories[ckey]["areas"][akey].name = formValue.name;
    }

    if ( formValue.slug ) {
      categories[ckey]["areas"][akey].slug = formValue.slug;
    }

    if ( formValue.desc ) {
      categories[ckey]["areas"][akey].desc = formValue.desc;
    }

    if ( formValue.image ) {
      categories[ckey]["areas"][akey].image = formValue.image;
    }

    this.setState({categories});
  }

  updateProvider(ckey, akey, pkey, formValue) {
    const categories = {...this.state.categories};

    if ( formValue.name ) {
      categories[ckey]["areas"][akey]["providers"][pkey].name = formValue.name;
    }

    if ( formValue.slug ) {
      categories[ckey]["areas"][akey]["providers"][pkey].tokens = formValue.tokens;
    }

    if ( formValue.desc ) {
      categories[ckey]["areas"][akey]["providers"][pkey].desc = formValue.desc;
    }

    if ( formValue.image ) {
      categories[ckey]["areas"][akey]["providers"][pkey].image = formValue.image;
    }

    this.setState({categories});
  }

  updatePage(key, formValue) {
    const pages = {...this.state.pages};

    if ( formValue.content ) {
      pages[key].content = formValue.content;
    }

    this.setState({pages});
  }

  componentWillMount() {
    
    this.ref = base.syncState(`users`, {
      context: this,
      state: 'users'
    });

    this.ref = base.syncState(`pages`, {
      context: this,
      state: 'pages'
    });

    this.ref = base.syncState(`transactions`, {
      context: this,
      state: 'transactions'
    });

    this.ref = base.syncState(`categories`, {
      context: this,
      state: 'categories'
    });
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  render() {
    const { isAuthenticated } = this.props.auth;
    let categories = this.state.categories;
    let noData = (Object.keys(categories).length === 0 && categories.constructor === Object);

    if(this.props.location.pathname === '/logout'){
      this.logout();
    }

    return (
        <div>
          {
              !isAuthenticated() && (
                  <div className="admin">
                    <div className="admin-header">
                      <Header showMenu={false} auth={this.props.auth} />
                    </div>
                    <button type="button" className="btn sign-in" onClick={this.login.bind(this)}>Sign In</button>
                  </div>
                )
            }
            {
              isAuthenticated() && (
          <div className="admin">
              <div className="admin-header">
                <Header showMenu={true} auth={this.props.auth} />
              </div>
              {
                noData && (
                  <Loading />
                )
              }
              {
                !noData && (
                  <Grid>
                    <Row className="show-grid">
                      <Route exact path="/" render={(props) => <Categories categories={this.state.categories} {...props} />} />
                      <Route path="/categories/:ckey" render={(props) => <Category categories={this.state.categories} updateCategory={this.updateCategory} {...props} />} />
                      <Route exact path="/areas" render={(props) => <Areas categories={this.state.categories} {...props} />} />
                      <Route path="/areas/:akey" render={(props) => <Area categories={this.state.categories} updateArea={this.updateArea} {...props} />} />
                      <Route exact path="/providers" render={(props) => <Providers categories={this.state.categories} {...props} />} />
                      <Route path="/providers/:pkey" render={(props) => <Provider categories={this.state.categories} transactions={this.state.transactions} updateProvider={this.updateProvider} {...props} />} />
                      <Route exact path="/pages" render={(props) => <Pages pages={this.state.pages} {...props} />} />
                      <Route path="/pages/:key" render={(props) => <Page pages={this.state.pages} updatePage={this.updatePage} {...props} />} />
                    </Row>
                  </Grid>
                )
              }
            </div>
            )
          }
      </div>
    )
  }
}

export default App;
