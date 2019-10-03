// Elements
const sentinalEl = document.getElementById('actionBarSentinal');
const actionBarEl = document.getElementById('actionBar');

export default function initActionBar() {
  const sentinal = new IntersectionObserver(onIntersect, { threshold: [0, 0.5, 1], });
  sentinal.observe(sentinalEl);
  initSocial();

}

function onIntersect(entries) {
  const [ entry, ] = entries;
  const { boundingClientRect, isIntersecting, } = entry;
  const { y, } = boundingClientRect;
  const isSentinalAboveFold = y <=0;

  if (y <= 0 && !isIntersecting) actionBarEl.classList.add('isSticky');
  else actionBarEl.classList.remove('isSticky');
}

function initSocial() {
  const fbBtn = document.getElementById('fbShare');
  const twitterBtn = document.getElementById('twitterShare');
  // const whatsappBtn = document.getElementById('whatsappShare');

  const url = document.querySelector('link[rel="canonical"]').getAttribute('href');
  const title = document.querySelector('meta[property="og:title"]').getAttribute('content');

  fbBtn.addEventListener('click', evt => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      'facebook-share-dialog',
      'width=800,height=600',
    );
  });
  twitterBtn.addEventListener('click', evt => {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=haaretz`,
      'twitter-share-dialog',
      'width=800,height=600',
    );
  });
  // whatsappBtn.addEventListener('click', evt => {
  //   window.open(
  //     `whatsapp://send?text=${title} ${url}`,
  //     'whatsapp-share-dialog',
  //     'width=800,height=600',
  //   );
  // });
}



