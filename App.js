// In App.js in a new project

import * as React from "react";
import { View, Text, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import styles from "./components/style";
import Manager from "./Manager";

const Home = (progs) => {
  const nav = progs.navigation;

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 90 }}>
      <Image source={require("./assets/favicon.png")} style={styles.photo} />
      <View style={styles.button}>
        <Button
          title="Manager"
          onPress={() => nav.navigate("Manager", { name: "Sản phẩm" })}
        ></Button>
        <Button
          title="About"
          onPress={() =>
            nav.navigate("About", {
              name: "Nguyễn Văn Vững",
              rollNo: "PH27864",
            })
          }
        ></Button>
      </View>
    </View>
  );
};

const About = (progs) => {
  const nav = progs.navigation;
  const route = progs.route;
  const getName = route.params?.name || "Nguyễn Văn Vững";
  const getRollNo = route.params?.rollNo || "PH27864";
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.text}>{getName}</Text>
      <Text style={styles.text}>{getRollNo}</Text>
      <Button title="Home" onPress={() => nav.navigate("Home")}></Button>
    </View>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Manager" component={Manager} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
