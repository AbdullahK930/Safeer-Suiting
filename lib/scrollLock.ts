// `overflow:hidden` on <body> alone does NOT reliably block touch/rubber-band
// scrolling on iOS Safari — the page can still drift underneath a "closed"
// fixed overlay (mobile menu, loader, modal), which is what was causing
// content to visibly bleed through those overlays. Locking via `position:fixed`
// on the body (restoring the exact scroll offset on unlock) is the standard
// cross-browser-safe fix. We also pause Lenis so its own momentum can't
// keep nudging the page while locked.

let lockCount = 0;
let savedScrollY = 0;

export function lockScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    window.__lenis?.stop();
  }
  lockCount++;
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    window.scrollTo(0, savedScrollY);

    // Lenis caches the page's scrollable height; while body was
    // position:fixed that height was effectively collapsed, so Lenis's own
    // scrollTo (and its ongoing rAF loop once restarted) was clamping any
    // target against that stale, too-short height and dragging the page
    // back to a shorter position. Forcing a resize recalculates it against
    // the now-restored normal layout before Lenis resumes driving scroll.
    if (window.__lenis) {
      window.__lenis.resize();
      window.__lenis.scrollTo(savedScrollY, { immediate: true, force: true });
      window.__lenis.start();
    }
  }
}
