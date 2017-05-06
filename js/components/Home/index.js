// @flow
import Home from './Home'
import { connect } from 'react-redux'
import * as actions from './actions' // mapDispatchToProps
import { getNav, getHome, getLogin, getLoyal } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getHome(state),
  ...getLogin(state),
  ...getLoyal(state),
})

export default connect(mapStateToProps, actions)(Home)
