// @flow weak
import { combineReducers } from 'redux'
import nav, * as fromNav from './navReducer'
import mode, * as fromMode from './modeReducer'
import login, * as fromLogin from './loginReducer'
import register, * as fromRegister from './registerReducer'
import home, * as fromHome from './homeReducer'
import profile, * as fromProfile from './profileReducer'

import analytic, * as fromAnalytic from './analyticReducer'
import megaphone, * as fromMegaphone from './megaphoneReducer'
import loyal, * as fromLoyal from './loyalReducer'

export default combineReducers({
  nav,
  mode,
  login,
  register,
  home,
  profile,

  analytic,
  megaphone,
  loyal,
})

//Like getNav:nav
export const getNav = (state) => fromNav.getNav(state.nav)

//Like getMode:mode
export const getMode = (state) => fromMode.getMode(state.mode)

//Like getLogin:login
export const getLogin = (state) => fromLogin.getLogin(state.login)

//Like getRegister:register
export const getRegister = (state) => fromRegister.getRegister(state.register)

//Like getHome:home
export const getHome = (state) => fromHome.getHome(state.home)

//Like getProfile:profile
export const getProfile = (state) => fromProfile.getProfile(state.profile)


//Like getAnalytic:analytic
export const getAnalytic = (state) => fromAnalytic.getAnalytic(state.analytic)

//Like getMegaphone:megaphone
export const getMegaphone = (state) => fromMegaphone.getMegaphone(state.megaphone)

//Like getLoyal:loyal
export const getLoyal = (state) => fromLoyal.getLoyal(state.loyal)