document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("helpModal");
    const btn = document.getElementById("helpButton");
    const closeBtn = document.querySelector(".close");
    const skipBtn = document.getElementById("skipButton");

    // Check if the user has skipped the instructions before
    if (!localStorage.getItem("modalSkipped")) {
        modal.style.display = "flex";
    }

    // Open Modal
    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close Modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Skip Button (Close modal & prevent future appearance)
    skipBtn.addEventListener("click", function () {
        modal.style.display = "none";
        localStorage.setItem("modalSkipped", "true");
    });

    // Close when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
