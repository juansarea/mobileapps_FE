import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screen/Home";
import { EditCustomer } from "./src/screen/EditCustomer";
// import axios from 'axios';
const Stack = createNativeStackNavigator();
export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="EditCustomer" component={EditCustomer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    paddingTop: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    borderWidth: 0.7,
    borderColor: "#bfbfbf",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 10,
  },
  select: {
    borderWidth: 0.7,
    borderColor: "#bfbfbf",
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 5,
    marginVertical: 10,
  },
});
export default App;
