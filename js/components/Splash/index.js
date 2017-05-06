// @flow
import Splash from './Splash'
import { connect } from 'react-redux'
import * as actions from '../Mode/actions' // mapDispatchToProps
import { getNav, getLogin, getMode } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getLogin(state),
  ...getMode(state),
})

export default connect(mapStateToProps, actions)(Splash)
