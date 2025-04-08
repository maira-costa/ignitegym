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
import { useForm, Controller } from "react-hook-form"; //npm install react-hook-form em https://www.react-hook-form.com/get-started

import BackGroundImage from "@assets/background.png"; // Para reconhecer a importação é preciso criar o arquivo png.d.ts
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

import * as yup from "yup"; // npm install @hookform/resolvers yup em https://react-hook-form.com/get-started#SchemaValidation
import {yupResolver} from "@hookform/resolvers/yup" // npm install @hookform/resolvers yup em https://react-hook-form.com/get-started#SchemaValidation

import { api } from "@services/api";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";



type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail"),
  password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
  password_confirm: yup.string().required("Confirme a senha").oneOf([yup.ref("password"), ""], "A confirmação da senha não confere"),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  }); //control controla todos os inputs e handleSubmit envia os datos de todos os inputs

  const toast = useToast();
  const {signIn} = useAuth();

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({
    name,
    email,
    password,
  }: FormDataProps) { 

    try {
      setIsLoading(true);
      await api.post('/users', {name, email, password});
      await signIn(email, password);
    } catch(error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError; // verifica se é um erro tratado
      const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde."

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
          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme sua senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />
            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
              isLoading={true}
            />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            mt="$12"
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
