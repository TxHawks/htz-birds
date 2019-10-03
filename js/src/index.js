import lazyloadImages from './lazyloadimages';
import initAudio from './initAudio';
import initActionBar from './initActionBar'

export function init() {
  lazyloadImages();
  initActionBar();
  initAudio();
}
