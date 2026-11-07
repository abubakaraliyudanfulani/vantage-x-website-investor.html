// VANTAGE X GROUP LTD
// Website interactive functionality

document.addEventListener("DOMContentLoaded", () => {

    // 1. Automatically update copyright year
    const copyright = document.querySelector("footer p:last-child");

    if (copyright) {
        copyright.textContent =
            `© ${new Date().getFullYear()} VANTAGE X GROUP LTD. All rights reserved.`;
    }

    // 2. Prepare scroll animations
    const animatedElements = document.querySelectorAll(
        ".about, .services, .investment, .contact, .cards article"
    );

    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    // 3. Reveal sections when visitors scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 4. Highlight active navigation link
    const sections = document.querySelectorAll(
        "#home, #about, #services, #investment, #contact"
    );

    const navLinks = document.querySelectorAll("nav a");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    console.log("VANTAGE X website is running successfully.");

});
