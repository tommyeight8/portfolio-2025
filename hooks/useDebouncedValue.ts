"use clint";

import { useProjectContext } from "@/context/ProjectContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 120) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
