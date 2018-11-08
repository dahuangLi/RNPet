import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 8,
        fontSize: 16,
        color: '#222'
    },
    stepWrap: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#4e8cee',
        backgroundColor: '#4e8cee'
    },
    stepText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        backgroundColor: 'transparent'
    },
    stepDisabled: {
        borderColor: '#d9d9d9',
        backgroundColor: 'rgba(239, 239, 239, 0.75)'
    },
    disabledStepTextColor: {
        color: '#ccc'
    },
    highlightStepTextColor: {
        color: '#2DB7F5'
    },
    highlightStepBorderColor: {
        borderColor: '#2DB7F5'
    }
});
export default styles;
