import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import fire from './fire';

import Header from './Header';
import Loading from './Loading';
import './App.css';

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
import Users from './Users';
import User from './User';
import AddUser from './AddUser';
import Login from './Login';



class App extends Component {
  constructor() {
    super();

    // get initial state
    this.state = {
      users: {},
      user: null,
      categories: {},
      areas: {},
      providers: {},
      pages: {},
      transactions: {},
      loggedOut : false,
      isModal: false,
      authed: false,
      loading: true,
      notices: []
    }

    this.updateCategory = this.updateCategory.bind(this);
    this.updateArea = this.updateArea.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.removeByKey = this.removeByKey.bind(this);

    this.logout = this.logout.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.refUser = this.refUser.bind(this);

    this.handleCloseNotice = this.handleCloseNotice.bind(this);
    this.setNotice = this.setNotice.bind(this);
    this.clearNotices = this.clearNotices.bind(this);
    this.getFireData = this.getFireData.bind(this);

  }

  setNotice(notice) {
    let newNotices = [];
    newNotices.push(notice);
    this.setState({
      notices:newNotices
    });
  }

  handleCloseNotice(key) {
    let newNotices = this.state.notices.slice();
    newNotices.splice(key, 1);
    this.setState(
      { notices: newNotices }
    );
  }

