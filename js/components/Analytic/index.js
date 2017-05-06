// @flow
import Analytic from './Analytic'
import { connect } from 'react-redux'
import * as actions from './actions' 
import { getNav, getLogin, getAnalytic } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getLogin(state),
  ...getAnalytic(state),
})

export default connect(mapStateToProps, actions)(Analytic)
