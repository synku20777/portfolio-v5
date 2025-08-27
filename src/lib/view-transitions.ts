export function setupViewTransitions() {
  if (!document.startViewTransition) return;
  
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
    
    if (document.startViewTransition) {
      event.preventDefault();
      const url = link.href;
      
      document.startViewTransition(async () => {
        await navigateTo(url);
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