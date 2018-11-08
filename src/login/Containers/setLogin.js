import { connect } from 'react-redux';
import Login from '../Components/login';
import actions from '../Action';

const mapStateToProps = (state) => {   
    console.log(state)
    const {loginStatus} = state.Login;
    return {
        loginStatus
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveMessage(text){
            dispatch(actions.saveMessage());
        }
    };  
};


const LoginView = connect(mapStateToProps, mapDispatchToProps)(Login);



export default LoginView;
