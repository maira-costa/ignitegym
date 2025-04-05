import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"; //npx expo install expo-font @expo-googgle-fonts/roboto
import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed"; // npm install @gluestack-ui/themed@1.1.34 @gluestack-style/react@1.0.57 @gluestack-ui/config@1.1.19 --legacy-peer-deps

/*
 import { config } from "@gluestack-ui/config"; // config permite usar o tema padrão do gluestack
 
*/

import { config } from "./config/gluestack-ui.config"; // npx gluestack-ui-scripts eject-theme => cria a pasta config, que contem o arquivo gluestack-ui.config.ts com todos os tokens, que podem ser customizados

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
