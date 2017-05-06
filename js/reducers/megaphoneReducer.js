// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.UPDATE_MEGAPHONE_CONTENT:
       return {
        ...state,
        megaphoneContent: action.megaphoneContent
      }

    case actionTypes.UPDATE_MEGAPHONE_TARGETNUMBER:
       return {
        ...state,
        megaphoneTargetNumber: action.megaphoneTargetNumber
      }

    case actionTypes.ON_MEGAPHONE:
       return {
        ...state,
        onMegaphone: action.onMegaphone
      }

    default:
      return state
  }
}

export const getMegaphone = (state) => ({
  onMegaphone : state.onMegaphone,
  megaphoneContent : state.megaphoneContent,
  megaphoneTargetNumber : state.megaphoneTargetNumber,
})