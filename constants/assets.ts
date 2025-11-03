// constants/assets.ts

// We use require() to load images in React Native
export const ICONS = {
  // Note Types
  vaccination: require('../assets/images/note-vactination.png'),
  'chick-dead': require('../assets/images/note-chiks-dead.png'),
  work: require('../assets/images/note-work.png'),
  employee: require('../assets/images/note-employee.png'),
  default: require('../assets/images/note-default.png'),

  // UI Elements
  add: require('../assets/images/add.png'),
  
  // Tab Icons (Expo Router will use these)
  home: require('../assets/images/bottom-home.png'),
  analytics: require('../assets/images/bottom-analitics.png'),
  calendar: require('../assets/images/bottom-calender.png'),
  profile: require('../assets/images/bottom-profile.png'),
};