  clearNotices() {
    this.setState({
      notices:[]
    });
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
        // console.log(result);
    }, {});
  }

  updateArea(akey, formValue) {
    let areas = {...this.state.areas};
    let areasRef = fire.database().ref('areas');

    if ( formValue.name ) {
      areas[akey].name = formValue.name;
      areasRef.child(akey).child('name').set(formValue.name);
    }

    if ( formValue.slug ) {
      areas[akey].slug = formValue.slug;
      areasRef.child(akey).child('slug').set(formValue.slug);
    }

    if ( formValue.category ) {
      areas[akey].category = formValue.category;
      areasRef.child(akey).child('category').set(formValue.category);
    }

    if ( formValue.desc ) {
      areas[akey].desc = formValue.desc;
      areasRef.child(akey).child('desc').set(formValue.desc);
    }

    if ( formValue.image ) {
      areas[akey].image = formValue.image;
      areasRef.child(akey).child('image').set(formValue.image);
    }

    if ( formValue.order ) {
      areas[akey].order = formValue.order;
      areasRef.child(akey).child('order').set(formValue.order);
    } else {
      areas[akey].order = 0;
      areasRef.child(akey).child('order').set(0);
    }

    this.setState({areas});
  }

  addArea(formValue) {
    if ( formValue.category ) {
      fire.database().ref('areas').push(formValue);
    } else {
      alert('Please choose a Parent Category for this Area');
    }
  }

  updateProvider(pkey, formValue) {
    let providers = {...this.state.providers};
    let providersRef = fire.database().ref('providers');
    let pId = providers[pkey].id;

    if ( formValue.name ) {
      providers[pkey].name = formValue.name;
      providersRef.child(pId).child('name').set(formValue.name);
    }

    if ( formValue.email ) {
      providers[pkey].email = formValue.email;
      providersRef.child(pId).child('email').set(formValue.email);
    }

    if ( formValue.cost ) {
      providers[pkey].cost = formValue.cost;
      providersRef.child(pId).child('cost').set(formValue.cost);
    }

    if ( formValue.desc ) {
      providers[pkey].desc = formValue.desc;
      providersRef.child(pId).child('desc').set(formValue.desc);
    }

    if ( formValue.area ) {
      providers[pkey].area = formValue.area;
      providersRef.child(pId).child('area').set(formValue.area);
    }

    if ( formValue.image ) {
      providers[pkey].image = formValue.image;
      providersRef.child(pId).child('image').set(formValue.image);
    }

    if ( formValue.order ) {
      providers[pkey].order = formValue.order;
      providersRef.child(pId).child('order').set(formValue.order);
    } else {
      providers[pkey].order = 0;
      providersRef.child(pId).child('order').set(0);
    }
    if ( formValue.archive !== null ) {
      if(providers[pkey].isArchived){
        formValue.archive = !formValue.archive;
      }
      providers[pkey].isArchived = formValue.archive;
      providersRef.child(pId).child('isArchived').set(formValue.archive);
      console.log(formValue.archive);
    }

    this.setState({providers});
  }

  addProvider(formValue) {
    if ( formValue.area ) {
      fire.database().ref('providers').push(formValue);
    } else {
      alert('Please choose a Parent Area for this Provider');
    }
  }

  updatePage(key, formValue) {
    let pages = {...this.state.pages};
    let pagesRef = fire.database().ref('pages');

    if ( formValue ) {
      pages[key].content = formValue;
      pagesRef.child(key).child('content').set(formValue);
    }

    console.log('value', formValue);

    this.setState({pages});
  }

  componentWillMount() {

    this.removeListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
        this.refUser();
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
        })
      }
    });

  }

  getFireData(){
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

    const areasRef = fire.database().ref('areas');
    areasRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        areas: items
      });
    });

    let providersObj = {};
    let key = 1;
    let that = this;

    const providersRef = fire.database().ref('providers');
    providersRef.orderByChild('order').once('value').then(function(snapshot) {
      snapshot.forEach(function(data) {
        providersObj[key] = data.val();
        providersObj[key].id = data.key;
        key++;
      });
    }).then(function(){
      that.setState({
        providers:providersObj
      });
    });
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }
  setLogin() {
    this.setState({
      loggedOut: false
    });
  }

  logout() {
    let that=this;
    fire.auth().signOut().then(function() {
      that.setState({
        loggedOut:true,
        authed: false,
        user:null
      });
    }).catch(function(error) {
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  refUser () {
    if(this.state.authed){
      var user = fire.auth().currentUser;

      if (user != null) {

        let userObj = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified,
          uid: user.uid
        };

        this.setState({
          user: userObj
        });

        this.getFireData();

      }
    }
  }


  render() {
    let categories = this.state.categories;
    let noData = !(Object.keys(categories).length !== 0 && Object.keys(this.state.providers).length !== 0);
    let isAuthed = this.state.authed;

    return (
        <div>
          <div className="admin">
            <div className="admin-header">
              <Header showMenu={true} auth={this.props.auth} logout={this.logout} />
            </div>
            {
              !isAuthed && !this.state.loading && (
                <Login loggedOut={this.state.loggedOut} clearNotices={this.clearNotices} notices={this.state.notices} setNotice={this.setNotice} />
              )
            }
            {
              isAuthed && noData && (
                  <Loading />
              )
            }
            {
              isAuthed && !noData && (
                <Grid>
                  <Row className="show-grid">
                    <Route exact path="/" render={(props) => <Categories categories={this.state.categories} {...props} />} />
                    <Route path="/categories/:ckey" render={(props) => <Category categories={this.state.categories} updateCategory={this.updateCategory} {...props} />} />
                    <Route path="/add-category" render={(props) => <AddCategory categories={this.state.categories} addCategory={this.addCategory} {...props} />} />
                    <Route exact path="/areas" render={(props) => <Areas areas={this.state.areas} {...props} />} />
                    <Route path="/areas/:akey" render={(props) => <Area categories={this.state.categories} providers={this.state.providers} areas={this.state.areas} updateArea={this.updateArea} {...props} />} />
                    <Route path="/add-area" render={(props) => <AddArea categories={this.state.categories} addArea={this.addArea} {...props} />} />
                    <Route exact path="/providers" render={(props) => <Providers categories={this.state.categories} areas={this.state.areas} providers={this.state.providers} {...props} />} />
                    <Route path="/providers/:pkey" render={(props) => <Provider categories={this.state.categories} areas={this.state.areas} providers={this.state.providers} transactions={this.state.transactions} updateProvider={this.updateProvider} users={this.state.users} {...props} />} />
                    <Route path="/add-provider" render={(props) => <AddProvider categories={this.state.categories} areas={this.state.areas} addProvider={this.addProvider} {...props} />} />
                    <Route exact path="/users" render={(props) => <Users users={this.state.users} clearNotices={this.clearNotices} notices={this.state.notices} setNotice={this.setNotice} {...props} />} />
                    <Route path="/users/:ukey" render={(props) => <User users={this.state.users} clearNotices={this.clearNotices} notices={this.state.notices} setNotice={this.setNotice} {...props} />} />
                    <Route path="/add-user" render={(props) => <AddUser {...props} />} />
                    <Route exact path="/pages" render={(props) => <Pages pages={this.state.pages} {...props} />} />
                    <Route path="/pages/:key" render={(props) => <Page pages={this.state.pages} updatePage={this.updatePage} {...props} />} />
                  </Row>
                </Grid>
              )
            }
        </div>
      </div>
      )
    }
  }

export default App;
