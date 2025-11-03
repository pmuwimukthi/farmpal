// data/mockData.ts
import { Note } from '../types';

export const DUMMY_NOTES: Note[] = [
  {
    id: '1',
    type: 'vaccination',
    title: 'Vaccination Day',
    date: '4th march 2025',
    time: '8.00 AM',
    description: 'All 500 chicks received their 1st-week vaccination.',
  },
  {
    id: '2',
    type: 'chick-dead',
    title: '2 Chiks died',
    date: '5th march 2025',
    time: '10.30 AM',
    description: 'due to high temperature',
  },
  {
    id: '3',
    type: 'chick-dead',
    title: '2 Chiks died',
    date: '5th march 2025',
    time: '10.30 AM',
    description: 'Another chick died, possible pecking.',
  },
  {
    id: '4',
    type: 'work',
    title: 'Feed delivery',
    date: '5th march 2025',
    time: '1.00 PM',
    description: '20 bags of starter feed arrived.',
  },
];