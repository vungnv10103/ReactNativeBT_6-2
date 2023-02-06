import { StyleSheet, Text, View } from "react-native";
import React from "react";

const About = (progs) => {
  const nav = progs.navigation;

  return (
    <View>
      <Text>About</Text>
      <Image source={require("./assets/icon.png")} />
    </View>
  );
};

const styles = StyleSheet.create({});
