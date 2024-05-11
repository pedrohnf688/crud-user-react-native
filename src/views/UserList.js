import React, { useContext } from "react";
import { View, Alert, FlatList } from "react-native";
import { Avatar, ListItem, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import UserContext from "../context/UserContext";


export default props => {

    const { state, dispatch } = useContext(UserContext);

    function confirmUserDeletion(user) {
        Alert.alert(
            'Excluir Usuário', 
            'Deseja excluir o usuário?', 
            [
                {
                    text: 'Sim',
                    onPress() {
                        dispatch({ 
                            type: "deleteUser",
                            payload: user, 
                        })
                    },
                },
                {
                    text: 'Não',
                },
            ]
        )
    }


    function getActions(user) {
        return (
          <View style={{flexDirection: 'row'}}>
            <Button
                 onPress={() => props.navigation.navigate("UserForm", user)}
                type="clear"
                icon={<Icon name="edit" size={25} color="orange" />}
            />
            <Button
                onPress={() => confirmUserDeletion(user)}
                type="clear"
                icon={<Icon name="trash" size={25} color="red" />}
            />
          </View>
        );
      }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate("UserForm", user)}
            >
                <Avatar source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Title>{user.email}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>{getActions(user)}</ListItem.Content>
            </ListItem>
        )
    }


    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>

    )
}