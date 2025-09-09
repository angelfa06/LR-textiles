
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // prevenir el envío
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // validación
    if (username === "johanafadel" && password === "JohanaFadel") {
        // redirige a la página admin
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
});

