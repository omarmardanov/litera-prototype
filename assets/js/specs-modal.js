// Схема требований крупно.
//
// Картинка остаётся ссылкой на файл: без скрипта она откроется в соседней
// вкладке, и это рабочий запасной путь. Скрипт лишь перехватывает клик
// и показывает ту же схему в диалоге, не уводя человека со страницы —
// он в этот момент заполняет форму, терять её нельзя.

(function () {
  var link = document.querySelector('.ls-specs-pic');
  var modal = document.querySelector('.ls-specs-modal');
  if (!link || !modal || !modal.showModal) return;

  link.addEventListener('click', function (e) {
    e.preventDefault();
    modal.showModal();
  });

  modal.querySelector('.ls-specs-close').addEventListener('click', function () {
    modal.close();
  });

  // клик мимо картинки закрывает: диалог во весь экран, и промах по фону
  // читается как «закрыть», а не как «ничего не делать»
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.close();
  });
})();
