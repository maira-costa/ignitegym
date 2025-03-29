import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackGroundImage from "@assets/background.png"; // Para reconhecer a importação é preciso cria o arquivo png.d.ts
/*
 Para usar svg instalamos duas bibliotecas: 
  1) npx expo install react-native-svg  
  2) npm install --save-dev react-native-svg-transformer
   - Criar e configurar arquivo metro.config.js de acordo com doc https://github.com/kristerkari/react-native-svg-transformer
*/
import Logo from "@assets/logo.svg"; // Para reconhecer a importação é preciso cria o arquivo svg.d.ts com cofiguração de acordo com doc https://github.com/kristerkari/react-native-svg-transformer
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { control } = useForm();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackGroundImage}
          defaultSource={BackGroundImage}
          alt="Pessoas treinando"
          position="absolute"
        />
        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />
            <Text color="$gray100" fontSize="$sm">
              Treine a sua mente e o seu corpo.
            </Text>
          </Center>
          <Center gap="$2">
            <Heading color="$gray100">Acesse sua conta</Heading>

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Button title="Acessar" />
          </Center>
          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Ainda não tem acesso?
            </Text>
            <Button
              title="Criar Conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
