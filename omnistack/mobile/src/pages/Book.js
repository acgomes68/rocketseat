import React from 'react';
import { SafeAreaView, Text } from 'react-native'

export default function Book({ navigation }) {
    const id = navigation.getParam('id');

    return (
        <SafeAreaView>
            <Text>id: {id}</Text>
        </SafeAreaView>
    )
}