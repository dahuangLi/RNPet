import {NativeModules, Platform, findNodeHandle} from 'react-native';

const {LCBSnapShotModule} = NativeModules;

type Options = {
    width? : number,
    height? : number,
    format: 'png' | 'jpg' | 'webm',
    quality: number,
    result: 'tmpfile' | 'base64' | 'data-uri',
    snapshotContentContainer: boolean
};

if (!LCBSnapShotModule) {
    console.warn(
        'NativeModules.LCBSnapShotModule is undefined. Make sure the library is linked on the native side.'
    );
}

const acceptedFormats = ['png', 'jpg'].concat(
    Platform.OS === 'android' ? ['webm'] : []
);

const acceptedResults = ['tmpfile', 'base64', 'data-uri'];

const defaultOptions = {
    format: 'png',
    quality: 1,
    result: 'tmpfile',
    snapshotContentContainer: false
};

// validate and coerce options
function validateOptions(options: ?Object): { options: Options, errors: Array<string> } {
    options = {
        ...defaultOptions,
        ...options
    };
    const errors = [];
    if (
        'width' in options &&
        (typeof options.width !== 'number' || options.width <= 0)
    ) {
        errors.push('option width should be a positive number');
        delete options.width;
    }
    if (
        'height' in options &&
        (typeof options.height !== 'number' || options.height <= 0)
    ) {
        errors.push('option height should be a positive number');
        delete options.height;
    }
    if (
        typeof options.quality !== 'number' ||
        options.quality < 0 ||
        options.quality > 1
    ) {
        errors.push('option quality should be a number between 0.0 and 1.0');
        options.quality = defaultOptions.quality;
    }
    if (typeof options.snapshotContentContainer !== 'boolean') {
        errors.push('option snapshotContentContainer should be a boolean');
    }
    if (acceptedFormats.indexOf(options.format) === -1) {
        options.format = defaultOptions.format;
        errors.push(
            'option format is not in valid formats: ' + acceptedFormats.join(' | ')
        );
    }
    if (acceptedResults.indexOf(options.result) === -1) {
        options.result = defaultOptions.result;
        errors.push(
            'option result is not in valid formats: ' + acceptedResults.join(' | ')
        );
    }
    return {options, errors};
}

export default function (view: number | ReactElement<*>, optionsObject? : Object): Promise<string>{
    if (typeof view !== 'number'){
        const node = findNodeHandle(view);
        if (!node) return Promise.reject(new Error('findNodeHandle failed to resolve view=' + String(view)));
        view = node;
    }
    const {options, errors} = validateOptions(optionsObject);
    if (__DEV__ && errors.length > 0) {
        console.warn(
            'react-native-view-shot: bad options:\n' +
            errors.map(e => `- ${e}`).join('\n')
        );
    }
    return LCBSnapShotModule.captureRef(view, options);
}



