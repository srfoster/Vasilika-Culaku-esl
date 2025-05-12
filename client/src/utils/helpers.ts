/**
 * Format a date to a human-readable string
 * @param date The date to format
 * @returns Formatted date string (e.g., "May 15, 2023")
 */
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Truncate a string if it exceeds a maximum length
 * @param str The string to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

/**
 * Get a random element from an array
 * @param array The array to select from
 * @returns A random element from the array
 */
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle an array randomly (Fisher-Yates algorithm)
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Create an array of sequential numbers
 * @param start Starting number (inclusive)
 * @param end Ending number (inclusive)
 * @returns Array of numbers from start to end
 */
export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Get a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculate percentage based on completed items and total items
 * @param completed Number of completed items
 * @param total Total number of items
 * @returns Percentage as integer (0-100)
 */
export const calculatePercentage = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.floor((completed / total) * 100);
};

/**
 * Group an array of objects by a specific property
 * @param array Array of objects to group
 * @param property Property name to group by
 * @returns Object with keys as property values and values as arrays of objects
 */
export const groupBy = <T>(array: T[], property: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const key = String(item[property]);
    result[key] = result[key] || [];
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
};
