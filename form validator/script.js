// Step 1: Grab references to the form and all the fields we need
const form = document.getElementById('signupForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const successMessage = document.getElementById('successMessage');

// Step 2: A regex pattern to check basic email shape (text@text.text)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Step 3: Helper functions to show/clear an error on a given field
function showError(input, errorEl, message) {
  input.classList.add('invalid');
  input.classList.remove('valid');
  errorEl.textContent = message;
}

function showValid(input, errorEl) {
  input.classList.add('valid');
  input.classList.remove('invalid');
  errorEl.textContent = '';
}

// Step 4: Individual validation functions — one per field

function validateName() {
  const value = nameInput.value.trim();

  if (value === '') {
    showError(nameInput, nameError, 'Name is required.');
    return false;
  }

  if (value.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters.');
    return false;
  }

  showValid(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === '') {
    showError(emailInput, emailError, 'Email is required.');
    return false;
  }

  if (!emailPattern.test(value)) {
    showError(emailInput, emailError, 'Enter a valid email address.');
    return false;
  }

  showValid(emailInput, emailError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;

  if (value === '') {
    showError(passwordInput, passwordError, 'Password is required.');
    return false;
  }

  if (value.length < 8) {
    showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
    return false;
  }

  const hasNumber = /\d/.test(value);
  const hasLetter = /[a-zA-Z]/.test(value);

  if (!hasNumber || !hasLetter) {
    showError(passwordInput, passwordError, 'Password must include letters and numbers.');
    return false;
  }

  showValid(passwordInput, passwordError);
  return true;
}

function validateConfirmPassword() {
  const value = confirmPasswordInput.value;

  if (value === '') {
    showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
    return false;
  }

  if (value !== passwordInput.value) {
    showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
    return false;
  }

  showValid(confirmPasswordInput, confirmPasswordError);
  return true;
}

// Step 5: Validate live as the user types (better user experience)
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Step 6: Validate everything again on submit, and block submission if anything fails
form.addEventListener('submit', function (e) {
  e.preventDefault();

  successMessage.textContent = '';

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  if (isFormValid) {
    successMessage.textContent = 'Account created successfully!';
    form.reset();

    // remove the valid/invalid styling after reset
    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(function (input) {
      input.classList.remove('valid', 'invalid');
    });
  }
});