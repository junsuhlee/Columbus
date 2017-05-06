// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.UPDATE_ANALYTIC_CHART:
       return {
        ...state,
        chartData: action.chartData
      }

    default:
      return state
  }
}

export const getAnalytic = (state) => ({
  chartData : state.chartData
})