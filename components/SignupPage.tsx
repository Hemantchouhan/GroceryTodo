import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

type SignupPageProps = {
    onSignup: (data: { email: string; password: string }) => void;
    onBack: () => void;
};

export default function SignupPage({ onSignup, onBack }: SignupPageProps) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Sign Up</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 8 }} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 16 }} />
            <Button title="Sign Up" onPress={() => onSignup({ email, password })} />
            <Button title="Back to Login" onPress={onBack} />
        </View>
    );
}
