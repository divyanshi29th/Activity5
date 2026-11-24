// Activity 5: JavaScript Basics and User Interaction

let toastTimer;

/**
 * Reusable toast notification function.
 * Displays a temporary message in the toast banner.
 */
function showToast(message, duration = 3000) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, duration);
}

/**
 * Smoothly scrolls to a target section by ID.
 */
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-btn");
    const matchSelect = document.getElementById("match");
    const teamFilter = document.getElementById("team-filter");
    const bookingForm = document.getElementById("booking-form");
    const bookingsBody = document.getElementById("bookings-body");
    const emptyRow = document.getElementById("empty-bookings-row");
    let bookingCounter = 1001;

    // Smooth scroll from Match Schedule "Book" buttons to booking form + show toast
    bookButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedMatch = button.getAttribute("data-match");

            if (matchSelect && selectedMatch) {
                matchSelect.value = selectedMatch;
            }

            scrollToSection("booking");
            showToast("Match selected: " + selectedMatch + ". Please complete your booking!");
        });
    });

    // Smooth scroll for hero buttons
    document.querySelectorAll(".nav-scroll").forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href").replace("#", "");
            if (targetId) {
                event.preventDefault();
                scrollToSection(targetId);
            }
        });
    });

    // Filter match schedule rows by selected team
    if (teamFilter) {
        teamFilter.addEventListener("change", function () {
            const selectedTeam = teamFilter.value;
            const rows = document.querySelectorAll("#matches tbody tr");

            rows.forEach(function (row) {
                const teams = row.getAttribute("data-teams") || "";
                if (selectedTeam === "all" || teams.includes(selectedTeam)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });

            showToast(
                selectedTeam === "all"
                    ? "Showing all IPL matches."
                    : "Filtered matches for " + selectedTeam + "."
            );
        });
    }

    // Handle booking form submission with toast notification and table update
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const match = matchSelect.value;
            const stand = document.getElementById("stand").value;
            const tickets = document.getElementById("tickets").value;

            if (emptyRow) {
                emptyRow.remove();
            }

            const newRow = document.createElement("tr");
            const values = ["IPL-" + bookingCounter++, match, stand, tickets];
            values.forEach(function (val) {
                const cell = document.createElement("td");
                cell.textContent = val;
                newRow.appendChild(cell);
            });
            bookingsBody.appendChild(newRow);

            showToast("Booking confirmed for " + name + " (" + tickets + " " + stand + " ticket(s))!");
            bookingForm.reset();
        });
    }
});
