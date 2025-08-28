import { initGallery } from '@/lib/gallery';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initGallery({
    galleryId: 'gallery',
    updateHash: true,
    scrollIntoView: true,
  }));
} else {
  initGallery({
    galleryId: 'gallery',
    updateHash: true,
    scrollIntoView: true,
  });
}