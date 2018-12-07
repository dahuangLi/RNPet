import { connect } from 'react-redux';
import Discorver from '../Components/Discorver';
import actions from '../Action';

const mapStateToProps = (state) => {  
    const {latitude, longitude} = state.Discorver;
    console.log(state);
    return {
        latitude, longitude
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        locationInit(){
            dispatch(actions.locationInit());
        }
    };  
};


const DiscorverView = connect(mapStateToProps, mapDispatchToProps)(Discorver);



export default DiscorverView;
