export const APP_CONFIG = {
    // Account settings
    MAX_ACCOUNTS: 5,
    USERNAME_PREFIX: 'PP', // Pranjal Pathshala
    
    // Classes available
    CLASSES: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'] as const,
    
    // Subjects available
    SUBJECTS: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'English',
      'Hindi',
      'Social Science',
      'Computer Science',
    ] as const,
    
    // Material types
    MATERIAL_TYPES: {
      BOOK: 'book',
      SOLUTION: 'solution',
      COACHING: 'coaching',
    } as const,
    
    // Task settings
    DEFAULT_TASK_POINTS: 10,
    MAX_TASK_POINTS: 20,
    
    // Quiz settings
    QUIZ_WARNING_TIME: 300, // 5 minutes in seconds
    
    // Fee settings
    FEE_OVERDUE_DAYS: 5,
    FEE_WARNING_DAYS: 3,
    
    // Notification polling interval (30 seconds)
    NOTIFICATION_POLL_INTERVAL: 30000,
    
    // API config
    SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  } as const
  
  // Type exports
  export type Class = typeof APP_CONFIG.CLASSES[number]
  export type Subject = typeof APP_CONFIG.SUBJECTS[number]
  export type MaterialType = typeof APP_CONFIG.MATERIAL_TYPES[keyof typeof APP_CONFIG.MATERIAL_TYPES]