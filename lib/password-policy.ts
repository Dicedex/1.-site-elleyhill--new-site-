export interface PasswordValidationResult {
  isValid: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialChar: boolean;
  hasNumber: boolean;
  errors: string[];
}

export function validatePasswordPolicy(password: string): PasswordValidationResult {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const errors: string[] = [];
  if (!hasMinLength) errors.push("At least 8 characters long");
  if (!hasUppercase) errors.push("At least one uppercase letter (A-Z)");
  if (!hasLowercase) errors.push("At least one lowercase letter (a-z)");
  if (!hasSpecialChar) errors.push("At least one special character (!@#$%^&*...)");
  if (!hasNumber) errors.push("At least one numeric digit (0-9)");

  return {
    isValid: hasMinLength && hasUppercase && hasLowercase && hasSpecialChar && hasNumber,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasSpecialChar,
    hasNumber,
    errors,
  };
}
