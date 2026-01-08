export type AnimateOnScrollOptions = {
  /** Limit the search to a section/container (recommended if you call it in multiple sections) */
  scopeSelector?: string;

  /** Selector for animatable elements within the scope */
  selector?: string; // default: [data-animate]

  /** If true, only animate once */
  once?: boolean; // default: true

  /** Observer options */
  threshold?: number; // default: 0.15
  rootMargin?: string; // default: 0px 0px -10% 0px
};

export function initAnimateOnScroll(options: AnimateOnScrollOptions = {}) {
  const {
    scopeSelector,
    selector = "[data-animate]",
    once = true,
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
  } = options;

  // Respect reduced motion
  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const scope: ParentNode =
    (scopeSelector ? document.querySelector(scopeSelector) : null) ?? document;

  const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));
  if (!elements.length) return;

  if (prefersReduced) {
    elements.forEach((el) => el.classList.remove("opacity-0"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = entry.target as HTMLElement;

        const animationClass = el.getAttribute("data-animate");
        const delayRaw = el.getAttribute("data-delay");
        const delayMs = delayRaw ? Number.parseInt(delayRaw, 10) : NaN;

        if (Number.isFinite(delayMs)) el.style.animationDelay = `${delayMs}ms`;
        el.style.animationFillMode = "both";

        if (animationClass) el.classList.add(animationClass);
        el.classList.remove("opacity-0");

        if (once) io.unobserve(el);
      }
    },
    { threshold, rootMargin }
  );

  elements.forEach((el) => io.observe(el));
}