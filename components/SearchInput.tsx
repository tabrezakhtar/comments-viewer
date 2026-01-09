import { useCallback, useRef, useState, useEffect } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  debounceMs?: number;
}

export default function SearchInput({ value, onChange, placeholder = "Search...", label = "Search", id = "search", debounceMs }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = useCallback((newValue: string) => {
    if (debounceMs) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    } else {
      onChange(newValue);
    }
  }, [onChange, debounceMs]);

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        type="text"
        value={internalValue}
        onChange={(e) => {
          const newValue = e.target.value;
          setInternalValue(newValue);
          handleChange(newValue);
        }}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
}