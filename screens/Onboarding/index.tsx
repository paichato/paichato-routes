import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../hooks/authContext'

export default function Onboarding() {

    const { signIn } = useAuth();

    const user = {
        "_id": "665aea1a1bc044be0dffc942",
    }

    const handleSignIn = () => {
        signIn({
            data: {
                user,
                token: 'somethingLong'
            }
        })
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Onboarding</Text>
            <Button title='Signin' onPress={handleSignIn}>
            </Button>

        </View>
    )
}