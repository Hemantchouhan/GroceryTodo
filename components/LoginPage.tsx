import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

type LoginPageProps = {
    onLogin: (credentials: { email: string; password: string }) => void;
    onSignup: () => void;
};

export default function LoginPage({ onLogin, onSignup }: LoginPageProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Login</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 8 }} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 16 }} />
            <Button title="Login" onPress={() => onLogin({ email, password })} />
            <Button title="Go to Signup" onPress={onSignup} />
        </View>
    );
}
