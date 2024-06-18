// App.js

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn React Native' },
    { text: 'Learn TypeScript' },
    { text: 'Learn Expo' },
    { text: 'Learn Firebase' },
  ]);
  const [profile] = useState({
    name: 'John Doe',
    image: require('./assets/girls.jpg'), // Using require to load local image
  });
  const [currentItem, setCurrentItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrEditTodo = () => {
    if (currentItem.trim()) {
      if (editingIndex !== null) {
        // Edit existing item
        const updatedTodos = [...todos];
        updatedTodos[editingIndex].text = currentItem.trim();
        setTodos(updatedTodos);
        setEditingIndex(null);
      } else {
        // Add new item
        setTodos([...todos, { text: currentItem.trim() }]);
      }
      setCurrentItem(''); // Clear the input field
    } else {
      Alert.alert('Error', 'Please enter a valid todo item.');
    }
  };

  const editTodo = (index) => {

    setCurrentItem(todos[index].text);
    setEditingIndex(index);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profile.image} style={styles.profileImage} />
        <Text style={styles.profileName}>{profile.name}</Text>
      </View>
      <View style={styles.centeredView}>
        <View style={styles.items}>
          <FlatList
            data={todos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.box}>
                {editingIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={currentItem}
                    onChangeText={setCurrentItem}
                  />
                ) : (
                  <Text style={styles.boxText}>{item.text}</Text>
                )}
                <View style={styles.actions}>
                  {editingIndex === index ? (
                    <Button title="Save" onPress={addOrEditTodo} />
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => editTodo(index)}>
                        <Text style={styles.edit}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTodo(index)}>
                        <Text style={styles.delete}>Delete</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          />
          {editingIndex === null && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Add Todo"
                onChangeText={setCurrentItem}
                value={currentItem}
              />
              <Button title="Add Todo" onPress={addOrEditTodo} />
            </>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeee',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  items: {
    flex: 1,
    width: '100%',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  box: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginVertical: 10,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  delete: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
    padding: 5,
  },
});
