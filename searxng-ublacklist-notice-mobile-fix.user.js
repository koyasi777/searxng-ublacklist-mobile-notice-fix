// ==UserScript==
// @name         SearXNGでUBlacklist通知をモバイル最適化 📱
// @name:ja      SearXNGでUBlacklist通知をモバイル最適化 📱
// @name:en      Optimize UBlacklist Notice on SearXNG Mobile 📱
// @name:zh-CN   在 SearXNG 移动端优化 UBlacklist 通知 📱
// @name:zh-TW   在 SearXNG 行動版最佳化 UBlacklist 通知 📱
// @name:ko      SearXNG 모바일에서 UBlacklist 알림 최적화 📱
// @name:fr      Optimiser la notification UBlacklist sur SearXNG Mobile 📱
// @name:es      Optimizar notificación de UBlacklist en SearXNG móvil 📱
// @name:de      UBlacklist-Hinweise auf SearXNG mobil optimieren 📱
// @name:pt-BR   Otimizar notificação do UBlacklist no SearXNG Mobile 📱
// @name:ru      Оптимизировать уведомления UBlacklist на SearXNG Mobile 📱
// @version      1.0.0
// @description         Repositions UBlacklist notices below search filters on SearXNG mobile pages for better visibility.
// @description:ja      SearXNGの検索結果ページに表示されるUBlacklist通知を、モバイル表示時に見やすく再配置します。
// @description:zh-CN   在 SearXNG 移动端将 UBlacklist 通知移到搜索过滤器下方以提高可见性。
// @description:zh-TW   在 SearXNG 行動裝置上將 UBlacklist 通知移到搜尋篩選器下方以提升可見性。
// @description:ko      SearXNG 모바일 환경에서 UBlacklist 알림을 검색 필터 아래로 옮겨 가시성을 개선합니다。
// @description:fr      Sur SearXNG mobile, déplace les notifications UBlacklist sous les filtres pour une meilleure visibilité.
// @description:es      Mejora la visibilidad de las notificaciones de UBlacklist en móviles moviéndolas debajo de los filtros en SearXNG.
// @description:de      Verschiebt UBlacklist-Hinweise auf mobilen SearXNG-Seiten unter die Filter zur besseren Sichtbarkeit.
// @description:pt-BR   Melhora a visibilidade das notificações do UBlacklist no SearXNG mobile, reposicionando-as abaixo dos filtros.
// @description:ru      Перемещает уведомления UBlacklist под фильтры на мобильных страницах SearXNG для лучшей видимости.
// @namespace    https://github.com/koyasi777/searxng-ublacklist-mobile-notice-fix
// @author       koyasi777
// @match        *://*/searx/search*
// @match        *://*/searxng/search*
// @match        *://searx.*/*
// @match        *://*.searx.*/*
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/koyasi777/searxng-ublacklist-mobile-notice-fix
// @supportURL   https://github.com/koyasi777/searxng-ublacklist-mobile-notice-fix/issues
// @icon         https://docs.searxng.org/_static/searxng-wordmark.svg
// ==/UserScript==

(function () {
  'use strict';

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function relocateUBlacklistNotice() {
    if (!isMobile()) return;

    const container = document.querySelector('.search_filters');
    if (!container) return;

    const computedStyle = getComputedStyle(container);
    const paddingLeft = computedStyle.paddingLeft || '1rem';
    const marginLeft = computedStyle.marginLeft || '0rem';

    const allSpans = Array.from(document.querySelectorAll('span')).filter(
      el => !el.dataset.relocated && el.querySelector('span.ub-button')
    );

    const notificationSpans = allSpans.filter(span => {
      const hasText = Array.from(span.childNodes).some(node =>
        node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
      );
      return hasText;
    });

    notificationSpans.forEach(span => {
      const wrapper = document.createElement('div');
      wrapper.style.marginTop = '8px';
      wrapper.style.marginBottom = '12px';
      wrapper.style.paddingLeft = paddingLeft;
      wrapper.style.marginLeft = marginLeft;
      wrapper.style.fontSize = '90%';
      wrapper.style.color = '#aaa';
      wrapper.style.display = 'block';

      span.dataset.relocated = 'true';
      wrapper.appendChild(span);
      container.insertAdjacentElement('afterend', wrapper);
    });
  }

  const observer = new MutationObserver(() => {
    relocateUBlacklistNotice();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('load', relocateUBlacklistNotice);
  document.addEventListener('DOMContentLoaded', relocateUBlacklistNotice);
})();
