// This script should be added to public/js/header.js and imported in index.html

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenuWrapper = document.querySelector(".mobile-menu-wrapper");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileBackdrop = document.querySelector(".mobile-backdrop");
  const mobileClose = document.querySelector(".mobile-close");
  const body = document.body;

  // Function to open mobile menu
  function openMobileMenu() {
    menuToggle.classList.add("active");
    mobileMenuWrapper.classList.add("active");
    body.classList.add("menu-open");
  }

  // Function to close mobile menu
  function closeMobileMenu() {
    menuToggle.classList.remove("active");
    mobileMenuWrapper.classList.remove("active");
    body.classList.remove("menu-open");
  }

  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (mobileMenuWrapper.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close menu when clicking backdrop
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", closeMobileMenu);
  }

  // Close menu when clicking close button
  if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileMenu);
  }

  // Mobile search functionality
  const searchToggle = document.querySelector(".search-toggle");
  const mobileSearch = document.querySelector(".mobile-search");

  if (searchToggle && mobileSearch) {
    searchToggle.addEventListener("click", function () {
      mobileSearch.classList.toggle("active");
    });
  }

  // Mobile dropdown functionality
  const hasChildren = document.querySelectorAll(
    ".has-children .mobile-nav-link"
  );

  if (hasChildren.length > 0) {
    hasChildren.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        // Toggle active class on parent
        const parent = this.parentNode;
        const submenu = parent.querySelector(".mobile-submenu");
        const icon = this.querySelector("i");

        // Close other open submenus
        document
          .querySelectorAll(".mobile-submenu.active")
          .forEach(function (menu) {
            if (menu !== submenu) {
              menu.classList.remove("active");
              const menuIcon = menu.previousElementSibling.querySelector("i");
              if (menuIcon) {
                menuIcon.classList.remove("fa-chevron-up");
                menuIcon.classList.add("fa-chevron-down");
              }
            }
          });

        // Toggle this submenu
        submenu.classList.toggle("active");

        // Toggle icon
        if (icon) {
          if (submenu.classList.contains("active")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
          } else {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          }
        }
      });
    });
  }

  // Close mobile menu when window is resized to desktop
  window.addEventListener("resize", function () {
    if (
      window.innerWidth > 992 &&
      mobileMenuWrapper &&
      mobileMenuWrapper.classList.contains("active")
    ) {
      closeMobileMenu();

      // Reset any open submenus
      document
        .querySelectorAll(".mobile-submenu.active")
        .forEach(function (menu) {
          menu.classList.remove("active");
          const icon = menu.previousElementSibling.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          }
        });
    }
  });

  // Prevent body scrolling when mobile menu is open
  document.addEventListener(
    "touchmove",
    function (e) {
      if (body.classList.contains("menu-open")) {
        // Allow scrolling within the mobile menu
        if (
          !mobileMenu.contains(e.target) &&
          !e.target.classList.contains("mobile-menu")
        ) {
          e.preventDefault();
        }
      }
    },
    { passive: false }
  );

  // Fix for iOS overscroll bug
  document.addEventListener(
    "touchstart",
    function (e) {
      if (body.classList.contains("menu-open")) {
        if (
          !mobileMenu.contains(e.target) &&
          !e.target.classList.contains("mobile-menu")
        ) {
          e.preventDefault();
        }
      }
    },
    { passive: false }
  );
});
// This script should be added to public/js/footer.js and imported in index.html