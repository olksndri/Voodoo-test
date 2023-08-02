import { domHandler } from './js/domHandler';
import { getList } from './js/getList';
import { pageButtons } from './js/pageButtons';
import { toggleModal } from './js/modal';
import { customHandler } from './js/customHandler';
import throttle from 'lodash.throttle';

const shopList = document.querySelector('.shopping_list');
const buttonsList = document.querySelector('.buttons_list');
const aboutVoodoo = document.querySelector('.about_voodoo');
export const shoppingCartList = document.querySelector('.shopping_cart_list');
export const modalWindow = document.querySelector('.modal_window');
export const modalCloseBtn = document.querySelector('.modal_close_btn');
export const modalOpenBtn = document.querySelector('.modal_open');
export const customBtn = document.querySelector('.custom_btn');
export const customEl = document.querySelector('.custom_el');

const aboutVoodooFunc = screenWidth => {
  if (Number(screenWidth) >= 1512) {
    aboutVoodoo.textContent = 'ABOUT SECOND CHANCE';
  } else {
    aboutVoodoo.textContent = 'ABOUT VOODOO';
  }
};

const pageBtnOnClick = evt => {
  window.scrollTo(0, 0);
  let pageNum = Number(evt.target.textContent);
  if (pageNum > 0) {
    page = pageNum;
    domHandler(getList, shopList, Number(screenWidth) < 1512, page);
    pageButtons(Number(screenWidth) < 1512, buttonsList, page);
  } else {
    page += 7;
    domHandler(getList, shopList, Number(screenWidth) < 1512, page);
    pageButtons(Number(screenWidth) < 1512, buttonsList, page);
  }
  const updatedPageButton = document.querySelectorAll('.page_btn');
  updatedPageButton.forEach(el => {
    el.removeEventListener('click', pageBtnOnClick);
  });
  updatedPageButton.forEach(el => {
    el.addEventListener('click', pageBtnOnClick);
  });
};

const onResize = () => {
  screenWidth = screen.width;
  domHandler(getList, shopList, Number(screenWidth) < 1512, page);
  pageButtons(Number(screenWidth) < 1512, buttonsList, page);
  aboutVoodooFunc(screenWidth);
  const pageButton = document.querySelectorAll('.page_btn');
  pageButton.forEach(el => {
    el.addEventListener('click', pageBtnOnClick);
  });
};

let screenWidth = screen.width;
let page = 1;

aboutVoodooFunc(screenWidth);

domHandler(getList, shopList, Number(screenWidth) < 1512, page);
pageButtons(Number(screenWidth) < 1512, buttonsList, 1);

addEventListener('resize', throttle(onResize, 800));

const pageButton = document.querySelectorAll('.page_btn');
pageButton.forEach(el => {
  el.addEventListener('click', pageBtnOnClick);
});

modalOpenBtn.addEventListener('click', toggleModal);

customBtn.addEventListener('click', customHandler);
