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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.tasksWrapper}>
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

      {/* Today's Tasks Section */}
      <View style={[styles.tasksWrapper, { paddingTop: 30 }]}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
  },
  inputContainer: {
    paddingTop: 30,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  items: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#55BCF6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
