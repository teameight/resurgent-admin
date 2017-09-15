import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import fire from './fire';

import Auth from './Auth/Auth';
import Callback from './Callback/Callback';

import Header from './Header';
import Loading from './Loading';
import styles from './App.css';

import { Grid, Row } from 'react-bootstrap';

import Categories from './Categories';
import Category from './Category';
import AddCategory from './AddCategory';
import Areas from './Areas';
import Area from './Area';
import AddArea from './AddArea';
import Providers from './Providers';
import Provider from './Provider';
import AddProvider from './AddProvider';
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
    this.removeByKey = this.removeByKey.bind(this);

  }

  updateCategory(key, formValue) {
    let categories = {...this.state.categories};
    let catsRef = fire.database().ref('categories');

    if ( formValue.name ) {
      categories[key].name = formValue.name;
      catsRef.child(key).child('name').set(formValue.name);
    }

    if ( formValue.slug ) {
      categories[key].slug = formValue.slug;
      catsRef.child(key).child('slug').set(formValue.slug);
    }

    if ( formValue.order ) {
      categories[key].order = formValue.order;
      catsRef.child(key).child('order').set(formValue.order);
    } else {
      categories[key].order = 0;
      catsRef.child(key).child('order').set(0);
    }

    this.setState({categories});
  }

  addCategory(formValue) {
    fire.database().ref('categories').push(formValue);
  }

  removeByKey(myObj, deleteKey) {
    console.log('fired');
    return Object.keys(myObj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
        console.log(result);
    }, {});
  }

  updateArea(ckey, akey, formValue) {
    let categories = {...this.state.categories};
    let catsRef = fire.database().ref('categories');
    const oldCat = ckey;
    const newCat = formValue.category;

    if ( oldCat !== newCat ) {
      let tempArea = categories[oldCat]["areas"][akey];
      // add area to new cat in state
      categories[newCat]["areas"][akey] = tempArea;
      // add area to new cat in firebase
      catsRef.child(newCat).child("areas").child(akey).set(tempArea);
      // remove area from old cat in state
      this.removeByKey(categories[oldCat]["areas"], akey);
      // remove area from old cat in firebase
      catsRef.child(oldCat).child("areas").child(akey).remove();
      // set ckey to new cat for the rest of the updates
      ckey = newCat;
    }

    console.log(ckey);

    if ( formValue.name ) {
      categories[ckey]["areas"][akey].name = formValue.name;
      catsRef.child(ckey).child("areas").child(akey).child('name').set(formValue.name);
    }

    if ( formValue.slug ) {
      categories[ckey]["areas"][akey].slug = formValue.slug;
      catsRef.child(ckey).child("areas").child(akey).child('slug').set(formValue.slug);
    }

    if ( formValue.desc ) {
      categories[ckey]["areas"][akey].desc = formValue.desc;
      catsRef.child(ckey).child("areas").child(akey).child('desc').set(formValue.desc);
    }

    if ( formValue.image ) {
      categories[ckey]["areas"][akey].image = formValue.image;
      catsRef.child(ckey).child("areas").child(akey).child('image').set(formValue.image);
    }

    if ( formValue.order ) {
      categories[ckey]["areas"][akey].order = formValue.order;
      catsRef.child(ckey).child("areas").child(akey).child('order').set(formValue.order);
    } else {
      categories[ckey]["areas"][akey].order = 0;
      catsRef.child(ckey).child("areas").child(akey).child('order').set(0);
    }

    this.setState({categories});
  }

  addArea(formValue) {
    if ( formValue.category ) {
      fire.database().ref('categories').child(formValue.category).child('areas').push(formValue);
    } else {
      alert('Please choose a Parent Category for this Area');
    }
  }

  updateProvider(ckey, akey, pkey, formValue) {
    let categories = {...this.state.categories};
    let catsRef = fire.database().ref('categories');
    const oldCat = ckey;
    const newCat = formValue.category;
    const oldArea = akey;
    const newArea = formValue.area;

    if ( oldArea !== newArea ) {
      let tempProvider = categories[oldCat]["areas"][oldArea]["providers"][pkey];
      // add area to new cat in state
      categories[newCat]["areas"][newArea]["providers"][pkey] = tempProvider;
      // add area to new cat in firebase
      catsRef.child(newCat).child("areas").child(newArea).child("providers").child(pkey).set(tempProvider);
      // remove area from old cat in state
      this.removeByKey(categories[oldCat]["areas"][oldArea]["providers"], pkey);
      // remove area from old cat in firebase
      catsRef.child(oldCat).child("areas").child(oldArea).child("providers").child(pkey).remove();
      // set ckey to new cat for the rest of the updates
      ckey = newCat;
      akey = newArea;
    }

    if ( formValue.name ) {
      categories[ckey]["areas"][akey]["providers"][pkey].name = formValue.name;
      catsRef.child(ckey).child("areas").child(akey).child('providers').child(pkey).child('name').set(formValue.name);
    }

    if ( formValue.tokens ) {
      categories[ckey]["areas"][akey]["providers"][pkey].tokens = formValue.tokens;
      catsRef.child(ckey).child("areas").child(akey).child('providers').child(pkey).child('tokens').set(formValue.tokens);
    }

    if ( formValue.desc ) {
      categories[ckey]["areas"][akey]["providers"][pkey].desc = formValue.desc;
      catsRef.child(ckey).child("areas").child(akey).child('providers').child(pkey).child('desc').set(formValue.desc);
    }

    if ( formValue.image ) {
      categories[ckey]["areas"][akey]["providers"][pkey].image = formValue.image;
      catsRef.child(ckey).child("areas").child(akey).child('providers').child(pkey).child('image').set(formValue.image);
    }

    if ( formValue.order ) {
      categories[ckey]["areas"][akey]["providers"][pkey].order = formValue.order;
      catsRef.child(ckey).child("areas").child(akey).child('providers').child(pkey).child('order').set(formValue.order);
    } else {
      categories[ckey]["areas"][akey]["providers"][pkey].order = 0;
      catsRef.child(ckey).child("areas").child(akey).child('providers').child(pkey).child('order').set(0);
    }

    this.setState({categories});
  }

  addProvider(formValue) {
    if ( formValue.ckey && formValue.area ) {
      fire.database().ref('categories').child(formValue.ckey).child('areas').child(formValue.area).child('providers').push(formValue);
    } else {
      alert('Please choose a Parent Area for this Provider');
    }
  }

  updatePage(key, formValue) {
    const pages = {...this.state.pages};

    if ( formValue.content ) {
      pages[key].content = formValue.content;
    }

    this.setState({pages});
  }

  componentWillMount() {

    const usersRef = fire.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        users: items
      });
    });

    const pagesRef = fire.database().ref('pages');
    pagesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        pages: items
      });
    });

    const transRef = fire.database().ref('transactions');
    transRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        transactions: items
      });
    });

    const catRef = fire.database().ref('categories');
    catRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        categories: items
      });
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
                    <button type="button" className="btn btn-primary sign-in" onClick={this.login.bind(this)}>Sign In</button>
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
                      <Route path="/add-category" render={(props) => <AddCategory categories={this.state.categories} addCategory={this.addCategory} {...props} />} />
                      <Route exact path="/areas" render={(props) => <Areas categories={this.state.categories} {...props} />} />
                      <Route path="/areas/:akey" render={(props) => <Area categories={this.state.categories} updateArea={this.updateArea} {...props} />} />
                      <Route path="/add-area" render={(props) => <AddArea categories={this.state.categories} addArea={this.addArea} {...props} />} />
                      <Route exact path="/providers" render={(props) => <Providers categories={this.state.categories} {...props} />} />
                      <Route path="/providers/:pkey" render={(props) => <Provider categories={this.state.categories} transactions={this.state.transactions} updateProvider={this.updateProvider} users={this.state.users} {...props} />} />
                      <Route path="/add-provider" render={(props) => <AddProvider categories={this.state.categories} addProvider={this.addProvider} {...props} />} />
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
