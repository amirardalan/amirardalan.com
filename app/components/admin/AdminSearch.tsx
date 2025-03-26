'use client';

import { useState, useRef } from 'react';
import IconClose from '@/components/icons/IconClose';

interface AdminSearchProps {
  name: string;
  placeholder: string;
  defaultValue?: string;
  totalResults: number;
}

export default function AdminSearch({
  name,
  placeholder,
  defaultValue = '',
  totalResults,
}: AdminSearchProps) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [searchExecuted, setSearchExecuted] = useState(!!defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClearFilters = () => {
    setSearchTerm(''); // Clear the input first
    setSearchExecuted(false);
    setTimeout(() => {
      formRef.current?.submit(); // Submit the form after clearing
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!searchTerm) {
      e.preventDefault();
      setSearchExecuted(false);
    } else {
      setIsLoading(true); // Set loading state when the form is submitted
      setSearchExecuted(true);
    }
  };

  return (
    <form
      method="get"
      className="mb-8"
      onSubmit={(e) => {
        handleSubmit(e);
        setTimeout(() => setIsLoading(false), 500); // Simulate loading completion
      }}
      ref={formRef}
    >
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border-2 border-zinc-300 bg-zinc-100 p-2 text-dark outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-light"
      />
      {searchExecuted && (
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-dark dark:text-light">
            {isLoading
              ? 'Loading...'
              : `${totalResults} result${totalResults !== 1 ? 's' : ''}`}
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            title="Clear filters"
            className="flex items-center"
          >
            <IconClose />
            <span className="pl-1 text-dark dark:text-light">
              Clear Filters
            </span>
          </button>
        </div>
      )}
    </form>
  );
}
