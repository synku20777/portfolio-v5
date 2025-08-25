export type GalleryOptions = {
  galleryId?: string;
  caseIds?: string[];
  nameToId?: Record<string, string>;
  duration?: number;
  easing?: string;
  updateHash?: boolean;      // default: true
  scrollIntoView?: boolean;  // default: true
  hoverDelay?: number;       // default: 0ms - delay before showing hovered case
};

export function initGallery(opts: GalleryOptions = {}) {
  const EASE = opts.easing ?? 'cubic-bezier(0.22, 1, 0.36, 1)';
  const DURATION = opts.duration ?? 420;
  const HOVER_DELAY = opts.hoverDelay ?? 0;

  const map: Record<string, string> = {
    "UxUnite.ds": "uxunite-case",
    "Artsy.app": "artsy-case",
    "Firefly.shop": "firefly-case",
    "CloudFirst.web": "cloudfirst-case",
    ...(opts.nameToId ?? {}),
  };

  const CASE_IDS: string[] = [...(opts.caseIds ?? ["uxunite-case","artsy-case","cloudfirst-case","firefly-case"])];

  let currentId: string | null = null;
  let ro: ResizeObserver | null = null;
  let hoverTimer: number | null = null;

  const getEl = (id: string) => document.getElementById(id) as HTMLElement | null;

  const galleryEl = () => document.getElementById(opts.galleryId ?? "gallery") as HTMLElement | null;

  const updateGalleryHeight = () => {
    // The gallery is now full height, so we don't need to adjust its height
    // Just ensure the active case fills the gallery properly
    const activeEl = currentId ? getEl(currentId) : null;
    if (activeEl) {
      activeEl.style.height = "100%";
      activeEl.style.display = "flex";
      activeEl.style.alignItems = "center";
      activeEl.style.justifyContent = "center";
    }
  };

  const observeActive = (el: HTMLElement | null) => {
    if (typeof ResizeObserver === "undefined") return;
    
    if (!ro) ro = new ResizeObserver(updateGalleryHeight);
    ro.disconnect();
    if (el) ro.observe(el);
    
    window.removeEventListener("resize", updateGalleryHeight);
    window.addEventListener("resize", updateGalleryHeight, { passive: true });
    updateGalleryHeight();
  };

  const measure = (el: HTMLElement) => {
    const prevHidden = el.hidden;
    el.hidden = false;
    el.hidden = prevHidden;
    return el.scrollHeight; // Use scrollHeight instead of offsetHeight
  };

  const setActiveInstant = (id: string) => {
    CASE_IDS.forEach(cid => {
      const el = getEl(cid);
      if (!el) return;
      const active = cid === id;
      el.hidden = !active;
      el.dataset.active = active ? "true" : "false";
      el.setAttribute("aria-hidden", active ? "false" : "true");
      el.style.opacity = active ? "1" : "0";
      el.style.transform = active ? "translateX(0px)" : "translateX(40px)";
      el.style.zIndex = active ? "2" : "1";
    });
    currentId = id;
    updateGalleryHeight();
    observeActive(getEl(id));
  };

  const setActiveAnimated = async (id: string) => {
    if (id === currentId) return;

    const from = currentId ? getEl(currentId) : null;
    const to = getEl(id);
    if (!to) return;

    if (!CASE_IDS.includes(id)) CASE_IDS.push(id);

    to.hidden = false;
    to.dataset.active = "true";
    to.setAttribute("aria-hidden", "false");
    to.style.opacity = "0";
    to.style.transform = "translateX(-40px)";
    to.style.zIndex = "2";
    to.style.display = "flex";
    to.style.alignItems = "center";
    to.style.justifyContent = "center";

    const clean = (el: HTMLElement) => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.zIndex = "";
      el.style.willChange = "";
    };

    let enterAnim: Animation | null = null;
    try {
      enterAnim = to.animate(
        [{ opacity: 0, transform: "translateX(-40px)" },
        { opacity: 1, transform: "translateX(0px)" }],
        { duration: DURATION, easing: EASE, fill: "forwards" }
      );
    } catch (e) {
      // Fallback if animation fails
      to.style.opacity = "1";
      to.style.transform = "translateX(0px)";
    }

    let exitAnim: Animation | null = null;
    if (from) {
      from.dataset.active = "false";
      from.setAttribute("aria-hidden", "true");
      from.style.zIndex = "1";
      try {
        exitAnim = from.animate(
          [{ opacity: 1, transform: "translateX(0px)" },
          { opacity: 0, transform: "translateX(40px)" }],
          { duration: DURATION, easing: EASE, fill: "forwards" }
        );
      } catch (e) {
        // Fallback if animation fails
        from.style.opacity = "0";
        from.style.transform = "translateX(40px)";
      }
    }

    try {
      if (enterAnim?.finished) await enterAnim.finished;
      if (exitAnim?.finished) await exitAnim.finished;
    } catch (e) {
      console.warn("Animation promise rejected", e);
    } finally {
      if (from) {
        from.hidden = true;
        clean(from);
      }
      clean(to);
      currentId = id;
      updateGalleryHeight();
      observeActive(to);
    }
  };

  const setActive = (id: string, { animate = true } = {}) =>
    animate ? setActiveAnimated(id) : setActiveInstant(id);

  const fallbackId = (name: string) =>
    ((name?.split(".")[0] || "case"))
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase() + "-case";

  const boot = () => {
    const fromHash = location.hash?.slice(1);
    const initial = fromHash && CASE_IDS.includes(fromHash) ? fromHash : CASE_IDS[0];
    setActive(initial, { animate: false });
    observeActive(getEl(initial));
  };

  const onCaseOpen = (e: any) => {
    const name = e?.detail?.name as string;
    const id = map[name] || fallbackId(name);
    if (!CASE_IDS.includes(id)) CASE_IDS.push(id);
    
    // Clear any pending hover timer
    if (hoverTimer !== null) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    
    // Set a delay if configured
    if (HOVER_DELAY > 0) {
      hoverTimer = window.setTimeout(() => {
        setActive(id, { animate: true });
        if (opts.updateHash !== false) {
          history.replaceState(null, "", `#${id}`);
        }
      }, HOVER_DELAY);
    } else {
      setActive(id, { animate: true });
      if (opts.updateHash !== false) {
        history.replaceState(null, "", `#${id}`);
      }
    }
    
    // We removed the scrollIntoView behavior to avoid jumping when hovering
  };

  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    setTimeout(boot, 0);
  }
  window.addEventListener("case:open", onCaseOpen);

  return {
    setActive,
    destroy() {
      window.removeEventListener("case:open", onCaseOpen);
      window.removeEventListener("resize", updateGalleryHeight);
      if (ro) ro.disconnect();
      if (hoverTimer !== null) clearTimeout(hoverTimer);
    }
  };
}