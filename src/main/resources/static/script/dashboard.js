// Elements
const userEmail = document.getElementById("userEmail");
const logoutButton = document.getElementById("logoutButton");

// Check session
async function checkUser() {
    try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
            window.location.href = "/";
            return;
        }

        const data = await response.json();

        userEmail.textContent = data.email;
    } catch (error) {
        window.location.href = "/";
    }
}

checkUser();

// Logout
logoutButton.addEventListener("click", async function () {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "POST"
        });

        if (response.ok) {
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Logout failed.");
    }
});