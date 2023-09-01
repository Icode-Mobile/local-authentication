import * as LocalAuthentication from 'expo-local-authentication';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

const SECRET = [
  'Icode-0ebd2062f-Mobile',
  'caio-2dcc4ce1-cosenza',
  'Macarrao-b6df-spaguett',
  'feijao-d72fa9-arroz',
  'secreto-0c0840-segredo',
];

export default function App() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('Sua senha aqui');

  function chosenPassword() {
    return SECRET[Math.floor(Math.random() * SECRET.length)];
  }

  const handleAcessSecretPass = async () => {
    const response = await LocalAuthentication.getEnrolledLevelAsync();
    if (response === LocalAuthentication.SecurityLevel.BIOMETRIC) {
      const result = await LocalAuthentication.authenticateAsync({
        cancelLabel: 'Cancelar autenticação',
        requireConfirmation: true,
      });
      if (result.success) {
        Alert.alert('SUCESSO!', 'A sua senha secreta está disponível');
        setShowPassword(true);
        setPassword(chosenPassword);
        setTimeout(() => {
          setShowPassword(false);
          setPassword('');
        }, 5000);
      } else {
        Alert.alert('ERRO', 'Não foi possível logar!');
      }
    } else {
      Alert.alert('SEM BIOMETRIA', 'Login sem biometria');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tela de bloqueio baseado em telas sensíveis</Text>
      <Button title='Acessar senha secreta' onPress={handleAcessSecretPass} />
      {showPassword && (
        <Text
          style={{
            color: '#ff0000',
            textDecorationLine: 'underline',
            fontWeight: 'bold',
            marginTop: 5,
          }}
        >
          {password}
        </Text>
      )}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
