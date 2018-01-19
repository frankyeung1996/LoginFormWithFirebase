import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAATePN_Hd_rT-Caf-TjCzRzJZr3VjO8LE',
      authDomain: 'auth-a9971.firebaseapp.com',
      databaseURL: 'https://auth-a9971.firebaseio.com',
      projectId: 'auth-a9971',
      storageBucket: 'auth-a9971.appspot.com',
      messagingSenderId: '1056098107683'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
           Log Out
        </Button>
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
