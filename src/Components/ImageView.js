/**
 * 查看大图
 */
import { ActivityIndicator, Modal, View } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import React from 'react';

const ImageView = props => {
    return (
        <Modal
            visible={props.visible}
            transparent={true}
            onRequestClose={props.onClose}
        >
            <ImageViewer
                {...props}
                enableSwipeDown
                saveToLocalByLongPress={false}
                index={props.initIndex}
                loadingRender={() => {
                    return (
                        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator />
                        </View>
                    );
                }}
                onSwipeDown={props.onClose}
                onClick={props.onClose}
                imageUrls={props.images}
            />
        </Modal>
    );
};

export default ImageView;
