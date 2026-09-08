// Шторка «Лечим макеты».
//
// Позиция живёт в CSS-переменной --pos: по ней обрезается верхний слой
// и стоит ручка. На десктопе шторка просто идёт за курсором — тянуть
// и зажимать ничего не надо, достаточно провести мышью по кадру.
//
// Ползунок под ней остаётся: это клавиатура и телефон, где курсора нет.
// Без скрипта он работает сам по себе, просто картинку не двигает.

(function () {
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.querySelectorAll('.ls-ba-frame').forEach(function (frame) {
    var range = frame.querySelector('.ls-ba-range');
    if (!range) return;

    function set(percent) {
      frame.style.setProperty('--pos', percent + '%');
      range.value = percent;
    }

    range.addEventListener('input', function () { set(range.value); });

    // Показ при появлении: шторка один раз проходит туда-сюда, чтобы было
    // понятно, что кадр живой. Дальше блок слушается курсора.
    if ('IntersectionObserver' in window) {
      var shown = false;
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || shown) return;
          shown = true;
          frame.classList.add('is-demo');
          frame.addEventListener('animationend', function done() {
            frame.classList.remove('is-demo');
            frame.removeEventListener('animationend', done);
          });
          obs.disconnect();
        });
      }, {threshold: 0.45}).observe(frame);
    }

    if (!fine) return;

    // курсор пришёл — показ обрывается, дальше ведёт человек
    frame.addEventListener('mouseenter', function () {
      frame.classList.remove('is-demo');
    });

    var frameId = 0, pending = 50;

    frame.addEventListener('mousemove', function (e) {
      var box = frame.getBoundingClientRect();
      pending = Math.min(100, Math.max(0, ((e.clientX - box.left) / box.width) * 100));
      // за курсором следим покадрово: mousemove приходит чаще, чем перерисовка
      if (!frameId) frameId = requestAnimationFrame(function () {
        frameId = 0;
        set(pending);
      });
    });

    // курсор ушёл — шторка возвращается на середину, чтобы блок не оставался
    // показанным наполовину. Возврат плавный, слежение — нет: с переходом
    // шторка тянулась бы за курсором с задержкой.
    frame.addEventListener('mouseleave', function () {
      frame.classList.add('is-easing');
      set(50);
      setTimeout(function () { frame.classList.remove('is-easing'); }, 320);
    });
  });
})();
