// Elements
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginPasswordButton = document.getElementById("loginPasswordButton");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const loginMessage = document.getElementById("loginMessage");

const registerForm = document.getElementById("registerForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerPasswordButton = document.getElementById("registerPasswordButton");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const registerEmailError = document.getElementById("registerEmailError");
const registerPasswordError = document.getElementById("registerPasswordError");
const passwordMessage = document.getElementById("passwordMessage");
const termsError = document.getElementById("termsError");
const registerMessage = document.getElementById("registerMessage");

// Switch
showRegister.addEventListener("click", function () {
    clearLoginErrors();

    loginSection.classList.remove("active");
    registerSection.classList.add("active");

    authTitle.textContent = "Create Account";
    authDescription.textContent = "Create your account to get started.";
});

showLogin.addEventListener("click", function () {
    clearRegisterErrors();

    registerSection.classList.remove("active");
    loginSection.classList.add("active");

    authTitle.textContent = "Welcome Back";
    authDescription.textContent = "Sign in to continue to your account.";
});

// Password
function togglePassword(input, button) {
    const icon = button.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}

loginPasswordButton.addEventListener("click", function () {
    togglePassword(loginPassword, loginPasswordButton);
});

registerPasswordButton.addEventListener("click", function () {
    togglePassword(registerPassword, registerPasswordButton);
});

// Validation
function showError(input, errorElement, message) {
    input.classList.add("is-invalid");
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.classList.remove("is-invalid");
    errorElement.textContent = "";
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = "form-message " + type;
}

function clearLoginErrors() {
    clearError(loginEmail, loginEmailError);
    clearError(loginPassword, loginPasswordError);

    loginMessage.textContent = "";
    loginMessage.className = "form-message";
}

function clearRegisterErrors() {
    clearError(firstName, firstNameError);
    clearError(lastName, lastNameError);
    clearError(registerEmail, registerEmailError);
    clearError(registerPassword, registerPasswordError);
    clearError(confirmPassword, passwordMessage);

    terms.classList.remove("is-invalid");

    termsError.textContent = "";
    registerMessage.textContent = "";
    registerMessage.className = "form-message";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Live validation
firstName.addEventListener("input", function () {
    if (firstName.value.trim() !== "") {
        clearError(firstName, firstNameError);
    }
});

lastName.addEventListener("input", function () {
    if (lastName.value.trim() !== "") {
        clearError(lastName, lastNameError);
    }
});

registerEmail.addEventListener("input", function () {
    if (isValidEmail(registerEmail.value.trim())) {
        clearError(registerEmail, registerEmailError);
    }
});

registerPassword.addEventListener("input", function () {
    if (registerPassword.value.length >= 8) {
        clearError(registerPassword, registerPasswordError);
    }

    validateConfirmPassword();
});

confirmPassword.addEventListener("input", validateConfirmPassword);

function validateConfirmPassword() {
    if (confirmPassword.value === "") {
        clearError(confirmPassword, passwordMessage);
        return;
    }

    if (registerPassword.value === confirmPassword.value) {
        clearError(confirmPassword, passwordMessage);
        passwordMessage.textContent = "Passwords match";
        passwordMessage.className = "field-success";
    } else {
        showError(
            confirmPassword,
            passwordMessage,
            "Passwords do not match"
        );
    }
}

terms.addEventListener("change", function () {
    if (terms.checked) {
        terms.classList.remove("is-invalid");
        termsError.textContent = "";
    }
});

loginEmail.addEventListener("input", function () {
    if (isValidEmail(loginEmail.value.trim())) {
        clearError(loginEmail, loginEmailError);
    }

    loginMessage.textContent = "";
});

loginPassword.addEventListener("input", function () {
    if (loginPassword.value !== "") {
        clearError(loginPassword, loginPasswordError);
    }

    loginMessage.textContent = "";
});

// Register
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearRegisterErrors();

    let valid = true;

    if (firstName.value.trim() === "") {
        showError(firstName, firstNameError, "First name is required");
        valid = false;
    }

    if (lastName.value.trim() === "") {
        showError(lastName, lastNameError, "Last name is required");
        valid = false;
    }

    if (registerEmail.value.trim() === "") {
        showError(
            registerEmail,
            registerEmailError,
            "Email address is required"
        );

        valid = false;
    } else if (!isValidEmail(registerEmail.value.trim())) {
        showError(
            registerEmail,
            registerEmailError,
            "Enter a valid email address"
        );

        valid = false;
    }

    if (registerPassword.value === "") {
        showError(
            registerPassword,
            registerPasswordError,
            "Password is required"
        );

        valid = false;
    } else if (registerPassword.value.length < 8) {
        showError(
            registerPassword,
            registerPasswordError,
            "Password must be at least 8 characters"
        );

        valid = false;
    }

    if (confirmPassword.value === "") {
        showError(
            confirmPassword,
            passwordMessage,
            "Please confirm your password"
        );

        valid = false;
    } else if (registerPassword.value !== confirmPassword.value) {
        showError(
            confirmPassword,
            passwordMessage,
            "Passwords do not match"
        );

        valid = false;
    }

    if (!terms.checked) {
        terms.classList.add("is-invalid");
        termsError.textContent = "You must agree to the Terms and Conditions";
        valid = false;
    }

    if (!valid) {
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName.value.trim(),
                    lastName: lastName.value.trim(),
                    email: registerEmail.value.trim(),
                    password: registerPassword.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            if (data.message === "Email already registered") {
                showError(
                    registerEmail,
                    registerEmailError,
                    "Email is already registered"
                );
            } else {
                showMessage(
                    registerMessage,
                    data.message || "Registration failed",
                    "error"
                );
            }

            return;
        }

        const registeredEmail = data.email;

        registerForm.reset();
        clearRegisterErrors();

        registerSection.classList.remove("active");
        loginSection.classList.add("active");

        authTitle.textContent = "Welcome Back";
        authDescription.textContent = "Sign in to continue to your account.";

        loginEmail.value = registeredEmail;

        showMessage(
            loginMessage,
            "Account created successfully. You can now sign in.",
            "success"
        );
    } catch (error) {
        showMessage(
            registerMessage,
            "Cannot connect to the server",
            "error"
        );
    }
});

// Login
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearLoginErrors();

    let valid = true;

    if (loginEmail.value.trim() === "") {
        showError(
            loginEmail,
            loginEmailError,
            "Email address is required"
        );

        valid = false;
    } else if (!isValidEmail(loginEmail.value.trim())) {
        showError(
            loginEmail,
            loginEmailError,
            "Enter a valid email address"
        );

        valid = false;
    }

    if (loginPassword.value === "") {
        showError(
            loginPassword,
            loginPasswordError,
            "Password is required"
        );

        valid = false;
    }

    if (!valid) {
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginEmail.value.trim(),
                    password: loginPassword.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            showMessage(
                loginMessage,
                data.message || "Invalid email or password",
                "error"
            );

            loginPassword.classList.add("is-invalid");

            return;
        }

        showMessage(
            loginMessage,
            "Login successful",
            "success"
        );
    } catch (error) {
        showMessage(
            loginMessage,
            "Cannot connect to the server",
            "error"
        );
    }
});