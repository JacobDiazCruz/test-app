// Simple email validation using regular expression
export const validateEmail = (emailField: string) => {
  if (emailField) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailField);
  }
  return true;
};