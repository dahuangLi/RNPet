import { connect } from 'react-redux';
import Discorver from '../Components/Discorver';
// import actions from '../Action';
import {NavigationService} from '../../../Components';

const mapStateToProps = (state) => {  
    const {latitude, longitude} = state.Discorver;
    console.log(state);
    return {
        latitude, longitude
    };
};
const mapDispatchToProps = () => {
    return {
        gotoRelease(){
            NavigationService.navigate('Release');
        }
    };  
};


const DiscorverView = connect(mapStateToProps, mapDispatchToProps)(Discorver);



export default DiscorverView;
