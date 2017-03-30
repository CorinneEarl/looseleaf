import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    username: state.username,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, token)=> dispatch({type: "login", username: username, token: token})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
