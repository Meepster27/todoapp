import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Task = ({ text, onToggle, onDelete, completed }) => {
  return (
    <View style={[styles.item, completed && styles.itemCompleted]}>
      <View style={styles.itemLeft}>
        <Pressable
          style={[styles.square, completed && styles.squareCompleted]}
          onPress={onToggle}
        >
          {completed && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>
        <Text style={[styles.itemText, completed && styles.itemTextCompleted]}>
          {text}
        </Text>
      </View>
      <Pressable style={styles.circular} onPress={onDelete}>
        <Text style={styles.deleteIcon}>×</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemCompleted: {
    backgroundColor: '#e8f4f8',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareCompleted: {
    opacity: 1,
    backgroundColor: '#55BCF6',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 16,
    color: '#000',
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  deleteIcon: {
    display: 'none',
  },
});

export default Task;
