// components/NoteItem.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICONS } from '../constants/assets';
import { COLORS } from '../constants/colors';
import { Note } from '../types';

type NoteItemProps = {
  note: Note;
  isSelected: boolean;
  onPress: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({note, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        isSelected && {backgroundColor: COLORS.highlight},
      ]}>
      <View style={styles.mainContent}>
        <Image source={ICONS[note.type]} style={styles.icon} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.date}>{note.date}</Text>
        </View>
        <Text style={styles.time}>{note.time}</Text>
      </View>
      {isSelected && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{note.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  date: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  time: {
    fontSize: 12,
    color: COLORS.subtext,
    marginLeft: 10,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(129, 102, 73, 0.2)', // Light subtext color
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.text,
  },
});

export default NoteItem;