import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs ? storagedTechs.split(',').map(tech => tech.trim()) : null;
            setTechs(techsArray);
        })
    }, []);

    async function handleLogout() {
        await AsyncStorage.setItem('user', '');
        await AsyncStorage.setItem('techs', '');

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView>
            <Image style={styles.logo} source={logo} />
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
            <ScrollView>
                {techs ? techs.map(tech => <SpotList key={tech} tech={tech} />) : <Text>Nada</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10,
    },
    button: {
        height: 22,
        backgroundColor: "#f05a5b",
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginRight: 10,
        width: "20%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});