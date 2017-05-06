// @flow
import Megaphone from './Megaphone'
import { connect } from 'react-redux'
import * as actions from './actions' // mapDispatchToProps
import { getNav, getLogin, getMegaphone } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getLogin(state),
  ...getMegaphone(state),
})

export default connect(mapStateToProps, actions)(Megaphone)