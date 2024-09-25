import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    // Fetching comments data from JSON Placeholder API via Axios
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setToDos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.toDoItem}>
        {/* <Text style={styles.name}>{item.name}</Text> */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.completed}>
          {item.completed ? "Completed" : "Not Completed"}
        </Text>
      </View>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={toDos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  toDoItem: {
    padding: 15,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  // name: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 4,
  // },

  title: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },

  completed: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 5,
  },
});
