// Moveable background (parallax) + footer year
(() => {
  const bg = document.getElementById("bg");
  const yearEl = document.getElementById("year");
  const scrollEl = document.getElementById("scroll"); // actual scroller

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (!bg) return;

  let curX = 0;
  let curY = 0;

  // base targets from mouse
  let mouseX = 0;
  let mouseY = 0;

  // scroll contribution (computed, not accumulated)
  let scrollY = 0;

  const setVars = () => {
    const combinedX = mouseX;
    const combinedY = mouseY + scrollY;

    // smooth interpolation
    curX += (combinedX - curX) * 0.10;
    curY += (combinedY - curY) * 0.10;

    // subtle movement
    bg.style.setProperty("--bgx", `${curX}px`);
    bg.style.setProperty("--bgy", `${curY}px`);

    requestAnimationFrame(setVars);
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy;

      // movement range
      mouseX = dx * 18;
      mouseY = dy * 18;
    },
    { passive: true }
  );

  // listen to the real scrolling container
  if (scrollEl) {
    scrollEl.addEventListener(
      "scroll",
      () => {
        // tweak 0.01 to taste
        scrollY = (scrollEl.scrollTop || 0) * -0.01;
      },
      { passive: true }
    );
  }

  setVars();
})();
