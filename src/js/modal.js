import { modalWindow } from '..';
import { modalCloseBtn } from '..';
import { modalOpenBtn } from '..';

export const toggleModal = evt => {
  const classList = [...evt.currentTarget.classList];
  const isOpenBtn = classList.includes('modal_open');
  if (isOpenBtn) {
    modalWindow.classList.remove('hidden');
    modalCloseBtn.addEventListener('click', toggleModal);
    modalOpenBtn.removeEventListener('click', toggleModal);
  } else {
    modalWindow.classList.add('hidden');
    modalCloseBtn.removeEventListener('click', toggleModal);
    modalOpenBtn.addEventListener('click', toggleModal);
  }
};
