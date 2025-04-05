import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast, 
  Toast,
  ToastTitle
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";

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
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { FlatListComponent } from "react-native";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const toast = useToast();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch(error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde."

      setIsLoading(false);

      toast.show({
        placement: 'top',
        render: () => (
          <Toast backgroundColor='$red500' action="error" variant="outline">
            <ToastTitle color="$white">{title}</ToastTitle>
          </Toast>
        )
      })
    }
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
              control={control}
              name="email"
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Button 
              title="Acessar" 
              onPress={handleSubmit(handleSignIn)} 
              isLoading={isLoading}
            />
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
