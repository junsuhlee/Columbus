// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.UPDATE_CHECKIN_PHONENUMBER:
      return {
        ...state,
        checkinPhoneNumber: action.checkinPhoneNumber
      }

    case actionTypes.UPDATE_WAITLIST_PHONENUMBER:
      return {
        ...state,
        waitlistPhoneNumber: action.waitlistPhoneNumber
      }

    case actionTypes.UPDATE_HOME_CUSTOMERNAME:
      return {
        ...state,
        homeCustomerName: action.homeCustomerName
      }

    case actionTypes.UPDATE_HOME_SEATS:
      return {
        ...state,
        homeSeats: action.homeSeats
      }

    case actionTypes.UPDATE_SUBSCRIPTIONSWITCH:
       return {
        ...state,
        subscription: action.subscription
      }

    case actionTypes.ON_RESERVATION:
       return {
        ...state,
        onReservation: action.onReservation
      }

    case actionTypes.UPDATE_SIDE_BANNER:
       return {
        ...state,
        sideBanner: action.sideBanner
      }

    default:
      return state
  }
}

export const getHome = (state) => ({
  sideBanner: state.sideBanner,
  subscription: state.subscription,
  onReservation: state.onReservation,
  waitlistPhoneNumber: state.waitlistPhoneNumber,
  checkinPhoneNumber: state.checkinPhoneNumber,
  homeSeats: state.homeSeats,
  homeCustomerName: state.homeCustomerName,
})
