import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "../pages/HomeScreen"
import ArtikelScreen from "../pages/ArtikelScreen"
import ProfileScreen from "../pages/ProfileScreen"
const Tab = createBottomTabNavigator()

const BottomNav = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "lightgray",
            marginHorizontal: 16,
            borderRadius: 24,
            height: 64,
            marginBottom: 16,
            shadowOpacity: 0,
            elevation: 1,
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
              color = focused ? "black" : "lightgray";
            } 
            else if (route.name === "Profile") {
              iconName = "person";
              color = focused ? "black" : "lightgray";
            }
            else if (route.name === "Artikel") {
              iconName = "book";
              color = focused ? "black" : "lightgray";
            }

            return <Octicons name={iconName} size={24} color={color} />;
          },

          headerShown: false,
        })}>

        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Artikel" component={ArtikelScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>

      </Tab.Navigator>
  )}

export default BottomNav