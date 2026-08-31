const menu=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(menu){
  menu.addEventListener('click',()=>{
    const open=links.classList.toggle('open');
    menu.setAttribute('aria-expanded',open);
  });
}
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();


// SweetSonic v3.5.2 hero motion: Sound → Technology → Creativity
const heroWords = document.querySelectorAll('.hero-word');
let heroIndex = 0;

function rotateHeroWords(){
  heroWords.forEach((word, i) => {
    word.classList.toggle('active', i === heroIndex);
  });
  heroIndex = (heroIndex + 1) % heroWords.length;
}

if (heroWords.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(rotateHeroWords, 3000);
}
