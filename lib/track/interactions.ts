import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { takeoff } from "./schematics";
import { tiktokPlayerSrc } from "./tiktok";

// Wires up the interactive parts of /track. The markup is server-rendered and
// readable without this; everything here only adds motion and interaction.
// Returns a cleanup that removes every listener, tween and ScrollTrigger it made.
export function initTrack(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: (() => void)[] = [];
  root.setAttribute("data-enhanced", "");

  const ctx = gsap.context(() => {
    // Statement text: each word fills in as it scrolls through the viewport.
    if (!reduce) {
      root.querySelectorAll<HTMLElement>("[data-fill-text]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true },
          }
        );
      });

      // Reading-friendly reveals: blocks fade up a short way once, as they enter the bottom of the screen, then stay put. Nothing moves
      // while it is in the reading zone, and nothing animates again on the way back up.
      const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      gsap.set(blocks, { autoAlpha: 0, y: 14 });
      ScrollTrigger.batch(blocks, {
        start: "top 94%",
        once: true,
        onEnter: (batch, triggers) => {
          // After a jump (a nav link, a fast fling) show the blocks almost at once
          // rather than making the reader wait on an entrance.
          const fast = Math.abs(triggers[0]?.getVelocity() ?? 0) > 2500;
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: fast ? 0.3 : 0.8,
            ease: "power2.out",
            stagger: fast ? 0 : 0.06,
            clearProps: "transform",
          });
        },
      });
    }

    root.querySelectorAll<HTMLElement>("[data-story]").forEach((el) => cleanups.push(initStory(el, reduce)));
    root.querySelectorAll<HTMLElement>("[data-takeoff]").forEach((el) => cleanups.push(initTakeoff(el)));
    root.querySelectorAll<HTMLElement>("[data-tabs]").forEach((el) => cleanups.push(initTabs(el, reduce)));
  }, root);
  cleanups.push(initAnchors(reduce));
  root.querySelectorAll<HTMLElement>("[data-clips]").forEach((el) => cleanups.push(initClips(el)));

  return () => {
    cleanups.forEach((fn) => fn());
    ctx.revert();
    root.removeAttribute("data-enhanced");
  };
}

// In-page links (#argument, #takeoff…) glide to their section instead of jumping.
// Handled here rather than by the browser or the smooth-scroll library, so it
// behaves the same everywhere, including inside an embedded preview. The section's
// scroll-margin-top keeps it clear of the fixed nav. Reduced motion jumps instantly.
function initAnchors(reduce: boolean) {
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let frame = 0;
  const stop = () => cancelAnimationFrame(frame);

  const glide = (to: number) => {
    stop();
    const from = window.scrollY;
    const distance = to - from;
    if (reduce || Math.abs(distance) < 2) {
      window.scrollTo(0, to);
      return;
    }
    // Longer trips take a little longer, within a comfortable range.
    const duration = Math.min(1500, Math.max(700, Math.abs(distance) * 0.35));
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, from + distance * ease(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute("href") ?? "";
    const id = decodeURIComponent(hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (id && !target) return;
    e.preventDefault();
    e.stopPropagation();

    const margin = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
    const to = target && id !== "top" ? target.getBoundingClientRect().top + window.scrollY - margin : 0;
    glide(Math.max(0, to));
    try {
      history.pushState(null, "", hash);
    } catch {}
    // Move keyboard focus to the section without a second scroll.
    if (target) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  };

  // Any wheel, touch or key from the reader takes over from the glide.
  const interrupt = () => stop();
  document.addEventListener("click", onClick, true);
  window.addEventListener("wheel", interrupt, { passive: true });
  window.addEventListener("touchstart", interrupt, { passive: true });
  window.addEventListener("keydown", interrupt);
  return () => {
    stop();
    document.removeEventListener("click", onClick, true);
    window.removeEventListener("wheel", interrupt);
    window.removeEventListener("touchstart", interrupt);
    window.removeEventListener("keydown", interrupt);
  };
}

// One hurdle, five moments: a dot travels the path to the active step.
function initStory(el: HTMLElement, reduce: boolean) {
  const path = el.querySelector<SVGPathElement>("[data-story-path]");
  const progress = el.querySelector<SVGPathElement>("[data-story-progress]");
  const dot = el.querySelector<SVGCircleElement>("[data-story-dot]");
  const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-story-step]"));
  const labels = Array.from(el.querySelectorAll<SVGElement>("[data-story-label]"));
  if (!path || !progress || !dot || !steps.length) return () => {};

  const total = path.getTotalLength();
  const lengthAtX = (x: number) => {
    let lo = 0;
    let hi = total;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid).x < x) lo = mid;
      else hi = mid;
    }
    return lo;
  };
  const stops = steps.map((s) => lengthAtX(Number(s.dataset.x)));
  const state = { len: stops[0] };
  progress.style.strokeDasharray = `${total}`;

  const render = () => {
    const p = path.getPointAtLength(state.len);
    dot.setAttribute("cx", p.x.toFixed(1));
    dot.setAttribute("cy", p.y.toFixed(1));
    progress.style.strokeDashoffset = `${total - state.len}`;
  };

  let active = -1;
  const setActive = (i: number) => {
    if (i === active) return;
    active = i;
    steps.forEach((s, j) => s.toggleAttribute("data-active", j === i));
    labels.forEach((l, j) => l.toggleAttribute("data-active", j === i));
    gsap.to(state, { len: stops[i], duration: reduce ? 0 : 1.1, ease: "expo.out", overwrite: true, onUpdate: render });
  };

  render();
  setActive(0);
  steps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => self.isActive && setActive(i),
    });
  });
  return () => {};
}

