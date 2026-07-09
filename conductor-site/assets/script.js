/* ============================================================
   THE CONDUCTOR BARBERSHOP — shared script
   Handles: mobile nav drawer, booking modal, sticky book bar,
   active nav highlight, footer year, reveal-on-scroll.
   ------------------------------------------------------------
   TO EDIT BOOKING LINKS: change the URLs in BOOKING below.
   ============================================================ */
(function () {
  "use strict";

  /* ---- EDIT ME: Fresha booking links per shop ---- */
  var BOOKING = [
    { name: "Highett",  addr: "276 Highett Road, VIC 3190", url: "https://www.fresha.com/en-GB/a/the-conductor-barbershop-highett-highett-276-highett-road-khoqz62w" },
    { name: "Carnegie", addr: "418 Neerim Rd, VIC 3163",    url: "https://www.fresha.com/en-GB/a/the-conductor-barbershop-carnegie-carnegie-418-neerim-road-ucweetrc" },
    { name: "Richmond", addr: "264 Swan Street, VIC 3121",   url: "https://www.fresha.com/en-GB/a/the-conductor-richmond-richmond-264-swan-st-gpm0kkth" }
  ];

  var d = document;
  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- footer year ---------- */
  var yr = d.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- mobile drawer ---------- */
  var drawer = d.getElementById("drawer");
  var burger = d.getElementById("burger");
  if (burger && drawer) {
    burger.addEventListener("click", function () { drawer.classList.add("open"); });
    var dc = d.getElementById("drawerClose");
    if (dc) dc.addEventListener("click", function () { drawer.classList.remove("open"); });
    Array.prototype.forEach.call(drawer.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });
  }

  /* ---------- build booking modal ---------- */
  var modal = d.createElement("div");
  modal.className = "modal";
  modal.setAttribute("aria-hidden", "true");
  var choices = BOOKING.map(function (b) {
    return '<a href="' + b.url + '" target="_blank" rel="noopener">' +
             '<span><span class="lc-n">' + b.name + '</span><span class="lc-a">' + b.addr + '</span></span>' +
             arrow +
           '</a>';
  }).join("");
  modal.innerHTML =
    '<div class="modal-card" role="dialog" aria-modal="true" aria-label="Choose a location to book">' +
      '<button class="modal-close" aria-label="Close">&times;</button>' +
      '<span class="eyebrow">Book online · Fresha</span>' +
      '<h3 style="margin-top:10px">Choose your shop</h3>' +
      '<p class="lead">Pick the location that suits you — you\'ll be taken to Fresha to lock in a time.</p>' +
      '<div class="loc-choice">' + choices + '</div>' +
    '</div>';
  d.body.appendChild(modal);

  function openModal() { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); d.body.style.overflow = "hidden"; }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); d.body.style.overflow = ""; }
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  Array.prototype.forEach.call(modal.querySelectorAll("a"), function (a) {
    a.addEventListener("click", function () { setTimeout(closeModal, 120); });
  });

  /* any element with data-book opens the modal */
  Array.prototype.forEach.call(d.querySelectorAll("[data-book]"), function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); openModal(); });
  });

  /* ---------- sticky mobile book bar ---------- */
  var bar = d.createElement("div");
  bar.className = "book-bar";
  bar.innerHTML =
    '<div class="lbl">Ready for a fresh cut?<b>Book in under a minute</b></div>' +
    '<button class="btn btn--light" data-book>Book Now</button>';
  d.body.appendChild(bar);
  bar.querySelector("[data-book]").addEventListener("click", function (e) { e.preventDefault(); openModal(); });

  function onScroll() {
    var y = window.pageYOffset || d.documentElement.scrollTop;
    bar.classList.toggle("show", y > 560);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(d.querySelectorAll(".reveal"), function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(d.querySelectorAll(".reveal"), function (el) { el.classList.add("in"); });
  }
})();
