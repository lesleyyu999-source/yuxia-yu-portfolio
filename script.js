const loader=document.querySelector('.loader'),enter=document.querySelector('.enter'),percent=document.querySelector('.loader-wheel strong'),ring=document.querySelector('.progress-ring');let progress=0;
const timer=setInterval(()=>{progress=Math.min(100,progress+Math.ceil(Math.random()*7));percent.textContent=`${progress}%`;ring.style.strokeDashoffset=540-(540*progress/100);if(progress===100){clearInterval(timer);enter.disabled=false;enter.classList.add('ready');percent.style.opacity='0'}},55);

let audioContext,masterGain,soundOn=true;
function startAmbient(){if(audioContext)return;audioContext=new(window.AudioContext||window.webkitAudioContext)();masterGain=audioContext.createGain();masterGain.gain.value=.025;masterGain.connect(audioContext.destination);[110,164.81,220].forEach((frequency,index)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type=index===1?'sine':'triangle';osc.frequency.value=frequency;gain.gain.value=index===1?.18:.09;osc.connect(gain).connect(masterGain);osc.start()})}
enter.addEventListener('click',()=>{startAmbient();loader.classList.add('out');document.body.classList.remove('locked');document.querySelector('.portfolio-stage').classList.add('entered');setTimeout(()=>loader.hidden=true,1100)});
document.querySelector('.sound').addEventListener('click',e=>{soundOn=!soundOn;if(masterGain)masterGain.gain.setTargetAtTime(soundOn?.025:0,audioContext.currentTime,.08);e.currentTarget.querySelector('i').textContent=soundOn?'ON':'OFF'});

const works=[document.querySelector('.work-hr'),document.querySelector('.work-route'),document.querySelector('.work-health'),document.querySelector('.work-business')],label=document.querySelector('.active-label'),stageName=document.querySelector('.stage-name'),reflection=document.querySelector('.work-reflection');let active=0,autoTimer;
function render(direction=1){works.forEach((work,index)=>{work.classList.remove('active','before');if(index===active)work.classList.add('active');else if(index===(active-1+works.length)%works.length)work.classList.add('before');work.setAttribute('aria-hidden',index===active?'false':'true')});const current=works[active];label.textContent=current.dataset.label;stageName.textContent=current.dataset.label;reflection.style.background=`linear-gradient(${['#dbe6f2aa','#bceff0aa','#efd8e8aa','#ead3a8aa'][active]},transparent)`}
function move(step){active=(active+step+works.length)%works.length;render(step)}
document.querySelector('.next').addEventListener('click',()=>move(1));document.querySelector('.prev').addEventListener('click',()=>move(-1));
document.querySelector('.spin').addEventListener('click',e=>{if(autoTimer){clearInterval(autoTimer);autoTimer=null;e.currentTarget.textContent='↻'}else{autoTimer=setInterval(()=>move(1),3500);e.currentTarget.textContent='×'}});render();

works.forEach(work=>{const surface=work.querySelector('.work-surface');work.addEventListener('pointermove',e=>{if(!work.classList.contains('active'))return;const r=surface.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;surface.style.transform=`rotateX(${-y*7}deg) rotateY(${x*10}deg)`});work.addEventListener('pointerleave',()=>surface.style.transform='')});

const fragments=document.querySelectorAll('[data-depth]');window.addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;fragments.forEach(el=>{const d=Number(el.dataset.depth);el.style.translate=`${x*d}px ${y*d}px`})},{passive:true});

const sceneObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in-view')}),{threshold:.18});
document.querySelectorAll('.profile-scene,.contact-scene').forEach(scene=>sceneObserver.observe(scene));
document.querySelectorAll('.tilt-card').forEach(card=>{card.addEventListener('pointermove',event=>{const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*3}deg) rotateY(${x*4}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')});

const langButton=document.querySelector('.lang');let language='zh';langButton.addEventListener('click',()=>{language=language==='zh'?'en':'zh';document.documentElement.lang=language==='zh'?'zh-CN':'en';document.querySelectorAll('[data-zh][data-en]').forEach(el=>el.innerHTML=el.dataset[language]);langButton.textContent=language==='zh'?'EN':'中文';document.title=language==='zh'?'余渝霞 — 数据分析作品集':'Yuxia Yu — Data Analysis Portfolio'});
document.querySelector('#year').textContent=new Date().getFullYear();

const skillBubbles=document.querySelector('.skill-bubbles');
if(skillBubbles){
  const bubbles=[...skillBubbles.querySelectorAll('.skill-bubble')],detailPanel=document.querySelector('.skill-detail-panel'),detailTitle=detailPanel.querySelector('h3'),detailList=detailPanel.querySelector('ul');
  const closeSkillDetail=()=>{
    detailPanel.classList.remove('open');
    detailPanel.setAttribute('aria-hidden','true');
    skillBubbles.classList.remove('has-active');
    bubbles.forEach(item=>item.setAttribute('aria-expanded','false'));
  };
  skillBubbles.addEventListener('click',event=>{
    const bubble=event.target.closest('button.skill-bubble');
    if(!bubble||!skillBubbles.contains(bubble))return;
    const wasOpen=bubble.getAttribute('aria-expanded')==='true';
    bubbles.forEach(item=>item.setAttribute('aria-expanded','false'));
    const ripple=document.createElement('i'),rect=bubble.getBoundingClientRect();
    ripple.className='bubble-ripple';
    ripple.style.left=`${event.clientX-rect.left}px`;
    ripple.style.top=`${event.clientY-rect.top}px`;
    bubble.appendChild(ripple);
    ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
    if(wasOpen){closeSkillDetail();return}
    detailTitle.textContent=bubble.querySelector('strong').textContent;
    detailList.replaceChildren(...bubble.dataset.skills.split('、').map(skill=>{const item=document.createElement('li');item.textContent=skill;return item}));
    bubble.setAttribute('aria-expanded','true');
    skillBubbles.classList.add('has-active');
    detailPanel.classList.add('open');
    detailPanel.setAttribute('aria-hidden','false');
  });
  detailPanel.querySelector('.skill-detail-close').addEventListener('click',closeSkillDetail);
  detailPanel.querySelector('.skill-detail-back').addEventListener('click',closeSkillDetail);
  skillBubbles.addEventListener('pointermove',event=>{
    if(innerWidth<=760)return;
    const rect=skillBubbles.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
    bubbles.forEach((bubble,index)=>{if(!bubble.classList.contains('active'))bubble.style.translate=`${x*(7+index%3*3)}px ${y*(6+index%2*4)}px`});
  });
  skillBubbles.addEventListener('pointerleave',()=>bubbles.forEach(bubble=>bubble.style.translate=''));
}

const portfolioWall=document.querySelector('.portfolio-wall');
if(portfolioWall){
  const pieces=[...portfolioWall.querySelectorAll('.portfolio-piece')],lightbox=portfolioWall.querySelector('.portfolio-lightbox'),preview=lightbox.querySelector('img');
  const wallObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)portfolioWall.classList.add('in-view')}),{threshold:.12});
  wallObserver.observe(portfolioWall);
  portfolioWall.addEventListener('pointermove',event=>{
    if(innerWidth<=760||lightbox.classList.contains('open'))return;
    const x=event.clientX/innerWidth-.5,y=event.clientY/innerHeight-.5;
    pieces.forEach(piece=>{const depth=Number(piece.style.getPropertyValue('--d'));piece.style.translate=`${x*depth}px ${y*depth}px`});
  });
  portfolioWall.addEventListener('pointerleave',()=>pieces.forEach(piece=>piece.style.translate=''));
  pieces.forEach(piece=>piece.addEventListener('click',()=>{preview.src=piece.querySelector('img').src;preview.alt=piece.querySelector('img').alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
  const closePortfolio=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';setTimeout(()=>preview.src='',350)};
  lightbox.querySelector('button').addEventListener('click',closePortfolio);
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)closePortfolio()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&lightbox.classList.contains('open'))closePortfolio()});
}

const flowSections=[...document.querySelectorAll('main>section')];
const revealTargets=flowSections.flatMap(section=>[...section.querySelectorAll(':scope>.about-duo,:scope>.carousel,:scope>.skill-bubbles,:scope>.portfolio-canvas,:scope>.contact-glass-list')]);
revealTargets.forEach(target=>target.classList.add('flow-reveal'));
const flowObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const targets=entry.target.querySelectorAll(':scope>.flow-reveal');
  targets.forEach(target=>target.classList.toggle('flow-visible',entry.isIntersecting));
  entry.target.classList.toggle('flow-active',entry.isIntersecting);
}),{threshold:.12,rootMargin:'-8% 0px -8% 0px'});
flowSections.forEach(section=>flowObserver.observe(section));

const navLinks=[...document.querySelectorAll('.topbar nav a')],progressBar=document.querySelector('.scroll-progress');
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
}),{rootMargin:'-36% 0px -54% 0px',threshold:0});
['about','experience','skills','internship-detail','contact'].forEach(id=>{const section=document.getElementById(id);if(section)navObserver.observe(section)});
const updateScrollProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progressBar.style.width=`${max>0?scrollY/max*100:0}%`};
addEventListener('scroll',updateScrollProgress,{passive:true});
addEventListener('resize',updateScrollProgress,{passive:true});
updateScrollProgress();

const aboutScene=document.querySelector('#about'),aboutPhoto=document.querySelector('.about-portrait-float'),aboutWater=document.querySelector('.about-water');
if(aboutScene&&aboutPhoto&&aboutWater){
  aboutScene.addEventListener('pointermove',event=>{
    if(innerWidth<=700)return;
    const rect=aboutScene.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
    aboutPhoto.style.translate=`${x*13}px ${y*9}px`;
    aboutWater.style.translate=`${x*-18}px ${y*-12}px`;
  });
  aboutScene.addEventListener('pointerleave',()=>{aboutPhoto.style.translate='';aboutWater.style.translate=''});
}
