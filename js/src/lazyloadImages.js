export default async function lazyloadImage() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = Array.from(document.querySelectorAll('img[loading="lazy"]'));
    images.forEach(img => {
      // add `lazyloaded` class to image once it has loaded
      img.addEventListener('load', () => {
        img.classList.add('lazyloaded');
      });

      debugger;
      // populate `src` and `srcset` from `data-` attributes
      const { src, srcset } = img.dataset;
      if (srcset) img.srcset = srcset;
      img.src = src;
    });
  }
  else {
    console.log(
      '[htz]: Native lazyloading is not supported by the browser.',
      'Loading lazysizes...',
    );
    const lazySizesLib = await import('lazysizes');

    // lazysizes adds a global, so initializing that instead of the module reference
    lazySizes.init();
  }
}
