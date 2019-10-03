import lazyloadImages from './lazyloadimages';
import initAudio from './initAudio';
import initActionBar from './initActionBar'

export function init() {
  lazyloadImages();
  initActionBar();
  initAudio();

  const isLoggedIn =
    document.cookie.split(';').some((item) => item.trim().startsWith('tmsso='));
  if (!isLoggedIn) {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) loginLink.classList.add('isLoggedIn');
  }
}
