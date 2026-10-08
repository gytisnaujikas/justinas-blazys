const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});


/* =========================
   SCROLL ANIMATIONS
========================= */

const sections = document.querySelectorAll(
    ".intro, .about, .training, .approach, .element, .contact"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    observer.observe(section);
});

window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* =========================
   APPROACH MOBILE PROGRESS
========================= */

const approachSteps = document.querySelector(".approach-steps");
const approachItems = document.querySelectorAll(".approach-steps .step");

function updateApproachProgress() {
    if (window.innerWidth > 800 || !approachSteps || approachItems.length === 0) {
        return;
    }

    const firstStep = approachItems[0].getBoundingClientRect();
    const lastStep = approachItems[approachItems.length - 1].getBoundingClientRect();

    const firstCenter = firstStep.top + 30;
    const lastCenter = lastStep.top + 30;

    const viewportCenter = window.innerHeight / 2;

    const totalDistance = lastCenter - firstCenter;

    let progress =
        ((viewportCenter - firstCenter) / totalDistance) * 100;

    progress = Math.max(0, Math.min(100, progress));

    approachSteps.style.setProperty(
        "--approach-progress",
        `${progress}%`
    );

    approachItems.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepCenter = stepRect.top + 30;

        if (stepCenter <= viewportCenter) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", updateApproachProgress);
window.addEventListener("resize", updateApproachProgress);

updateApproachProgress();