import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

export default function LoaderComponent(props) {
    const width = Dimensions.get('window').width
    return (
        <ContentLoader 
        speed={2}
        height={140}
        width={'99%'}
        viewBox="0 0 400 150"
        backgroundColor="#dfdfdf"
        foregroundColor="#ecebeb"
        {...props}
    >
        <Rect x="7" y="17" rx="0" ry="0" width='100%' height="250" />
    </ContentLoader>
    )
}
