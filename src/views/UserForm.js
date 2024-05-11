import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import UserContext, { UserProvider } from "../context/UserContext";

export default ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {});
    const { dispatch } = useContext(UserContext);

    return (
        <View style={styles.form}>
            <Text>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Informe o Nome"
                value={user.name}
                onChangeText={name => setUser({ ...user, name })}
            />
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Informe o Email"
                value={user.email}
                onChangeText={email => setUser({ ...user, email })}
            />
            <Text>URL do Avatar</Text>
            <TextInput
                style={styles.input}
                placeholder="Informe a URL do Avatar"
                value={user.avatarUrl}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
            />

            <Button 
                title="Salvar"
                onPress={() => {
                    dispatch({
                        type: user.id ? "updateUser"  : "createUser",
                        payload: user,

                    });
                    navigation.goBack();
                }}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    form: {
        padding: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }
});