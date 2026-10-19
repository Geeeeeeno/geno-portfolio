(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sky canvas ---------- */
  const canvas = document.getElementById("sky-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  let stars = [];
  let particles = [];
  let rafId = 0;
  let running = false;
  let dpr = 1;
  let w = 0;
  let h = 0;

  function particleCount() {
    const area = w * h;
    if (area < 400000) return 18;
    if (area < 900000) return 28;
    return 40;
  }

  function starCount() {
    const area = w * h;
    if (area < 400000) return 60;
    if (area < 900000) return 100;
    return 140;
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = Array.from({ length: starCount() }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.7 + 0.2,
      tw: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.02 + 0.008,
    }));

    particles = Array.from({ length: particleCount() }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * 0.35 + 0.1,
      hue: Math.random() > 0.5 ? 320 : 185,
    }));
  }

  function drawSky(t) {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.tw += s.sp;
      const alpha = s.a * (0.55 + 0.45 * Math.sin(s.tw));
      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 234, 240, ${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${p.a})`);
      g.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`);
      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = requestAnimationFrame(drawSky);
  }

  function startSky() {
    if (running || reduceMotion || !ctx) return;
    running = true;
    rafId = requestAnimationFrame(drawSky);
  }

  function stopSky() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  if (canvas && ctx && !reduceMotion) {
    resizeCanvas();
    startSky();
    window.addEventListener("resize", () => {
      resizeCanvas();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopSky();
      else startSky();
    });
  } else if (canvas && ctx && reduceMotion) {
    resizeCanvas();
    // Static star field
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 234, 240, ${s.a})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById("cursor-glow");
  if (glow && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let gx = 0;
    let gy = 0;
    let tx = 0;
    let ty = 0;
    let glowRaf = 0;

    function tickGlow() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      glowRaf = requestAnimationFrame(tickGlow);
    }

    window.addEventListener("pointermove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.classList.add("is-active");
      if (!glowRaf) glowRaf = requestAnimationFrame(tickGlow);
    });

    window.addEventListener("pointerleave", () => {
      glow.classList.remove("is-active");
    });
  }

  /* ---------- Header scroll ---------- */
  const header = document.getElementById("site-header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navMobile = document.getElementById("nav-mobile");

  function closeMenu() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    navMobile.hidden = true;
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "メニューを閉じる");
    navMobile.hidden = false;
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      if (open) closeMenu();
      else openMenu();
    });

    navMobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  /* ---------- Nav highlight ---------- */
  const sections = ["about", "works", "gallery", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll("[data-nav]");

  function updateNav() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = "";
    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec.id;
    }
    navLinks.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("data-nav") === current);
    });
  }
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  /* ---------- Hero + scroll reveal ---------- */
  const heroEls = document.querySelectorAll(".reveal-hero");
  if (reduceMotion) {
    heroEls.forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  } else {
    requestAnimationFrame(() => {
      heroEls.forEach((el) => el.classList.add("is-visible"));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- 3D tilt on featured cards ---------- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 10;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const galleryItems = Array.from(document.querySelectorAll(".masonry-item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const btnPrev = lightbox && lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox && lightbox.querySelector(".lightbox-next");
  let lbIndex = 0;
  let lastFocus = null;

  const galleryData = galleryItems.map((btn) => {
    const img = btn.querySelector("img");
    return {
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || "",
      width: img.getAttribute("width"),
      height: img.getAttribute("height"),
    };
  });

  function showLightbox(index) {
    if (!lightbox || !lightboxImg || !galleryData.length) return;
    lbIndex = (index + galleryData.length) % galleryData.length;
    const item = galleryData[lbIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (item.width) lightboxImg.width = Number(item.width);
    if (item.height) lightboxImg.height = Number(item.height);
    if (lightboxCaption) lightboxCaption.textContent = item.alt;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lightboxImg) lightboxImg.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  galleryItems.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      lastFocus = btn;
      showLightbox(i);
    });
  });

  if (lightbox) {
    lightbox.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeLightbox);
    });
    if (btnPrev) btnPrev.addEventListener("click", () => showLightbox(lbIndex - 1));
    if (btnNext) btnNext.addEventListener("click", () => showLightbox(lbIndex + 1));

    window.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
      if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
    });

    // Focus trap
    lightbox.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || lightbox.hidden) return;
      const focusables = lightbox.querySelectorAll(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
})();
