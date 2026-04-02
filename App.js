import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Task from './components/Task';

const initialTodos = [
  { id: '1', text: 'Learn Flexbox layout', completed: false },
  { id: '2', text: 'Build a React Native Todo app', completed: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos(prev => [
      { id: Date.now().toString(), text: trimmed, completed: false },
      ...prev,
    ]);
    setText('');
  };

  const toggleTodo = id => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }) => (
    <Task
      text={item.text}
      completed={item.completed}
      onToggle={() => toggleTodo(item.id)}
      onDelete={() => deleteTodo(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Today's Tasks</Text>
        </View>

        {/* Today's Tasks Section */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {todos.map((item) => (
                <Task
                  key={item.id}
                  text={item.text}
                  completed={item.completed}
                  onToggle={() => toggleTodo(item.id)}
                  onDelete={() => deleteTodo(item.id)}
                />
              ))}
              {todos.length === 0 && (
                <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>

      {/* Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Write a task"
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Pressable style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    flexDirection: 'column',
  },
  safeArea: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 40 : 30,
    paddingBottom: Platform.OS === 'ios' ? 80 : Platform.OS === 'android' ? 60 : 20,
    backgroundColor: '#e8f4f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'column',
  },
  items: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    fontSize: 16,
    flex: 1,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: '#55BCF6',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
