// types.ts

// Defines the possible types for a note, used for icons
export type NoteType =
  | 'vaccination'
  | 'chick-dead'
  | 'work'
  | 'employee'
  | 'default';

// The main Note object structure
export interface Note {
  id: string;
  type: NoteType;
  title: string;
  date: string;
  time: string;
  description: string;
}