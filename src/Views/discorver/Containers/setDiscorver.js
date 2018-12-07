import { connect } from 'react-redux';
import Discorver from '../Components/Discorver';
import actions from '../Action';

const mapStateToProps = (state) => {  
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveMessage(){
            dispatch(actions.saveMessage());
        }
    };  
};


const DiscorverView = connect(mapStateToProps, mapDispatchToProps)(Discorver);



export default DiscorverView;
