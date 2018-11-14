
export function isNotEmptyString(str) {
    if (typeof str === 'string') {
        return (str && str !== '' && str !== 'null');
    } else {
        return false;
    }
}

