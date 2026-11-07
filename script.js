
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  // Mobile navigation
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      navigation.classList.toggle("active");
    });

    // Close menu after selecting a link
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("active");
      });
    });
  }

  // Automatically update copyright year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal sections smoothly when scrolling
  const sections = document.querySelectorAll(
    ".section, .service-card, .property-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
