  import React from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createStackNavigator } from "@react-navigation/stack";
  import BottomNav from "./components/BottomNav";
  import SplashScreen from "./pages/Splashscreen";
  import DetailArtikel from "./pages/DetailArtikel"; 
  import DetailHewan from "./pages/DetailHewan"; 
  import EditProfileScreen from "./pages/EditProfileScreen"; 

  const Stack = createStackNavigator();

  const App = () => {
    console.log("Rendering App");
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const MainApp = () => {
    console.log("Rendering MainApp");
    return (
      <Stack.Navigator initialRouteName="BottomNav">
        <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailArtikel" component={DetailArtikel} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailHewan" component={DetailHewan} options={{ headerShown: false }}/>
        <Stack.Screen name="Edit" component={EditProfileScreen} />
      </Stack.Navigator>
    );
  }
  
  export default App;