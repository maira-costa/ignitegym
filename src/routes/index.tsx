import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Loading } from "@components/Loading";

export function Routes() {
  const theme = DefaultTheme; //Usa a cor padrão do tema no react navigation
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700; //customiza background

  const { user, isLoadingUserStorageData } = useAuth();

  if(isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
       {user.id ? <AppRoutes /> : <AuthRoutes/>}
      </NavigationContainer>
    </Box>
  );
}
