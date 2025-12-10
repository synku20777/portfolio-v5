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
    "Astra.web": "astra-case",
    "ITworkshop.web": "itworkshop-case",
    ...(opts.nameToId ?? {}),
  };

  const CASE_IDS: string[] = opts.caseIds ?? [
    "uxunite-case", "artsy-case", "cloudfirst-case", 
    "firefly-case", "astra-case", "itworkshop-case"
  ];

  let currentId: string | null = null;
  let ro: ResizeObserver | null = null;
  let hoverTimer: number | null = null;

  const getEl = (id: string) => document.getElementById(id);

  // Helper for batch style setting to improve readability and perf
  const setStyles = (el: HTMLElement, styles: Partial<CSSStyleDeclaration>) => {
    Object.assign(el.style, styles);
  };

  const updateGalleryHeight = () => {
    const activeEl = currentId ? getEl(currentId) : null;
    if (activeEl) {
      setStyles(activeEl, {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
    }
  };

  const observeActive = (el: HTMLElement | null) => {
    if (typeof ResizeObserver === "undefined") return;
    
    // Disconnect previous observer
    if (ro) ro.disconnect();
    
    // Create new observer only if needed (lazy init)
    if (!ro) ro = new ResizeObserver(updateGalleryHeight);
    
    if (el) ro.observe(el);
    
    // Manage window resize listener to avoid duplicates
    window.removeEventListener("resize", updateGalleryHeight);
    window.addEventListener("resize", updateGalleryHeight, { passive: true });
    
    // Initial update
    updateGalleryHeight();
  };

  const setActiveInstant = (id: string) => {
    CASE_IDS.forEach(cid => {
      const el = getEl(cid);
      if (!el) return;
      const active = cid === id;

      el.hidden = !active;
      el.dataset.active = String(active);
      el.setAttribute("aria-hidden", String(!active));

      setStyles(el, {
        opacity: active ? "1" : "0",
        transform: active ? "translateX(0px)" : "translateX(40px)",
        zIndex: active ? "2" : "1"
      });
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

    // Setup 'to' element
    to.hidden = false;
    to.dataset.active = "true";
    to.setAttribute("aria-hidden", "false");
    setStyles(to, {
      opacity: "0",
      transform: "translateX(-40px)",
      zIndex: "2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    });

    const clean = (el: HTMLElement) => {
      if (!el) return;
      setStyles(el, {
        opacity: "",
        transform: "",
        zIndex: "",
        willChange: ""
      });
    };

    // Animation promises
    let enterAnim: Animation | undefined;
    let exitAnim: Animation | undefined;

    try {
      enterAnim = to.animate(
        [{ opacity: 0, transform: "translateX(-40px)" },
         { opacity: 1, transform: "translateX(0px)" }],
        { duration: DURATION, easing: EASE, fill: "forwards" }
      );
    } catch (e) {
      // Fallback
      setStyles(to, { opacity: "1", transform: "translateX(0px)" });
    }

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
        // Fallback
        setStyles(from, { opacity: "0", transform: "translateX(40px)" });
      }
    }

    try {
        await Promise.all([
            enterAnim?.finished,
            exitAnim?.finished
        ]);
    } catch (e) {
        // Ignore animation errors (e.g. element removed from DOM during anim)
    } finally {
      if (from) {
        from.hidden = true;
        clean(from);
      }
      clean(to);
      
      // Update state
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
    if(initial) setActive(initial, { animate: false });
  };

  const onCaseOpen = (e: any) => { // Using 'any' for CustomEvent to simplify usage
    const name = e?.detail?.name as string;
    if (!name) return;

    const id = map[name] || fallbackId(name);
    if (!CASE_IDS.includes(id)) CASE_IDS.push(id);
    
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    
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
  };

  // Boot sequence
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    // Defer slightly to ensure DOM is ready in all contexts
    setTimeout(boot, 0);
  }
  
  window.addEventListener("case:open", onCaseOpen);

  return {
    setActive,
    destroy() {
      window.removeEventListener("case:open", onCaseOpen);
      window.removeEventListener("resize", updateGalleryHeight);
      if (ro) ro.disconnect();
      if (hoverTimer) clearTimeout(hoverTimer);
    }
  };
}