
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


/* =====================================
   VANTAGE X — LIVE PUBLIC PROJECTS
===================================== */

async function loadPublicProjects() {
  const container = document.getElementById("publicProjects");

  if (!container) return;

  const supabaseUrl =
    "https://hwpxxbscoscumkmoqjgs.supabase.co";

  const publishableKey =
    "sb_publishable_AO9n1jSq-xCpG21VhpzWkQ_n4zNpMuv";

  container.textContent = "Loading projects...";

  try {
    const response = await fetch(
      supabaseUrl +
      "/rest/v1/projects?select=id,project_name,description,location,category,status,price,cover_image&is_published=eq.true&order=created_at.desc",
      {
        headers: {
          apikey: publishableKey,
          Authorization: "Bearer " + publishableKey
        }
      }
    );

    if (!response.ok) {
      throw new Error("Unable to retrieve projects.");
    }

    const projects = await response.json();

    container.innerHTML = "";

    if (!projects.length) {
      container.textContent =
        "No published projects are available at the moment.";
      return;
    }

    projects.forEach(function(project) {
      const card = document.createElement("article");
      card.className = "property-card";

      const image = document.createElement("img");
      image.alt = project.project_name || "VANTAGE X project";
      image.style.width = "100%";
      image.style.height = "220px";
      image.style.objectFit = "cover";

      if (project.cover_image) {
        image.src = project.cover_image;
      }

      const info = document.createElement("div");
      info.className = "property-info";

      const category = document.createElement("span");
      category.className = "service-number";
      category.textContent =
        (project.category || "PROPERTY") +
        " / " +
        (project.status || "AVAILABLE");

      const title = document.createElement("h3");
      title.textContent = project.project_name;

      const description = document.createElement("p");
      description.textContent =
        project.description || "Contact us for more information.";

      const location = document.createElement("p");
      location.textContent =
        "Location: " + (project.location || "Contact us");

      const enquiry = document.createElement("a");
      enquiry.className = "service-link";
      enquiry.href =
        "https://wa.me/2347084125531?text=" +
        encodeURIComponent(
          "Hello VANTAGE X GROUP LTD. I am interested in " +
          project.project_name
        );

      enquiry.target = "_blank";
      enquiry.rel = "noopener noreferrer";
      enquiry.textContent = "ENQUIRE ON WHATSAPP →";

      info.append(
        category,
        title,
        description,
        location
      );

      if (project.price) {
        const price = document.createElement("p");
        price.textContent = "Price: " + project.price;
        info.appendChild(price);
      }

      const viewProject = document.createElement("a");

viewProject.className = "service-link";
viewProject.href =
  "project.html?id=" + encodeURIComponent(project.id);

viewProject.textContent = "VIEW PROJECT DETAILS →";
      viewProject.style.display = "block";
viewProject.style.position = "relative";
viewProject.style.zIndex = "2";
viewProject.style.marginTop = "15px";
viewProject.style.padding = "12px 0";

enquiry.style.display = "block";
enquiry.style.position = "relative";
enquiry.style.zIndex = "2";
enquiry.style.marginTop = "10px";
enquiry.style.padding = "12px 0";

info.appendChild(viewProject);
info.appendChild(enquiry);

card.append(image, info);

card.style.position = "relative";
card.style.overflow = "visible";

image.style.display = "block";
image.style.position = "relative";
image.style.zIndex = "1";

info.style.position = "relative";
info.style.zIndex = "2";

container.appendChild(card);
  } catch (error) {
    console.error("Public projects error:", error);

    container.textContent =
      "Our projects could not be loaded. Please try again later.";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPublicProjects);
} else {
  loadPublicProjects();
}
