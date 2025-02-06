import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";

import { AuthRoutes } from "./auth.routes";

import { gluestackUIConfig } from "@gluestack-ui/config";

export function Routes() {
  const theme = DefaultTheme; //Usa a cor padrão do tema no react navigation
  theme.colors.background = gluestackUIConfig.tokens.colors.blueGray700; //customiza background - não apareceu o gray 700
  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
