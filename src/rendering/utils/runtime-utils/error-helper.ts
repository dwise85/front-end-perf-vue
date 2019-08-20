/** Helper utility to unwrap an error (if present) to get the error message, otherwise returns the input object. */
export const unWrapError = (error: any): string =>
  error && error.message ? error.message : error;
