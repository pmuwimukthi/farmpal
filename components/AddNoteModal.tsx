// components/AddNoteModal.tsx
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/assets';
import {Note, NoteType} from '../types';

type AddNoteModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (noteData: Omit<Note, 'id'>) => void;
};

const NOTE_TYPE_OPTIONS: {label: string; value: NoteType; icon: any}[] = [
  {label: 'Vaccination', value: 'vaccination', icon: ICONS.vaccination},
  {label: 'Chick Dead', value: 'chick-dead', icon: ICONS['chick-dead']},
  {label: 'Work', value: 'work', icon: ICONS.work},
  {label: 'Employee', value: 'employee', icon: ICONS.employee},
  {label: 'Default', value: 'default', icon: ICONS.default},
];

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<NoteType>('default');

  const handleSubmit = () => {
    if (!title) {
      alert('Please enter a title');
      return;
    }

    const newNoteData = {
      title,
      description,
      type: selectedType,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };

    onSubmit(newNoteData);
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedType('default');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add a New Note</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Feed delivery"
            placeholderTextColor={COLORS.darkGrey}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="e.g., 20 bags of starter feed..."
            placeholderTextColor={COLORS.darkGrey}
            multiline
          />

          <Text style={styles.label}>Note Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.typeSelector}>
              {NOTE_TYPE_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.typeButton,
                    selectedType === option.value && styles.typeButtonSelected,
                  ]}
                  onPress={() => setSelectedType(option.value)}>
                  <Image source={option.icon} style={styles.typeIcon} />
                  <Text
                    style={[
                      styles.typeLabel,
                      selectedType === option.value &&
                        styles.typeLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.subtext,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    padding: 12