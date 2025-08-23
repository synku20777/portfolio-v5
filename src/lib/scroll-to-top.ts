const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector('.progress-wrap');
  let progressPath = document.querySelector('.progress-wrap path') as SVGPathElement | null;
  const updateProgress = () => {
    if (!progressPath) return;
    let pathLength = progressPath.getTotalLength();
    let scroll = window.scrollY;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = String(progress);
  };
  if (progressWrap && progressPath) {
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = String(pathLength);
    progressPath.getBoundingClientRect();
    progressPath.style.transition = 'stroke-dashoffset 10ms linear';

    updateProgress();
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > offset) {
        progressWrap?.classList.add('active-progress');
      } else {
        progressWrap?.classList.remove('active-progress');
      }
    });
    progressWrap.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    });
  }
};

export default scrollToTop;