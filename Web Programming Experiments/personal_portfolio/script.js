// Button click alert
document.getElementById("alertBtn").addEventListener("click", function () {
    alert("Thank you for visiting!");
});

// Contact form submission message
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("message").innerText =
        "Your message has been submitted successfully.";
});
