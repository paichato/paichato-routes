import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../hooks/authContext'

export default function Home() {

    const {logoutUser}=useAuth();

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>Home</Text>
      <Button title='Logout' onPress={logoutUser}>
              
            </Button>
    </View>
  )
}