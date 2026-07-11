// PLS& — shared site behaviour
(function(){
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  if(navToggle && siteNav){
    navToggle.addEventListener("click", function(){
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      siteNav.classList.toggle("is-open", !open);
    });
    siteNav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      });
    });
  }

  /* Annotation layer toggle, persisted for this session */
  var ANNOT_KEY = "pls_annotations_visible";
  var annotState = sessionStorage.getItem(ANNOT_KEY);
  var showAnnotations = annotState === null ? true : annotState === "false";

  function applyAnnotState(){
    document.documentElement.classList.toggle("annotations-off", !showAnnotations);
    var btn = document.querySelector("[data-annot-toggle]");
    if(btn){ btn.textContent = showAnnotations ? "Hide annotations" : "Show annotations"; }
  }
  applyAnnotState();

  document.addEventListener("click", function(e){
    var btn = e.target.closest("[data-annot-toggle]");
    if(!btn) return;
    showAnnotations = !showAnnotations;
    sessionStorage.setItem(ANNOT_KEY, String(showAnnotations));
    applyAnnotState();
  });

  /* Gallery category filter */
  var galleries = document.querySelectorAll("[data-gallery]");
  galleries.forEach(function(gallery){
    var tabs = gallery.querySelectorAll("[data-filter]");
    var cards = gallery.querySelectorAll("[data-category]");
    var empty = gallery.querySelector(".gallery-empty");

    tabs.forEach(function(tab){
      tab.addEventListener("click", function(){
        tabs.forEach(function(t){ t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        var filter = tab.getAttribute("data-filter");
        var visibleCount = 0;
        cards.forEach(function(card){
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          card.style.display = match ? "" : "none";
          if(match) visibleCount++;
        });
        if(empty){ empty.classList.toggle("is-visible", visibleCount === 0); }
      });
    });
  });

  /* Project overlay (lightbox) */
  var overlay = document.querySelector("[data-overlay]");
  if(overlay){
    var overlayTitle = overlay.querySelector("[data-overlay-title]");
    var overlayBody = overlay.querySelector("[data-overlay-body]");
    var openers = document.querySelectorAll("[data-open-overlay]");
    var closeBtn = overlay.querySelector("[data-overlay-close]");
    var lastFocused = null;

    function openOverlay(trigger){
      lastFocused = trigger;
      var title = trigger.getAttribute("data-project-title") || "Project";
      overlayTitle.textContent = title;
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function closeOverlay(){
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      if(lastFocused){ lastFocused.focus(); }
    }
    openers.forEach(function(o){
      o.addEventListener("click", function(){ openOverlay(o); });
    });
    if(closeBtn){ closeBtn.addEventListener("click", closeOverlay); }
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && overlay.classList.contains("is-open")) closeOverlay();
    });
    overlay.addEventListener("click", function(e){
      if(e.target === overlay) closeOverlay();
    });

    var thumbs = overlay.querySelectorAll("[data-thumb]");
    thumbs.forEach(function(thumb){
      thumb.addEventListener("click", function(){
        thumbs.forEach(function(t){ t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });
  }

  /* Footer palette picker (design-notes page) */
  var footerPicker = document.querySelector("[data-footer-picker]");
  var demoFooter = document.querySelector("[data-demo-footer]");
  if(footerPicker && demoFooter){
    footerPicker.querySelectorAll("button").forEach(function(btn){
      btn.addEventListener("click", function(){
        footerPicker.querySelectorAll("button").forEach(function(b){ b.setAttribute("aria-pressed","false"); });
        btn.setAttribute("aria-pressed","true");
        demoFooter.className = "site-footer " + (btn.getAttribute("data-footer-class") || "");
      });
    });
  }

  /* Header goes solid/light depending on scroll, for pages with a dark hero */
  var header = document.querySelector(".site-header[data-light-on-dark]");
  if(header){
    var toggleHeader = function(){
      header.classList.toggle("is-light", window.scrollY < window.innerHeight * 0.8);
    };
    toggleHeader();
    window.addEventListener("scroll", toggleHeader, { passive: true });
  }
})();
