export function setupViewTransitions() {
  if ((window as typeof window & { __nestViewTransitionsInitialized?: boolean }).__nestViewTransitionsInitialized) {
    return;
  }

  if (!document.startViewTransition) return;

  (window as typeof window & { __nestViewTransitionsInitialized?: boolean }).__nestViewTransitionsInitialized = true;
  
  document.addEventListener('astro:page-load', () => {
    // Initialize components that need to be set up after navigation
    initializeComponents();
  });
  
  // Handle link clicks
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element 
      ? event.target.closest('a') 
      : null;
      
    if (!link || 
        link.target || 
        link.hasAttribute('download') || 
        link.getAttribute('rel') === 'external') {
      return;
    }

    const url = new URL(link.href, window.location.href);
    const currentUrl = new URL(window.location.href);

    if (url.origin !== currentUrl.origin || !/^https?:$/.test(url.protocol)) {
      return;
    }

    if (url.pathname === currentUrl.pathname && url.hash) {
      return;
    }

    if (document.startViewTransition) {
      event.preventDefault();
      const nextUrl = link.href;
      
      document.startViewTransition(async () => {
        await navigateTo(nextUrl);
      });
    }
  });
}

function navigateTo(url: string) {
  return new Promise(resolve => {
    window.location.href = url;
    window.addEventListener('pageshow', resolve, { once: true });
  });
}

function initializeComponents() {
  // Re-initialize any components that need it
  // e.g., gallery, ripple effects, etc.
}
