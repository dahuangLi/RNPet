import { connect } from 'react-redux';
import Login from '../Components/login';
import actions from '../Action';

const mapStateToProps = (state) => {   
    console.log(state);
    const {loginStatus, checkCode} = state.Login;
    return {
        loginStatus, checkCode
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveMessage(){
            dispatch(actions.saveMessage());
        },
        getCode(){
            dispatch(actions.getCode());
        }
    };  
};


const LoginView = connect(mapStateToProps, mapDispatchToProps)(Login);



export default LoginView;
