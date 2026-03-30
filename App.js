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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

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
    <View style={[styles.todoItem, item.completed && styles.todoItemDone]}>
      <Pressable style={styles.todoTextArea} onPress={() => toggleTodo(item.id)}>
        <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>
          {item.text}
        </Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteLabel}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Todo App</Text>
        <Text style={styles.subtitle}>{todos.length} task{todos.length === 1 ? '' : 's'}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Pressable style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No todos yet. Add one above.</Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: '#475569',
  },
  content: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  todoItemDone: {
    backgroundColor: '#e0f2fe',
  },
  todoTextArea: {
    flex: 1,
    marginRight: 12,
  },
  todoText: {
    fontSize: 16,
    color: '#0f172a',
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  deleteLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
