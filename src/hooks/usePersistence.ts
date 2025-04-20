// Advance use-case, where user selected data is stored in local storage

import {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StepFlowResult} from '../features/StepFlow/types';

type PersistenceError = {
  code: 'STORAGE_READ' | 'STORAGE_WRITE' | 'PARSE_ERROR';
  message: string;
  originalError?: unknown;
};

export const usePersistence = (key: string) => {
  const [error, setError] = useState<PersistenceError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await AsyncStorage.getItem(key);
      if (!data) return null;

      const parsed = JSON.parse(data) as StepFlowResult;
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid data format');
      }

      return parsed;
    } catch (err) {
      const error: PersistenceError = {
        code: err instanceof SyntaxError ? 'PARSE_ERROR' : 'STORAGE_READ',
        message: err instanceof Error ? err.message : 'Unknown error',
        originalError: err,
      };
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const save = useCallback(
    async (data: StepFlowResult) => {
      setIsLoading(true);
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        setError({
          code: 'STORAGE_WRITE',
          message: err instanceof Error ? err.message : 'Failed to save data',
          originalError: err,
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [key],
  );

  return {load, save, error, isLoading};
};
