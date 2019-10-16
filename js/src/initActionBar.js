// Elements
const sentinalEl = document.getElementById('actionBarSentinal');
const actionBarEl = document.getElementById('actionBar');
const autoplayBtnEl = document.getElementById('autoplayBtn');

export default function initActionBar() {
  const stickySentinal = new IntersectionObserver(handleStickiness, { threshold: [ 0, 0.5, 1 ], });
  const highlightSentinal = new IntersectionObserver(handleHighlight, { rootMargin: '0px 0px -25% 0px', });
  stickySentinal.observe(sentinalEl);
  highlightSentinal.observe(sentinalEl);
  initSocial();

}

function handleHighlight(entries) {
  const [ entry, ] = entries;
  const { boundingClientRect, isIntersecting, } = entry;

  if (isIntersecting) autoplayBtnEl.classList.add('isHighlighted');
  else autoplayBtnEl.classList.remove('isHighlighted');
}
function handleStickiness(entries) {
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



