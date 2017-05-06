// @flow
import Register from './Register'
import { connect } from 'react-redux'
import * as actions from './actions' // mapDispatchToProps
import { getNav, getRegister, getMode } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getRegister(state),
  ...getMode(state),
})

export default connect(mapStateToProps, actions)(Register)
