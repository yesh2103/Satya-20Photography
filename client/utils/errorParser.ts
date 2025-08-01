// Robust error parsing utility to handle any error object structure
export const parseError = (error: any): string => {
  if (!error) return 'Unknown error';
  
  // If it's already a string
  if (typeof error === 'string') return error;
  
  // Try to extract message from various possible properties
  const possibleMessages = [
    error.message,
    error.error_description,
    error.msg,
    error.description,
    error.detail,
    error.error,
    error.reason,
    error.statusText
  ];
  
  for (const msg of possibleMessages) {
    if (msg && typeof msg === 'string' && msg.trim()) {
      return msg;
    }
  }
  
  // Try to stringify the error safely
  try {
    const errorStr = JSON.stringify(error, null, 2);
    if (errorStr && errorStr !== '{}' && errorStr !== 'null') {
      return `Error object: ${errorStr}`;
    }
  } catch (e) {
    // JSON.stringify failed, try toString
  }
  
  // Try toString method
  try {
    const toStringResult = error.toString();
    if (toStringResult && toStringResult !== '[object Object]') {
      return toStringResult;
    }
  } catch (e) {
    // toString failed
  }
  
  // Last resort - describe the error type and properties
  try {
    const errorType = error.constructor?.name || typeof error;
    const properties = Object.keys(error);
    return `${errorType} with properties: ${properties.join(', ')}`;
  } catch (e) {
    return 'Unparseable error object';
  }
};

export const logError = (label: string, error: any) => {
  console.error(`❌ ${label}:`, {
    parsedMessage: parseError(error),
    errorType: typeof error,
    errorConstructor: error?.constructor?.name,
    errorKeys: error && typeof error === 'object' ? Object.keys(error) : [],
    rawError: error
  });
};
