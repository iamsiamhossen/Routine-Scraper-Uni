// src/hooks/useRoutine.js
import { useEffect, useState } from 'react';
import { getLiveRoutine } from '../services/firebaseService';

export const useRoutine = (batch) => {
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const unsubscribe = getLiveRoutine(batch, (data) => {
      setRoutine(data);
    });
    return () => unsubscribe();
  }, [batch]);

  return routine;
};