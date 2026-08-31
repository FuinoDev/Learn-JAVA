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
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const registerPasswordButton = document.getElementById("registerPasswordButton");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const registerEmailError = document.getElementById("registerEmailError");
const registerPasswordError = document.getElementById("registerPasswordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");
const registerMessage = document.getElementById("registerMessage");

// Switch
showRegister.addEventListener("click", function () {
    clearLoginFormErrors();

    loginSection.classList.remove("active");
    registerSection.classList.add("active");

    authTitle.textContent = "Create Account";
    authDescription.textContent = "Create your account to get started.";
});

showLogin.addEventListener("click", function () {
    clearRegisterFormErrors();

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
function showInputError(input, errorElement, message) {
    input.classList.add("invalid");
    errorElement.textContent = message;
}

function clearInputError(input, errorElement) {
    input.classList.remove("invalid");
    errorElement.textContent = "";
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = "form-message " + type;
}

function clearMessage(element) {
    element.textContent = "";
    element.className = "form-message";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearLoginFormErrors() {
    clearInputError(loginEmail, loginEmailError);
    clearInputError(loginPassword, loginPasswordError);

    clearMessage(loginMessage);
}

function clearRegisterFormErrors() {
    clearInputError(firstName, firstNameError);
    clearInputError(lastName, lastNameError);
    clearInputError(registerEmail, registerEmailError);
    clearInputError(registerPassword, registerPasswordError);
    clearInputError(confirmPassword, confirmPasswordError);

    terms.classList.remove("invalid");

    termsError.textContent = "";

    clearMessage(registerMessage);
}

// Login validation
function validateLoginForm() {
    let isValid = true;

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    clearLoginFormErrors();

    if (email === "") {
        showInputError(
            loginEmail,
            loginEmailError,
            "Email address is required."
        );

        isValid = false;
    } else if (!isValidEmail(email)) {
        showInputError(
            loginEmail,
            loginEmailError,
            "Enter a valid email address."
        );

        isValid = false;
    }

    if (password === "") {
        showInputError(
            loginPassword,
            loginPasswordError,
            "Password is required."
        );

        isValid = false;
    }

    return isValid;
}

// Register validation
function validateRegisterForm() {
    let isValid = true;

    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const confirmation = confirmPassword.value;

    clearRegisterFormErrors();

    if (firstNameValue === "") {
        showInputError(
            firstName,
            firstNameError,
            "First name is required."
        );

        isValid = false;
    } else if (firstNameValue.length < 2) {
        showInputError(
            firstName,
            firstNameError,
            "First name must have at least 2 characters."
        );

        isValid = false;
    }

    if (lastNameValue === "") {
        showInputError(
            lastName,
            lastNameError,
            "Last name is required."
        );

        isValid = false;
    } else if (lastNameValue.length < 2) {
        showInputError(
            lastName,
            lastNameError,
            "Last name must have at least 2 characters."
        );

        isValid = false;
    }

    if (email === "") {
        showInputError(
            registerEmail,
            registerEmailError,
            "Email address is required."
        );

        isValid = false;
    } else if (!isValidEmail(email)) {
        showInputError(
            registerEmail,
            registerEmailError,
            "Enter a valid email address."
        );

        isValid = false;
    }

    if (password === "") {
        showInputError(
            registerPassword,
            registerPasswordError,
            "Password is required."
        );

        isValid = false;
    } else if (password.length < 8) {
        showInputError(
            registerPassword,
            registerPasswordError,
            "Password must be at least 8 characters."
        );

        isValid = false;
    }

    if (confirmation === "") {
        showInputError(
            confirmPassword,
            confirmPasswordError,
            "Please confirm your password."
        );

        isValid = false;
    } else if (confirmation !== password) {
        showInputError(
            confirmPassword,
            confirmPasswordError,
            "Passwords do not match."
        );

        isValid = false;
    }

    if (!terms.checked) {
        terms.classList.add("invalid");

        termsError.textContent =
            "You must agree to the Terms and Conditions.";

        isValid = false;
    }

    return isValid;
}

// Login live validation
loginEmail.addEventListener("input", function () {
    clearMessage(loginMessage);

    const email = loginEmail.value.trim();

    if (email === "") {
        showInputError(
            loginEmail,
            loginEmailError,
            "Email address is required."
        );
    } else if (!isValidEmail(email)) {
        showInputError(
            loginEmail,
            loginEmailError,
            "Enter a valid email address."
        );
    } else {
        clearInputError(
            loginEmail,
            loginEmailError
        );
    }
});

loginPassword.addEventListener("input", function () {
    clearMessage(loginMessage);

    if (loginPassword.value === "") {
        showInputError(
            loginPassword,
            loginPasswordError,
            "Password is required."
        );
    } else {
        clearInputError(
            loginPassword,
            loginPasswordError
        );
    }
});

// Register live validation
firstName.addEventListener("input", function () {
    const value = firstName.value.trim();

    if (value === "") {
        showInputError(
            firstName,
            firstNameError,
            "First name is required."
        );
    } else if (value.length < 2) {
        showInputError(
            firstName,
            firstNameError,
            "First name must have at least 2 characters."
        );
    } else {
        clearInputError(
            firstName,
            firstNameError
        );
    }
});

lastName.addEventListener("input", function () {
    const value = lastName.value.trim();

    if (value === "") {
        showInputError(
            lastName,
            lastNameError,
            "Last name is required."
        );
    } else if (value.length < 2) {
        showInputError(
            lastName,
            lastNameError,
            "Last name must have at least 2 characters."
        );
    } else {
        clearInputError(
            lastName,
            lastNameError
        );
    }
});

registerEmail.addEventListener("input", function () {
    clearMessage(registerMessage);

    const email = registerEmail.value.trim();

    if (email === "") {
        showInputError(
            registerEmail,
            registerEmailError,
            "Email address is required."
        );
    } else if (!isValidEmail(email)) {
        showInputError(
            registerEmail,
            registerEmailError,
            "Enter a valid email address."
        );
    } else {
        clearInputError(
            registerEmail,
            registerEmailError
        );
    }
});

registerPassword.addEventListener("input", function () {
    clearMessage(registerMessage);

    const password = registerPassword.value;

    if (password === "") {
        showInputError(
            registerPassword,
            registerPasswordError,
            "Password is required."
        );
    } else if (password.length < 8) {
        showInputError(
            registerPassword,
            registerPasswordError,
            "Password must be at least 8 characters."
        );
    } else {
        clearInputError(
            registerPassword,
            registerPasswordError
        );
    }

    if (confirmPassword.value !== "") {
        if (confirmPassword.value !== password) {
            showInputError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );
        } else {
            clearInputError(
                confirmPassword,
                confirmPasswordError
            );

            confirmPasswordError.textContent = "Passwords match.";
            confirmPasswordError.className = "input-success";
        }
    }
});

confirmPassword.addEventListener("input", function () {
    const confirmation = confirmPassword.value;

    confirmPasswordError.className = "input-error";

    if (confirmation === "") {
        showInputError(
            confirmPassword,
            confirmPasswordError,
            "Please confirm your password."
        );
    } else if (confirmation !== registerPassword.value) {
        showInputError(
            confirmPassword,
            confirmPasswordError,
            "Passwords do not match."
        );
    } else {
        clearInputError(
            confirmPassword,
            confirmPasswordError
        );

        confirmPasswordError.textContent = "Passwords match.";
        confirmPasswordError.className = "input-success";
    }
});

terms.addEventListener("change", function () {
    if (!terms.checked) {
        terms.classList.add("invalid");

        termsError.textContent =
            "You must agree to the Terms and Conditions.";
    } else {
        terms.classList.remove("invalid");

        termsError.textContent = "";
    }
});

// Register
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validateRegisterForm()) {
        return;
    }

    try {
        const response = await fetch(
            "/api/auth/register",
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
                showInputError(
                    registerEmail,
                    registerEmailError,
                    "Email is already registered."
                );

                registerEmail.focus();
            } else {
                showMessage(
                    registerMessage,
                    data.message || "Registration failed.",
                    "error"
                );
            }

            return;
        }

        const registeredEmail = data.email;

        registerForm.reset();

        clearRegisterFormErrors();

        registerSection.classList.remove("active");
        loginSection.classList.add("active");

        authTitle.textContent = "Welcome Back";
        authDescription.textContent =
            "Sign in to continue to your account.";

        loginEmail.value = registeredEmail;

        showMessage(
            loginMessage,
            "Account created successfully. You can now sign in.",
            "success"
        );
    } catch (error) {
        showMessage(
            registerMessage,
            "Cannot connect to the server.",
            "error"
        );
    }
});

// Login
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validateLoginForm()) {
        return;
    }

    try {
        const response = await fetch(
            "/api/auth/login",
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
                data.message || "Invalid email or password.",
                "error"
            );

            loginPassword.classList.add("invalid");

            return;
        }

        showMessage(
            loginMessage,
            "Login successful.",
            "success"
        );

        window.location.href = "/dashboard.html";

    } catch (error) {
        showMessage(
            loginMessage,
            "Cannot connect to the server.",
            "error"
        );
    }
});