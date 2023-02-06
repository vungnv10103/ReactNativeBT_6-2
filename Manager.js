import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

export default function Manager(progs) {
  const route = progs.route;
  // or const {route} = progs
  const getName = route.params?.name || "Name screen";

  const [isShowForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [editID, setEditID] = useState(0);
  const [list, setList] = useState([]);

  const onSave = () => {
    /*
      0. Nếu có EditID != 0 => đang chỉnh sửa
      1. Cấu trúc dữ liệu obj mới để lưu
      2. Định nghĩa mạng dữ liệu mới rồi lưu
      3. Đóng modal và đưa textInput về default value
  
      */
    // step 0
    if (editID != 0) {
      const newEditList = list.map((item) => {
        if (item.id == editID) {
          // gán giá trị mới
          item.name = name;
          item.price = price;
          item.image = image;
        }
        return item;
      });
      setList(newEditList);
      return onClose();
    }
    // step 1
    const newItem = {
      id: list.length,
      name: name,
      price: price,
      image: image,
    };

    // step 2
    const newList = [...list, newItem];
    setList(newList);
    // step 3
    return onClose();
  };

  const onClose = () => {
    setShowForm(false);
    setName("");
    setPrice(0);
    setEditID(0);
    setImage("");
  };

  const onDelete = (itemID) => {
    Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xoá?", [
      {
        text: "Oke",
        onPress: () => {
          const newList = list.filter((item) => {
            return item.id !== itemID;
          });
          setList(newList);
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };

  const onEdit = (itemID) => {
    /*
    1. Mở modal
    2. Tìm kiếm phần tử có id = itemID
    3. Hiển thị dữ liệu
    */

    // step1
    setShowForm(true);
    // step2
    const editItem = list.find((item) => item.id == itemID);
    // step3

    setEditID(editItem.id);
    setName(editItem.name);
    setPrice(editItem.price);
    setImage(editItem.image);
  };
  return (
    <View style={styles.container}>
      {isShowForm ? null : (
        <Button title="Thêm mới" onPress={() => setShowForm(true)} />
      )}

      <Modal visible={isShowForm} animationType="slide">
        <View>
          {/* <Text>{name}</Text>
          <Text>{price}</Text> */}
          <Text>Quản lý: {getName}</Text>
          <TextInput
            placeholder="Tên SP"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Giá"
            keyboardType="numeric"
            value={price}
            onChangeText={(value) => setPrice(value)}
          />
          <TextInput
            placeholder="URL_IMG"
            value={image}
            onChangeText={(img) => setImage(img)}
          />
          <Button title="Huỷ" onPress={() => onClose()} />
          <Button title="Lưu" onPress={() => onSave()} />
        </View>
      </Modal>

      <View>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View>
              <Text>ID: {item.id}</Text>
              <Text>Tên sản phẩm: {item.name}</Text>
              <Text>Giá: {item.price}</Text>
              <Pressable onPress={() => onDelete(item.id)}>
                <Text style={styles.delete}>Xoá</Text>
              </Pressable>
              <Pressable onPress={() => onEdit(item.id)}>
                <Text style={styles.edit}>Sửa</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  delete: {
    color: "red",
  },
  edit: {
    color: "blue",
  },
});
