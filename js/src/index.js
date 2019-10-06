import lazyloadImages from './lazyloadimages';
import initAudio from './initAudio';
import initActionBar from './initActionBar'

export function init() {
  lazyloadImages();
  initActionBar();
  initAudio();

  const purchaseBtn = document.getElementById('purchaseBtn')

  const isLoggedIn =
    document.cookie.split(';').some((item) => item.trim().startsWith('tmsso='));
  if (!isLoggedIn) {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) loginLink.classList.add('isLoggedIn');
  }

  if (typeof ga === 'function') {
    if (purchaseBtn) {
      ga('ec:addPromo', {
        id: 'interactive-birds',
        name: 'interactive birds',
      });

      purchaseBtn.addEventListener('click', () => {
        ga('ec:addPromo', {
          id: 'interactive-birds',
          name: 'interactive birds',
        });
        ga('ec:setAction', 'promo_click');
        ga('send', 'event', 'Internal Promotions', 'click', 'interactive birds');
      });

      ga('send', 'pageview');
    }
    else ga('send', 'pageview');
  }
}
