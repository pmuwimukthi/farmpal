// (tabs)/notes.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router'; // Used to set the header title
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

// --- FIXED PATHS ---
import AddNoteModal from '../../components/AddNoteModal';
import NoteItem from '../../components/NoteItem';
import { ICONS } from '../../constants/assets';
import { COLORS } from '../../constants/colors';
import { DUMMY_NOTES } from '../../data/mockData';
import { Note } from '../../types';
// --- END OF FIX ---

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Load initial data (This is where you'll fetch from Firebase)
  useEffect(() => {
    // TODO: Replace this with a fetch call to Firebase/Firestore
    setNotes(DUMMY_NOTES);
  }, []);

  const handleNotePress = (noteId: string) => {
    setSelectedNoteId(prevId => (prevId === noteId ? null : noteId));
  };

  const handleAddNote = (newNoteData: Omit<Note, 'id'>) => {
    // This is where you'll save to Firebase
    // TODO: Add Firebase save call here

    // For now, we add to local state with a temporary ID
    const newNote: Note = {
      id: Math.random().toString(), // Firebase will generate a real ID
      ...newNoteData,
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={[COLORS.gradientTop, COLORS.gradientBottom]}
      style={styles.container}>
      {/* This configures the header bar for this screen.
        The back button and title are handled by Expo Router.
      */}
      <Stack.Screen
        options={{
          title: 'Notes',
          headerStyle: {backgroundColor: COLORS.gradientTop},
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: COLORS.text,
          },
          headerTitleAlign: 'center',
          // We can add a back button, but it might be handled by the stack
          // headerLeft: () => ... (if needed)
        }}
      />

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NoteItem
            note={item}
            isSelected={item.id === selectedNoteId}
            onPress={() => handleNotePress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* The Bottom Tab Bar is handled automatically by (tabs)/_layout.tsx
        We just need to add our "+" button.
      */}

      {/* Add Note FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Image source={ICONS.add} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Add Note Modal */}
      <AddNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddNote}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 100, // Ensure list scrolls above bottom bar
  },
  fab: {
    position: 'absolute',
    right: 20,
    // We position it above the tab bar. 60px tab bar + 20px padding
    bottom: 80, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
});