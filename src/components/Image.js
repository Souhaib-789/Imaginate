import { StyleSheet, Text, View, Image as RNIMAGE } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const Image = (props) => {
    return props?.style?.tintColor || props.tintColor ? (
        <RNIMAGE
            source={props?.source?.uri ? { uri: props?.source?.uri } : props?.source}
            style={[props?.style, { tintColor: props.tintColor ? props.tintColor : props?.style?.tintColor ? props?.style?.tintColor : undefined }]}
            resizeMode={props?.resizeMode == 'stretch' ? 'stretch' : props?.resizeMode == 'cover' ? 'cover' : props?.resizeMode == 'contain' ? 'contain' : 'stretch'}
        />)
        :
        (<FastImage
            tintColor={props.tintColor ? props.tintColor : props?.style?.tintColor ? props?.style?.tintColor : undefined}
            source={props?.source?.uri ? { uri: props?.source?.uri, priority: FastImage.priority.high } : props?.source}
            style={props?.style}
            resizeMode={props?.resizeMode == 'stretch' ? FastImage.resizeMode.stretch : props?.resizeMode == 'cover' ? FastImage.resizeMode.cover : FastImage.resizeMode.contain}
        />
        )
}

export default Image

const styles = StyleSheet.create({})