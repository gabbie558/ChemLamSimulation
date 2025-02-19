document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("helpModal");
    const btn = document.getElementById("helpButton");
    const closeBtn = document.querySelector(".close");


     modal.style.display = "flex";


    // Open Modal
    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close Modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
