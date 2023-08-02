const TOTAL_ITEMS = 461;

const activeBtn = content => {
  return `<li><button class="page_btn bg-black rounded-full text-white w-39px h-39px">${content}</button></li>`;
};

const doesntActiveBtn = content => {
  return `<li><button class="page_btn bg-light-sand rounded-full text-black w-39px h-39px border-black border">${content}</button></li>`;
};

export const pageButtons = (mob, buttonsList, page) => {
  const per_page = mob ? 12 : 24;
  const pages = Math.ceil(TOTAL_ITEMS / per_page);

  let buttonsCounter = '';

  for (let i = page; i <= pages; i++) {
    if (page === 1) {
      if (i === 1) {
        buttonsCounter += activeBtn(i);
      } else if (i <= 5) {
        buttonsCounter += doesntActiveBtn(i);
      } else {
        buttonsCounter += doesntActiveBtn('...');
        buttonsCounter += doesntActiveBtn(pages);
        break;
      }
    } else {
      if (i === page) {
        buttonsCounter += doesntActiveBtn(i - 1);
        buttonsCounter += activeBtn(i);
      } else {
        if (i < Number(page) + 4) {
          buttonsCounter += doesntActiveBtn(i);
        } else {
          buttonsCounter += doesntActiveBtn('...');
          buttonsCounter += doesntActiveBtn(pages);
          break;
        }
      }
    }
  }
  buttonsList.innerHTML = buttonsCounter;
};
