/* AUREVIA — interacciones. Regla del brief: una sola capa animada de fondo,
   lenta, opacidad baja, y todo respeta prefers-reduced-motion. */

(function () {
  "use strict";

  /* activar estilos de reveal solo si hay JS (sin JS todo queda visible) */
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ── Nav: borde al hacer scroll + menú móvil ── */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  function closeMenu() {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && links.classList.contains("open")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ── Reveal on scroll ── */
  var groups = document.querySelectorAll(".reveal-group");
  groups.forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    groups.forEach(function (g) { io.observe(g); });
  } else {
    groups.forEach(function (g) { g.classList.add("in"); });
  }

  /* ── Malla de nodos (hero) ── */
  var canvas = document.getElementById("mesh");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var raf = null;
  var nodes = [];
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var LINK_DIST = 150;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    var oldW = canvas.width, oldH = canvas.height;
    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;
    var count = Math.min(70, Math.floor(rect.width / 18));

    /* reescalar posiciones existentes en vez de regenerar: sin salto visual */
    if (oldW && oldH && nodes.length) {
      var sx = canvas.width / oldW, sy = canvas.height / oldH;
      nodes.forEach(function (n) { n.x *= sx; n.y *= sy; });
    }
    while (nodes.length > count) nodes.pop();
    while (nodes.length < count) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.12 * DPR,   /* movimiento lento y constante */
        vy: (Math.random() - 0.5) * 0.12 * DPR,
        r: (Math.random() * 1.2 + 0.6) * DPR
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var maxD = LINK_DIST * DPR;

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }

    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          var alpha = (1 - d / maxD) * 0.16;   /* opacidad 12–20% máx. */
          ctx.strokeStyle = "rgba(61, 127, 255, " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }

    for (var c = 0; c < nodes.length; c++) {
      ctx.fillStyle = "rgba(139, 92, 246, 0.5)";
      ctx.beginPath();
      ctx.arc(nodes[c].x, nodes[c].y, nodes[c].r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (raf || reduceMotion.matches) return;
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  function drawStatic() {
    /* con reduce-motion: un solo frame estático, sin animación */
    resize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tickOnce();
  }
  function tickOnce() {
    var maxD = LINK_DIST * DPR;
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.strokeStyle = "rgba(61, 127, 255, " + ((1 - d / maxD) * 0.16).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }
    for (var c = 0; c < nodes.length; c++) {
      ctx.fillStyle = "rgba(139, 92, 246, 0.5)";
      ctx.beginPath();
      ctx.arc(nodes[c].x, nodes[c].y, nodes[c].r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      if (reduceMotion.matches) drawStatic();
    }, 150);
  });

  /* pausar cuando la pestaña no está visible */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  reduceMotion.addEventListener("change", function () {
    if (reduceMotion.matches) { stop(); drawStatic(); }
    else { resize(); start(); }
  });

  resize();
  if (reduceMotion.matches) drawStatic(); else start();
})();
