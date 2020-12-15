import React from 'react';
import { userLogoutAttempt } from '../redux/Auth/auth.action';
import { connect } from 'react-redux';


 function LogOut(props) {

  const logout = () => {
    console.log(props);
    props.userLogoutAttempt()
  }

  return (
    <div>
        <button onClick={() => logout()}>Déconnecter</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogoutAttempt: () => dispatch(userLogoutAttempt())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);