// Takeoff slider: moving the takeoff earlier with speed and step length unchanged.
function initTakeoff(el: HTMLElement) {
  const input = el.querySelector<HTMLInputElement>("[data-takeoff-input]");
  const foot = el.querySelector<SVGElement>("[data-takeoff-foot]");
  const gap = el.querySelector<SVGLineElement>("[data-takeoff-gap]");
  const ghost = el.querySelector<SVGElement>("[data-takeoff-ghost]");
  const arc = el.querySelector<SVGPathElement>("[data-takeoff-arc]");
  const readouts = Array.from(el.querySelectorAll<HTMLElement>("[data-takeoff-readout]"));
  if (!input || !foot || !gap || !arc) return () => {};

  const { groundY, baseTakeoff, maxShift, landing, steps } = takeoff;
  const update = () => {
    const v = Number(input.value) / 100;
    const x = baseTakeoff - v * maxShift;
    foot.setAttribute("transform", `translate(${(x - baseTakeoff).toFixed(1)} 0)`);
    gap.setAttribute("x2", x.toFixed(1));
    ghost?.setAttribute("opacity", v > 0.02 ? "1" : "0");
    // The flight gets longer, so it has to get higher to clear the same barrier.
    const peak = 20 - v * 46;
    arc.setAttribute("d", `M${x.toFixed(1)} ${groundY} Q${((x + landing) / 2).toFixed(1)} ${peak.toFixed(1)} ${landing} ${groundY}`);
    const level = v < 0.12 ? 0 : v < 0.45 ? 1 : v < 0.8 ? 2 : 3;
    readouts.forEach((r, i) => (r.hidden = i !== level));
    el.style.setProperty("--strain", v.toFixed(2));
    input.setAttribute("aria-valuetext", readouts[level]?.textContent ?? "");
  };
  // Keep the last full step where it is: only the final step shortens.
  gap.setAttribute("x1", String(steps[steps.length - 1]));
  input.addEventListener("input", update);
  update();
  return () => input.removeEventListener("input", update);
}

// Accessible tabs (also used for the is / isn't toggle). Draws the panel's
// schematic lines in when a tab is selected.
function initTabs(el: HTMLElement, reduce: boolean) {
  const tabs = Array.from(el.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = tabs.map((t) => el.querySelector<HTMLElement>(`#${t.getAttribute("aria-controls")}`));

  const draw = (panel: HTMLElement | null) => {
    if (!panel || reduce) return;
    panel.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((p) => {
      const len = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: "expo.out" });
    });
    gsap.fromTo(panel.querySelectorAll("[data-pop]"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "expo.out" });
  };

  const select = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(i === j));
      t.tabIndex = i === j ? 0 : -1;
      if (panels[j]) panels[j]!.hidden = i !== j;
    });
    el.style.setProperty("--tab-index", String(i));
    if (focus) tabs[i].focus();
    draw(panels[i]);
  };

  const onClick = (e: Event) => {
    const i = tabs.indexOf(e.currentTarget as HTMLButtonElement);
    if (i >= 0) select(i);
  };
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    select((next + tabs.length) % tabs.length, true);
  };
  tabs.forEach((t) => t.addEventListener("click", onClick));
  el.addEventListener("keydown", onKey);

  // Draw the first panel when the switcher first scrolls into view.
  const st = ScrollTrigger.create({ trigger: el, start: "top 75%", once: true, onEnter: () => draw(panels[tabs.findIndex((t) => t.getAttribute("aria-selected") === "true")] ?? null) });

  return () => {
    tabs.forEach((t) => t.removeEventListener("click", onClick));
    el.removeEventListener("keydown", onKey);
    st.kill();
  };
}

// TikTok clips. Each frame is a plain link to the video until the script runs; then
// pressing it swaps the link for TikTok's player in place. Only one plays at a time,
// and starting another puts the first link back.
function initClips(list: HTMLElement) {
  let active: { box: HTMLElement; link: HTMLAnchorElement } | null = null;
  const stop = () => {
    if (!active) return;
    active.box.replaceWith(active.link);
    active = null;
  };
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-clip]");
    if (!link || !list.contains(link)) return;
    e.preventDefault();
    stop();
    const box = document.createElement("div");
    box.className = "clip-frame";
    const player = document.createElement("iframe");
    player.src = tiktokPlayerSrc(link.dataset.clip!);
    player.title = link.getAttribute("aria-label")?.replace(/^Play /, "") ?? "TikTok video";
    player.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    player.allowFullscreen = true;
    box.appendChild(player);
    link.replaceWith(box);
    active = { box, link };
    player.focus();
  };
  list.addEventListener("click", onClick);
  return () => {
    list.removeEventListener("click", onClick);
    stop();
  };
}
