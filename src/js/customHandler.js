import { customEl } from '..';

export const customHandler = evt => {
  customEl.classList.toggle('hidden');
  customEl.classList.toggle('translate-y-72px');
};
