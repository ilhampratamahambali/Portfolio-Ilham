const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

let currentSection = "home";

/* ================= PAGE TRANSITION ================= */

function showSection(id) {

    if (id === currentSection) return;

    const current = document.getElementById(currentSection);
    const next = document.getElementById(id);

    if (!current || !next) return;

    current.classList.remove("active-section");

    setTimeout(() => {
        next.classList.add("active-section");
    }, 80);

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
        }

    });

    currentSection = id;
}

/* ================= NAV CLICK ================= */

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);

        showSection(targetId);

    });

});

/* ================= LIMIT TEXT ================= */

function limitText(selector, maxLength) {

    document.querySelectorAll(selector).forEach(el => {

        const originalText = el.textContent.trim();

        /* simpan teks asli */
        el.dataset.fulltext = originalText;

        if (originalText.length > maxLength) {
            el.textContent = originalText.slice(0, maxLength) + "...";
        }

    });

}

/* ================= DEFAULT LOAD ================= */

window.addEventListener("DOMContentLoaded", () => {

    const home = document.getElementById("home");

    if (home) {
        home.classList.add("active-section");
    }

    limitText(".portfolio-content p", 500);

    document.addEventListener('DOMContentLoaded', () => {
        const logo = document.getElementById('logo');
        const homeSection = document.getElementById('home');

        if (window.location.hash === '#home' || homeSection.getBoundingClientRect().top === 0) {
            logo.style.display = 'none';
        } else {
            logo.style.display = 'block';
        }
    });
});

/* ================= CURSOR GLOW ================= */

const glow = document.createElement("div");
glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/* ================= MODAL FUNCTION ================= */

window.addEventListener("click", function(e) {

    const modal = document.getElementById("pdfModal");

    if (e.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        closeModal();
    }

});

function openModal(button, pdfFile, githubUrl) {

    const card = button.closest(".portfolio-card");

    const title = card.querySelector("h3").textContent;

    const descElement = card.querySelector("p");

    /* ambil teks asli */
    const description = descElement.dataset.fulltext || descElement.textContent;

    const modal = document.getElementById("pdfModal");
    const viewer = document.getElementById("pdfViewer");

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;

    document.getElementById("githubLink").href = githubUrl;
    document.getElementById("downloadLink").href = pdfFile;

    viewer.src = pdfFile;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {

    const modal = document.getElementById("pdfModal");
    const viewer = document.getElementById("pdfViewer");

    viewer.src = "";
    modal.style.display = "none";
    document.body.style.overflow = "auto";

}

/* ================= MODAL RESPONSIVENESS ================= */
window.addEventListener("resize", function () {
    const modal = document.getElementById("pdfModal");
    if (modal.style.display === "flex") {
        adjustModalSize();
    }
});

function adjustModalSize() {
    const modalContent = document.querySelector(".modal-content");
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 768) {
        modalContent.style.width = "95%";
        modalContent.style.height = "90%";
    } else {
        modalContent.style.width = "85%";
        modalContent.style.height = "85%";
    }
}

/* ================= MENU TOGGLE ================= */

function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

/* ================= LOGO VISIBILITY ================= */

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleLogoVisibility() {
        const currentHash = window.location.hash.replace('index.html', '').toLowerCase(); // Normalize hash

        // Check if the URL is root (index.html or no hash) or home section
        if (currentHash === '' || currentHash === '#home') {
            logo.style.display = 'none';
        } else {
            logo.style.display = 'block';
        }

        // Update active class on navbar links
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash || link.getAttribute('href') === window.location.hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function updateURL(hash) {
        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    }

    // Add click event to navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHash = link.getAttribute('href');
            updateURL(targetHash);
            toggleLogoVisibility();
        });
    });

    // Initial check
    toggleLogoVisibility();

    // Check on hash change
    window.addEventListener('hashchange', toggleLogoVisibility);

    // Check on page load to handle direct links
    window.addEventListener('load', toggleLogoVisibility);
});