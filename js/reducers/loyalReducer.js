// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.UPDATE_LOYAL_PHONENUMBER:
       return {
        ...state,
        loyalPhoneNumber: action.loyalPhoneNumber
      }

    case actionTypes.UPDATE_LOYALREWARD:
       return {
        ...state,
        loyalReward: action.loyalReward
      }

    case actionTypes.UPDATE_RECENTBIGWINNERS:
       return {
        ...state,
        recentBigWinners: action.recentBigWinners
      }

    case actionTypes.UPDATE_RECENTREWARDSRECEIVERS:
       return {
        ...state,
        recentRewardsReceivers: action.recentRewardsReceivers
      }

    case actionTypes.UPDATE_LOYAL_NEWREWARD:
       return {
        ...state,
        newReward: action.newReward
      }

    case actionTypes.UPDATE_LOYAL_POINTREQUIRED:
       return {
        ...state,
        pointRequired: action.pointRequired
      }

    case actionTypes.UPDATE_LOYAL_NEWBIGWINNING:
       return {
        ...state,
        newBigWinning: action.newBigWinning
      }

    case actionTypes.UPDATE_LOYAL_ODDS:
       return {
        ...state,
        odds: action.odds
      }

    case actionTypes.UPDATE_LOYAL_EXTRAPOINT:
       return {
        ...state,
        extraPoint: action.extraPoint
      }

    case actionTypes.UPDATE_LOYAL_SEARCHRESULT:
       return {
        ...state,
        customerRewardInfo: action.customerRewardInfo
      }

    case actionTypes.UPDATE_LOYAL_MAINMESSAGE:
       return {
        ...state,
        mainMessage: action.mainMessage
      }

    default:
      return state
  }
}

export const getLoyal = (state) => ({
  customerRewardInfo: state.customerRewardInfo,
  extraPoint: state.extraPoint,
  recentBigWinners: state.recentBigWinners,
  recentRewardsReceivers: state.recentRewardsReceivers,
	pointRequired: state.pointRequired,
	newReward: state.newReward,
  newBigWinning: state.newBigWinning,
  odds: state.odds,
  mainMessage: state.mainMessage,
	loyalReward: state.loyalReward,
	loyalPhoneNumber: state.loyalPhoneNumber,
})