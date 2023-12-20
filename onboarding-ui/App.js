import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
const Stack = createNativeStackNavigator();

export default function App() {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value ==null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true)
      }else{
        setIsFirstLaunch(false)
      }
    })
  },[]);

  if(isFirstLaunch == null){
    return null
  }else if(isFirstLaunch == true){
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Onboarding"
    >
     <Stack.Screen
       name="Onboarding"
       component={OnboardingScreen}
       options={{
         headerShown:false
       }}
     />
     <Stack.Screen
      name="Login"
      component={LoginScreen} 
      options={{
       headerShown:false
      }}
     />
    </Stack.Navigator>
  </NavigationContainer>
  }else{
    return (
      <LoginScreen/>
    )
  }
 
}
