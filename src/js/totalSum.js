import { shoppingCartList } from '..';

export const totalSum = () => {
  const items = shoppingCartList.querySelectorAll('li');
  const total = document.querySelector('.total_sum');
  const prcQntArr = [];

  items.forEach(el => {
    prcQntArr.push({
      price: Number(
        el.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent.replace(
          'KR.',
          ''
        )
      ),
      quantity: Number(el.querySelector('.ship_value').textContent),
    });
  });

  let finallyPrice;

  finallyPrice = prcQntArr.reduce((prevVal, el) => {
    return (prevVal += el.price * el.quantity);
  }, 0);

  total.textContent = `${finallyPrice.toFixed(2)} KR.`;
};
