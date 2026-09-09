// Памятка «Требования к макетам» крупно, поверх страницы.
//
// Строка остаётся ссылкой на страницу требований: без скрипта клик просто
// уводит туда, и это рабочий запасной путь. Скрипт перехватывает клик
// и показывает схему в диалоге — человек в этот момент собирается прислать
// макет, и уводить его со страницы услуги не нужно.

(function () {
  var link = document.querySelector('.ls-ba-req .ls-row-body');
  var modal = document.querySelector('.ls-modal-pic');
  if (!link || !modal || !modal.showModal) return;

  link.addEventListener('click', function (e) {
    e.preventDefault();
    modal.showModal();
  });

  modal.querySelector('.ls-modal-close').addEventListener('click', function () {
    modal.close();
  });

  // клик мимо картинки закрывает: диалог во весь экран, и промах по фону
  // читается как «закрыть», а не как «ничего не делать»
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.close();
  });
})();
