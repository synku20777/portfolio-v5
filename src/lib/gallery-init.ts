import { initGallery } from "../lib/gallery";

document.addEventListener("DOMContentLoaded", () => {
  initGallery({
    galleryId: "gallery",
    updateHash: true,
    scrollIntoView: true,
  });
});

export { initGallery };
