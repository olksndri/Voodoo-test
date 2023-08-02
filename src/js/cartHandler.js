import { shoppingCartList } from '..';
import { removeHandler } from './removeHandler';
import { totalSum } from './totalSum';
import Notiflix from 'notiflix';

const constIncrementCart = evt => {
  symbol = evt.target.textContent;
  if (symbol === '-') {
    const quantityEl = evt.target.nextElementSibling;
    const value = Number(quantityEl.textContent);
    quantityEl.textContent = value - 1 > 1 ? value - 1 : 1;
  } else {
    const quantityEl = evt.target.previousElementSibling;
    const value = Number(quantityEl.textContent);
    quantityEl.textContent = value + 1;
  }
  totalSum();
};

const shoppingCartHandler = (item, list) => {
  decrement = shoppingCartList.querySelectorAll('.cart_decrement');
  increment = shoppingCartList.querySelectorAll('.cart_increment');
  removeButton = shoppingCartList.querySelectorAll('.remove_item');

  increment.forEach(el => el.removeEventListener('click', constIncrementCart));
  decrement.forEach(el => el.removeEventListener('click', constIncrementCart));
  removeButton.forEach(el => {
    el.removeEventListener('click', removeHandler);
  });

  if (item !== undefined && list !== undefined) {
    list.insertAdjacentHTML('beforeend', item);
  }

  increment.forEach(el => el.addEventListener('click', constIncrementCart));
  decrement.forEach(el => el.addEventListener('click', constIncrementCart));
  removeButton.forEach(el => {
    el.addEventListener('click', removeHandler);
  });
};

const cartItem = (name, price, src) => {
  return `<li class="flex justify-between gap-x-18px" data-name="${name}">
                    <div class="w-74px h-74px rounded border border-white shrink-0">
                        <img src="${src}" class="w-full h-full"/>
                    </div>
                    <div class="shrink w-230px flex flex-col gap-y-3">
                        <h3 class="leading-17px">${name}</h3>
                        <p class="leading-17px">${price}</p>
                        <div class="">   
                            <button type="button" class="cart_decrement">-</button>
                            <span class="ship_value">1</span>
                            <button type="button" class="cart_increment">+</button>
                        </div>
                    </div>
                    <div class="h-full shrink-0">
                        <button type="button" class="remove_item">
                            <svg class="w-6 h-6 fill-light-sand">
                                <g clip-path="url(#a)">
                                    <path fill="#FCF7E6" d="M7 4V2h10v2h5v2h-2v15a1.0001 1.0001 0 0 1-1 1H5a1.0002 1.0002 0 0 1-1-1V6H2V4h5ZM6 6v14h12V6H6Zm3 3h2v8H9V9Zm4 0h2v8h-2V9Z"/>
                                </g>
                                <defs>
                                    <clipPath id="a">
                                    <path fill="#fff" d="M0 0h24v24H0z"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>   
                    </div>
                </li>`;
};

export const addToCartOnClick = evt => {
  const btn = evt.target;
  const description = btn.previousElementSibling.firstElementChild;
  const name = description.firstElementChild.textContent;
  const price = description.lastElementChild.textContent;
  const src =
    btn.parentNode.firstElementChild.firstElementChild.getAttribute('src');
  const item = cartItem(name, price, src);
  const carts = [...shoppingCartList.querySelectorAll('li')];
  const compareArr = [];

  carts.forEach(el => {
    compareArr.push(el.dataset.name);
  });

  if (!compareArr.includes(name)) {
    shoppingCartHandler(item, shoppingCartList);
  } else {
    const targetCart = shoppingCartList.querySelector(
      `li[data-name="${name}"]`
    );
    const quantityEl = targetCart.querySelector('.ship_value');
    const value = Number(quantityEl.textContent);
    quantityEl.textContent = value + 1;
  }

  shoppingCartHandler();
  totalSum();

  Notiflix.Notify.success('The item has been added to your Shopping Cart', {
    timeout: 750,
    position: 'left-top',
  });
};
