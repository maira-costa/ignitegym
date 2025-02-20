/*Rotas de quando o usuário não está logado

  Dependências intaladas:
    - react navigation: npm install @react-navigation/native em https://reactnavigation.org/docs/getting-started
    - screens e safearea context: npm install react-native-screens react-native-safe-area-context em https://reactnavigation.org/docs/getting-started
    - stack navigator: npx expo install react-native-screens react-native-safe-area-context em https://reactnavigation.org/docs/hello-react-navigation?config=dynamic

*/
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignUp } from "@screens/SignUp";
import { SignIn } from "@screens/SignIn";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
