import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habit {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  target: number;
  unit: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
  value?: number;
}

interface HabitState {
  habits: Habit[];
  completions: HabitCompletion[];
  loading: boolean;
  error: string | null;
}

type HabitAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HABITS'; payload: Habit[] }
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'UPDATE_HABIT'; payload: Habit }
  | { type: 'DELETE_HABIT'; payload: string }
  | { type: 'SET_COMPLETIONS'; payload: HabitCompletion[] }
  | { type: 'TOGGLE_COMPLETION'; payload: { habitId: string; date: string; value?: number } };

const initialState: HabitState = {
  habits: [],
  completions: [],
  loading: false,
  error: null,
};

function habitReducer(state: HabitState, action: HabitAction): HabitState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_HABITS':
      return { ...state, habits: action.payload, loading: false };
    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] };
    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map(h => h.id === action.payload.id ? action.payload : h)
      };
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(h => h.id !== action.payload),
        completions: state.completions.filter(c => c.habitId !== action.payload)
      };
    case 'SET_COMPLETIONS':
      return { ...state, completions: action.payload };
    case 'TOGGLE_COMPLETION':
      const { habitId, date, value } = action.payload;
      const existingIndex = state.completions.findIndex(
        c => c.habitId === habitId && c.date === date
      );
      
      let newCompletions;
      if (existingIndex >= 0) {
        newCompletions = [...state.completions];
        newCompletions[existingIndex] = {
          ...newCompletions[existingIndex],
          completed: !newCompletions[existingIndex].completed,
          value
        };
      } else {
        newCompletions = [...state.completions, {
          habitId,
          date,
          completed: true,
          value
        }];
      }
      
      return { ...state, completions: newCompletions };
    default:
      return state;
  }
}

interface HabitContextType extends HabitState {
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (habitId: string, date: string, value?: number) => void;
  isHabitCompleted: (habitId: string, date: string) => boolean;
  getHabitCompletion: (habitId: string, date: string) => HabitCompletion | undefined;
  getTodayProgress: () => { completed: number; total: number; percentage: number };
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const STORAGE_KEYS = {
  HABITS: '@habits',
  COMPLETIONS: '@completions'
};

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(habitReducer, initialState);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data when state changes
  useEffect(() => {
    if (state.habits.length > 0) {
      AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(state.habits));
    }
  }, [state.habits]);

  useEffect(() => {
    if (state.completions.length > 0) {
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(state.completions));
    }
  }, [state.completions]);

  const loadData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const [habitsData, completionsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HABITS),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETIONS)
      ]);

      if (habitsData) {
        dispatch({ type: 'SET_HABITS', payload: JSON.parse(habitsData) });
      } else {
        // Add default habits for demo
        const defaultHabits: Habit[] = [
          {
            id: '1',
            name: 'Drink water',
            description: '3 liters',
            icon: '💧',
            color: '#3b82f6',
            target: 3,
            unit: 'liters',
            frequency: 'daily',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Exercise',
            description: '30 minutes',
            icon: '🏃',
            color: '#ef4444',
            target: 30,
            unit: 'minutes',
            frequency: 'daily',
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Read a book',
            description: '20 pages',
            icon: '📚',
            color: '#10b981',
            target: 20,
            unit: 'pages',
            frequency: 'daily',
            createdAt: new Date().toISOString()
          }
        ];
        dispatch({ type: 'SET_HABITS', payload: defaultHabits });
      }

      if (completionsData) {
        dispatch({ type: 'SET_COMPLETIONS', payload: JSON.parse(completionsData) });
      } else {
        // Add some demo completions
        const today = new Date().toISOString().split('T')[0];
        const demoCompletions: HabitCompletion[] = [
          { habitId: '1', date: today, completed: true, value: 3 },
          { habitId: '2', date: today, completed: true, value: 30 }
        ];
        dispatch({ type: 'SET_COMPLETIONS', payload: demoCompletions });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' });
    }
  };

  const addHabit = useCallback((habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_HABIT', payload: newHabit });
  }, []);

  const updateHabit = useCallback((habit: Habit) => {
    dispatch({ type: 'UPDATE_HABIT', payload: habit });
  }, []);

  const deleteHabit = useCallback((id: string) => {
    dispatch({ type: 'DELETE_HABIT', payload: id });
  }, []);

  const toggleCompletion = useCallback((habitId: string, date: string, value?: number) => {
    dispatch({ type: 'TOGGLE_COMPLETION', payload: { habitId, date, value } });
  }, []);

  const isHabitCompleted = useCallback((habitId: string, date: string) => {
    return state.completions.some(c => c.habitId === habitId && c.date === date && c.completed);
  }, [state.completions]);

  const getHabitCompletion = useCallback((habitId: string, date: string) => {
    return state.completions.find(c => c.habitId === habitId && c.date === date);
  }, [state.completions]);

  const getTodayProgress = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayCompletions = state.completions.filter(c => c.date === today && c.completed);
    const total = state.habits.length;
    const completed = todayCompletions.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    return { completed, total, percentage };
  }, [state.habits, state.completions]);

  const value = useMemo(() => ({
    ...state,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isHabitCompleted,
    getHabitCompletion,
    getTodayProgress
  }), [state, addHabit, updateHabit, deleteHabit, toggleCompletion, isHabitCompleted, getHabitCompletion, getTodayProgress]);

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}