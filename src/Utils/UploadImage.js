import { NativeModules } from 'react-native';
import { postJson } from './Network';

const { LCBImageHandleModule } = NativeModules;

export default async ({
    bucketType,
    type = '',
    typeName = '',
    images = []
}) => {
    const imgsWithoutToken = images.filter(img => !img.upLoadToken);
    let getTokenRes = {};
    // 只有不带uploadToken的去请求接口获取
    if (imgsWithoutToken.length) {
        const { result, error } = await postJson('gateway/img_upload/getUploadToken', {
            uploads: imgsWithoutToken.map(({id}) => {
                return {
                    identity: type + '_' + id,
                    title: typeName + '_' + id
                };
            }),
            bucketType
        });
        if (!result || error) {
            return Promise.reject(error);
        }
        getTokenRes = result;
    }
    try {
        const { successFiles, failedFiles } = await LCBImageHandleModule.uploadImage(
            images.map(item => {
                return {
                    ...item,
                    ...getTokenRes[type + '_' + item.id]
                };
            })
        );
        return {
            successFiles: successFiles.map(file => {
                const { response: { previewUrl } } = file;
                const matchRes = previewUrl.match(/^(https?:\/\/[\w.]+\/)/);
                const host = matchRes ? matchRes[1] : '';
                return {
                    ...file,
                    url: host + file.key
                };
            }),
            failedFiles
        };
    } catch (error) {
        return Promise.reject(error);
    }
};
