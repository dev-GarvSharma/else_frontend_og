const activeLocks = new Set();
let previousOverflow = "";
let previousMarginRight = "";

export function lockBodyScroll(key) {
  if (activeLocks.has(key)) return;

  if (activeLocks.size === 0) {
    const body = document.body;
    previousOverflow = body.style.overflow;
    previousMarginRight = body.style.marginRight;
    const scrollbarWidth = Math.max(
      window.innerWidth - document.documentElement.clientWidth,
      0,
    );
    if (scrollbarWidth > 0) {
      const currentMargin = Number.parseFloat(getComputedStyle(body).marginRight) || 0;
      body.style.marginRight = `${currentMargin + scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
  }
  activeLocks.add(key);
}

export function unlockBodyScroll(key) {
  if (!activeLocks.delete(key) || activeLocks.size > 0) return;
  document.body.style.overflow = previousOverflow;
  document.body.style.marginRight = previousMarginRight;
  previousOverflow = "";
  previousMarginRight = "";
}
