import { totalSum } from './totalSum';
import Notiflix from 'notiflix';

export const removeHandler = evt => {
  const removeBtn = evt.currentTarget;
  const itemForRemove = removeBtn.parentNode.parentNode;
  itemForRemove.remove();
  totalSum();
  Notiflix.Notify.failure('The product was removed from your Shopping Cart', {
    timeout: 750,
    position: 'left-top',
  });
};
