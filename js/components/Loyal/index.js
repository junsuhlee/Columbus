// @flow
import Loyal from './Loyal'
import { connect } from 'react-redux'
import * as actions from './actions' 
import { getNav, getLogin, getLoyal } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getLogin(state),
  ...getLoyal(state),
})

export default connect(mapStateToProps, actions)(Loyal)
