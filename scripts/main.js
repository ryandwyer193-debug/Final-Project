/* Digital Defense Limited - shared script
   Every feature checks that its elements exist, so the same file
   can be linked on all six pages without errors. */

document.addEventListener("DOMContentLoaded", function () {
  // Tells the CSS that JavaScript is running (used by the FAQ accordion)
  document.documentElement.classList.add("js");

  initMobileMenu();
  initFaqAccordion();
  initContactForm();
  initFooterYear();
});

/* 1. Mobile menu toggle */
function initMobileMenu() {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-links");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/* 2. FAQ accordion (dl.faq > dt > button, followed by dd) */
function initFaqAccordion() {
  var questions = document.querySelectorAll(".faq dt button");
  if (questions.length === 0) return;

  questions.forEach(function (button) {
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function () {
      var dt = button.parentElement;
      var isOpen = dt.classList.toggle("active");
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

/* 3. Contact form validation */
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.elements["name"];
    var email = form.elements["email"];
    var message = form.elements["message"];
    var valid = true;

    valid = checkField(name, name.value.trim().length >= 2,
      "Please enter your name (at least 2 characters).") && valid;

    valid = checkField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
      "Please enter a valid email address.") && valid;

    valid = checkField(message, message.value.trim().length >= 10,
      "Please enter a message (at least 10 characters).") && valid;

    if (valid) {
      status.textContent = "Thank you, " + name.value.trim() +
        ". Your message has been received and we will contact you soon.";
      status.className = "form-status success";
      form.reset();
    } else {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status error";
    }
  });
}

/* Shows or clears the error message next to a field */
function checkField(field, isValid, errorText) {
  var error = document.getElementById(field.id + "-error");
  if (error) {
    error.textContent = isValid ? "" : errorText;
  }
  field.classList.toggle("invalid", !isValid);
  return isValid;
}

/* 4. Footer year */
function initFooterYear() {
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}
