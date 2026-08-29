// Elements
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");

const loginPassword = document.getElementById("loginPassword");
const loginPasswordButton = document.getElementById("loginPasswordButton");

const registerPassword = document.getElementById("registerPassword");
const registerPasswordButton = document.getElementById("registerPasswordButton");

const confirmPassword = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");


// Switch
showRegister.addEventListener("click", function () {

    loginSection.classList.remove("active");
    registerSection.classList.add("active");

    authTitle.textContent = "Create Account";

    authDescription.textContent =
        "Create your account to get started.";

});


showLogin.addEventListener("click", function () {

    registerSection.classList.remove("active");
    loginSection.classList.add("active");

    authTitle.textContent = "Welcome Back";

    authDescription.textContent =
        "Sign in to continue to your account.";

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

    togglePassword(
        loginPassword,
        loginPasswordButton
    );

});


registerPasswordButton.addEventListener("click", function () {

    togglePassword(
        registerPassword,
        registerPasswordButton
    );

});


// Confirm password
confirmPassword.addEventListener("input", function () {

    if (confirmPassword.value === "") {

        passwordMessage.textContent = "";

        return;

    }

    if (
        registerPassword.value ===
        confirmPassword.value
    ) {

        passwordMessage.textContent =
            "Passwords match";

        passwordMessage.className =
            "text-success";

    } else {

        passwordMessage.textContent =
            "Passwords do not match";

        passwordMessage.className =
            "text-danger";

    }

});