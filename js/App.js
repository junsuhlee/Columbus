// @flow
import React, { Component } from 'react'
import {
  Actions,
  Router,
  Scene
} from 'react-native-router-flux'
import {
  Provider,
  connect
} from 'react-redux'
import configureStore from './store/configureStore'
import { AsyncStorage } from 'react-native'

import Login from './components/Login'
import Splash from './components/Splash'
import Mode from './components/Mode'
import Register from './components/Register'
import Home from './components/Home'

import Profile from './components/Profile'
import Manage from './components/Manage'
import Waitlist from './components/Waitlist'
import Analytic from './components/Analytic'
import Megaphone from './components/Megaphone'
import Loyal from './components/Loyal'

const RouterWithRedux = connect()(Router)
const store = configureStore()

export default class App extends Component {

  render() {
    //  sceneStyle={{backgroundColor: '#986B6C'}}
    console.log(this.props);
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root' barButtonIconStyle={{ tintColor: 'white' }}>
            <Scene component={Splash} hideNavBar={true} initial={true} key='splash' title='Splash Page' sceneStyle={{backgroundColor: '#060a11'}}/>
            <Scene component={Mode} hideNavBar={false} key='mode' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}}/>
            <Scene component={Login} hideNavBar key='login' sceneStyle={{backgroundColor: '#060a11'}}/>
            <Scene component={Register} hideNavBar={false} key='register' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}} backButtonTextStyle={{color: 'black'}}/>
            <Scene component={Home} hideNavBar={true} key="main" sceneStyle={{backgroundColor: '#060a11'}} navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}}/>
            <Scene component={Profile} hideNavBar={false} key='profile' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}} />
            <Scene component={Manage} hideNavBar={false} key='manage' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}}/>
            <Scene component={Waitlist} hideNavBar={false} key='waitlist' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}} barButtonIconStyle={{ tintColor: 'black' }}/>
            <Scene component={Analytic} hideNavBar={false} key='analytic' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}} backButtonTextStyle={{color: 'white'}}/>
            <Scene component={Megaphone} hideNavBar={false} key='megaphone' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}} backButtonTextStyle={{color: 'white'}}/>
            <Scene component={Loyal} hideNavBar={false} key='loyal' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#060a11'}} backButtonTextStyle={{color: 'white'}}/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
