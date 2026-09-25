import{S as u,N as f,P as p,K as b,A as _}from"./assets/vendor-CjcO6L7U.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const g="https://wedding-photographer.b.goit.study/api/feedbacks",i=document.querySelector(".feedbacks__list"),c=document.querySelector(".feedbacks__button--prev"),d=document.querySelector(".feedbacks__button--next");function k({name:t,descr:o}){return`
    <li class="feedbacks__item swiper-slide">
      <blockquote class="feedbacks__quote">
        <p class="feedbacks__text">${o}</p>
        <footer class="feedbacks__footer">
          <cite class="feedbacks__author">${t}</cite>
        </footer>
      </blockquote>
    </li>
  `}function a(t){c.disabled=t.isBeginning,d.disabled=t.isEnd}function m(){return new u(".feedbacks__slider",{modules:[f,p,b,_],slidesPerView:1,spaceBetween:24,navigation:{prevEl:c,nextEl:d},pagination:{el:".feedbacks__pagination",clickable:!0},keyboard:{enabled:!0,onlyInViewport:!0},a11y:{prevSlideMessage:"Previous feedback",nextSlideMessage:"Next feedback"},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}},on:{init:a,slideChange:a}})}async function y(){if(i)try{const t=await fetch(g);if(!t.ok)throw new Error(`Failed to load feedbacks: ${t.status}`);const{feedbacks:o}=await t.json();i.innerHTML=o.map(k).join(""),m()}catch(t){i.innerHTML='<li class="feedbacks__item feedbacks__item--error">Unable to load feedbacks right now. Please try again later.</li>',console.error(t)}}y();
//# sourceMappingURL=index.js.map
