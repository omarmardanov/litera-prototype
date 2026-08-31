// Виджет связи. Кнопка раскрывает список каналов — как «Кнопка на сайт»
// Битрикс24 на живом сайте.
//
// Разработчику: родной запускающий элемент Битрикса спрятать, а его чат

// сейчас в списке только мессенджеры.

(function () {
  var fab = document.querySelector('.ls-chat-fab');
  var list = document.getElementById('chat-list');
  if (!fab || !list) return;

  var open = false;

  function set(on) {
    open = on;
    list.hidden = false;              // hidden только до первого открытия
    list.classList.toggle('ls-is-open', on);
    fab.setAttribute('aria-expanded', String(on));
    fab.setAttribute('aria-label', on ? 'Закрыть' : 'Связаться');
  }

  fab.addEventListener('click', function () { set(!open); });

  // переход по каналу — список закрывается
  list.addEventListener('click', function (e) {
    if (e.target.closest('.ls-chat-item')) set(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) { set(false); fab.focus(); }
  });

  // клик мимо закрывает: виджет висит поверх страницы и перехватывать
  // внимание после выбора не должен
  document.addEventListener('pointerdown', function (e) {
    if (open && !e.target.closest('.ls-chat')) set(false);
  });
})();
