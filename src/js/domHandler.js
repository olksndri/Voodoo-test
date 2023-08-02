import { addToCartOnClick } from './cartHandler';

export const domHandler = (getList, shopList, mob, page) => {
  getList(mob, page)
    .then(({ data: { products } }) => {
      const productsList = products.reduce((prevValue, el) => {
        return (prevValue += `
        <li class="w-full mob:w-340px mob:max-w-none desk:w-300px flex flex-col justify-between gap-y-3 relative">
            <div class=" border rounded border-black h-max">
                <img 
                    src="${el.images.length !== 0 ? el.images[0].src : ''} 
                    alt="${el.title}"
                    class="w-full mob:w-340px h-300 desk:w-300px"
                />
            </div>
            <div class="flex justify-between text-sm">
                <div class="font-bold"> 
                    <p>${el.title}</p>
                    <p>${el.variants[0].price} KR.</p>
                </div>
                <div class="flex flex-col text-end">
                    <p>Condition</p>
                    <p>Slightly used</p>
                </div>
            </div>
            <button type="button" class="add_to_cart font-bold text-sm bg-black text-white w-full h-42 rounded border-black">ADD TO CART</button>
            <div class="w-12 h-6 bg-black rounded border-black absolute top-3 left-3 flex justify-center items-center">
                <span class="text-light-sand font-normal text-xs">USED</span>
            </div>
        </li>
        `);
      }, '');

      const shopButton = document.querySelectorAll('.add_to_cart');
      shopButton.forEach(el => {
        el.removeEventListener('click', addToCartOnClick);
      });

      shopList.innerHTML = productsList;

      const shopButtonAfterInner = document.querySelectorAll('.add_to_cart');
      shopButtonAfterInner.forEach(el => {
        el.addEventListener('click', addToCartOnClick);
      });
    })
    .catch(err => console.log(err));
};
