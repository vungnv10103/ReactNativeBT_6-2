import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import styles from "./style";

export default function Form(progs) {
  return (
    <View style={styles.addTaskNew}>
      <TextInput placeholder="Title" style={styles.input} />
      <TextInput placeholder="Description" style={styles.input} />
      <TextInput placeholder="URL IMAGE" style={styles.input} />
      <TouchableOpacity>
        <View style={styles.iconWallpaper}>
          <Text style={styles.iconAdd}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
