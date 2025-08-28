import { initGallery } from '@/lib/gallery-init';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initGallery());
} else {
  initGallery();
}