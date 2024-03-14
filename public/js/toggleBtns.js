/* eslint-disable */

export const toggleBtnVis = (btnPencil, input, text, btnTick, btnDelete) => {
  if (btnPencil) {
    if (text.className !== 'note-text-p') {
      btnPencil.addEventListener('click', (e) => {
        e.preventDefault();
        text.style.display = 'none';
        btnPencil.style.display = 'none';
        input.style.display = 'inline-block';
        btnTick.style.display = 'inline-block';
      });
    }

    btnPencil.addEventListener('click', (e) => {
      e.preventDefault();
      text.style.fontSize = '0px';
      text.style.width = '0px';
      btnPencil.style.display = 'none';
      input.style.display = 'inline-block';
      btnTick.style.display = 'inline-block';
      if (btnDelete) btnDelete.style.display = 'none';
    });
  }
};

export const toggleItemBtnsVis = (
  btnPencil,
  input,
  text,
  btnTick,
  btnDelete,
) => {
  if (btnPencil) {
    btnPencil.addEventListener('click', (e) => {
      e.preventDefault();
      text.style.fontSize = '0px';
      text.style.width = '0px';
      btnPencil.style.display = 'none';
      input.style.display = 'inline-block';
      btnTick.style.display = 'inline-block';
      btnDelete.style.display = 'none';
    });
  }
};
