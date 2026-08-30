// Elements
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginPasswordButton = document.getElementById("loginPasswordButton");

const registerFirstName = document.getElementById("registerFirstName");
const registerLastName = document.getElementById("registerLastName");
const registerEmail = document.getElementById("registerEmail");

const registerPassword = document.getElementById("registerPassword");
const registerPasswordButton = document.getElementById("registerPasswordButton");

const confirmPassword = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Switch
showRegister.addEventListener("click", function () {
    loginSection.classList.remove("active");
    registerSection.classList.add("active");

    authTitle.textContent = "Create Account";
    authDescription.textContent = "Create your account to get started.";
});

showLogin.addEventListener("click", function () {
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

// Confirm password
confirmPassword.addEventListener("input", function () {
    if (confirmPassword.value === "") {
        passwordMessage.textContent = "";
        return;
    }

    if (registerPassword.value === confirmPassword.value) {
        passwordMessage.textContent = "Passwords match";
        passwordMessage.className = "text-success";
    } else {
        passwordMessage.textContent = "Passwords do not match";
        passwordMessage.className = "text-danger";
    }
});

// Register
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (registerPassword.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: registerFirstName.value.trim(),
                lastName: registerLastName.value.trim(),
                email: registerEmail.value.trim(),
                password: registerPassword.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        registerForm.reset();
        passwordMessage.textContent = "";

        registerSection.classList.remove("active");
        loginSection.classList.add("active");

        authTitle.textContent = "Welcome Back";
        authDescription.textContent = "Sign in to continue to your account.";
    } catch (error) {
        alert("Cannot connect to the server");
    }
});

// Login
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginEmail.value.trim(),
                password: loginPassword.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);
    } catch (error) {
        alert("Cannot connect to the server");
    }
});