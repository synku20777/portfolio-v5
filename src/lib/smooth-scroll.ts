/**
 * Utility for smooth scrolling to page elements
 */
export function smoothScrollTo(targetId: string, options: ScrollIntoViewOptions = {}) {
  // Skip if running on server
  if (typeof document === 'undefined') return false;
  
  // Handle both "#section" and "section" formats
  const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;
  
  // Find target element
  const element = document.getElementById(id);
  if (!element) return false;

  // Set default options if not provided
  const scrollOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
    ...options
  };
  
  // Scroll to the element
  element.scrollIntoView(scrollOptions);
  
  // Update URL without refreshing page
  if (history && history.pushState) {
    history.pushState(null, '', `#${id}`);
  }
  
  return true;
}