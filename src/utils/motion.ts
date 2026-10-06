import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type Motion = { from: gsap.TweenVars; to: gsap.TweenVars };

const motions: Record<string, Motion> = {
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1, duration: 0.6, ease: "power1.out" },
  },
  rise: {
    from: { autoAlpha: 0, y: 24 },
    to: { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
  },
  lift: {
    from: { autoAlpha: 0, y: 10 },
    to: { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
  },
  drop: {
    from: { autoAlpha: 0, y: -14 },
    to: { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
  },
  slide: {
    from: { autoAlpha: 0, x: 28 },
    to: { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out" },
  },
  pop: {
    from: { autoAlpha: 0, scale: 0.4 },
    to: { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2.2)" },
  },
  spin: {
    from: { autoAlpha: 0, scale: 0.3, rotation: -30 },
    to: {
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.8)",
    },
  },
  grow: {
    from: { autoAlpha: 1, scaleY: 0, transformOrigin: "50% 100%" },
    to: { scaleY: 1, duration: 0.7, ease: "power3.out" },
  },
  draw: {
    from: { autoAlpha: 1, scaleY: 0, transformOrigin: "50% 0%" },
    to: { scaleY: 1, duration: 0.9, ease: "power2.out" },
  },
};

const splits = new Map<HTMLElement, SplitText>();
let width = window.innerWidth;

window.addEventListener("resize", () => {
  if (window.innerWidth === width) return;
  width = window.innerWidth;
  splits.forEach((split) => split.revert());
  splits.clear();
});

/** Elements a scope animates, in document order. */
export const parts = (scope: Element) =>
  Array.from(scope.querySelectorAll<HTMLElement>("[data-motion]"));

/** Split a heading into masked lines, reusing the split until the width changes. */
export function lines(element: HTMLElement) {
  let split = splits.get(element);
  if (!split) {
    split = SplitText.create(element, {
      type: "lines",
      mask: "lines",
      linesClass: "motion-line",
    });
    splits.set(element, split);
  }
  return split.lines;
}

/** Hide a scope's parts and hand their visibility over from CSS to GSAP. */
export function ready(scope: Element) {
  gsap.set(parts(scope), { autoAlpha: 0 });
  scope.setAttribute("data-motion-ready", "");
}

/** Play every part inside a scope in document order. */
export function reveal(scope: Element, { delay = 0, stagger = 0.06 } = {}) {
  const timeline = gsap.timeline({ delay });
  parts(scope).forEach((element, index) => {
    const at = index * stagger;
    const kind = element.dataset.motion ?? "fade";
    if (kind === "lines") {
      timeline
        .set(element, { autoAlpha: 1 }, at)
        .fromTo(
          lines(element),
          { yPercent: 125 },
          { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.09 },
          at,
        );
      return;
    }
    const motion = motions[kind] ?? motions.fade;
    timeline.fromTo(element, motion.from, motion.to, at);
  });
  return timeline;
}
