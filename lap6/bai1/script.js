'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll

btnScrollTo.addEventListener('click',function(e){
  const s1coords=section1.getBoundingClientRect();

  //window.scrollTo(s1coords.left+window.pageXOffset, s1coords.top+window.pageYOffset);
  // window.scrollTo({
  //   left: s1coords.left+window.pageXOffset,
  //   top: s1coords.left+window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({behavior:'smooth'});
});

//page navigation

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

//tabbed component
const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');

  if(!clicked) return;

  //active tab
  tabs.forEach(t=>t.classList.remove('operations__tap--active'));
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));

  //activate tab
  clicked.classList.add('operations__tap--active');

  //activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});

// // Event Propagation
// const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
// const randomColor=()=>
// `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   e.preventDefault();
//   this.style.backgroundColor=randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   e.preventDefault();
//   this.style.backgroundColor=randomColor();
// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   e.preventDefault();
//   this.style.backgroundColor=randomColor();
// });

