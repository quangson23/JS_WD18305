'use strict';

///////////////////////////////////////
// Modal window
const nav=document.querySelector('.nav');
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

//menu fade animation
const handleHover=function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el!==link) el.style.opacity=opacity;
    });
    logo.style.opacity=opacity;
  }
};

nav.addEventListener('mouseover',function(e){
  handleHover(e,0.5);
}); 

nav.addEventListener('mouseout',function(e){
  handleHover(e,1);
}); 

//sticky navigation
const initialCoords=section1.getBoundingClientRect();
window.addEventListener('scroll',function(){
  if(this.window.scrollY>initialCoords.top) 
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//slider
const slides=document.querySelectorAll('slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
const dotContainer=document.querySelector('.dots');

let curSlide=0;
const maxSlide=slides.length;

// const slider=document.querySelector('.slider');
// slider.style.transform='scale(0.4) translateX(-800px)';
// slider.style.overflow='visible';

const createDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createDots();

const activateDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`);
};

const goToSlide=function(slide){
  slides.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-slide)}%)`));
}
goToSlide(0);

const nextSlide=function(){
  if(curSlide===maxSlide-1){
    curSlide=0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide=function(){
  if(curSlide===0){
    curSlide=maxSlide-1;
  }else{
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft') prevSlide();
  e.key==='ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
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

