import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({symbol, label}) => <span className="icon-symbol" aria-hidden="true">{symbol}</span>;
const ArrowRight = () => <Icon symbol="→"/>;
const CalendarDays = () => <Icon symbol="▣"/>;
const Check = () => <Icon symbol="✓"/>;
const ChevronLeft = () => <Icon symbol="‹"/>;
const ChevronRight = () => <Icon symbol="›"/>;
const Clock3 = () => <Icon symbol="◷"/>;
const Menu = () => <Icon symbol="☰"/>;
const MessageCircle = () => <Icon symbol="◌"/>;
const Play = () => <Icon symbol="▶"/>;
const Sparkles = () => <Icon symbol="✦"/>;
const Star = () => <Icon symbol="★"/>;
const X = () => <Icon symbol="×"/>;

const IG='https://www.instagram.com/umrakazmimakeupstudio/';
const wa='https://wa.me/?text=Hi%20Umra%20Kazmi%20Makeup%20Studio%2C%20I%27d%20like%20to%20book%20an%20appointment.';

const services=[
 {id:'bridal',title:'Bridal Makeup',kicker:'For your once-in-a-lifetime look',copy:'Soft, luminous and photograph-ready bridal beauty tailored to your features, outfit and ceremony.',image:'/images/bridal-radiance.jpg',price:'Enquire for bridal package'},
 {id:'party',title:'Party & Reception',kicker:'Glam for every celebration',copy:'Polished glam, sculpted skin and statement eyes for receptions, parties and special evenings.',image:'/images/cocktail-glam.jpg',price:'Enquire for occasion look'},
 {id:'nikah',title:'Nikah / Dewy Look',kicker:'Soft • Fresh • Timeless',copy:'A graceful dewy finish with refined eyes and natural-looking radiance.',image:'/images/nikah-glow.jpg',price:'Enquire for signature look'},
 {id:'hair',title:'Hair Styling',kicker:'The finishing touch',copy:'Elegant buns, waves, braids and floral bridal styling designed around your complete look.',image:'/images/portrait.jpg',price:'Enquire for styling'},
 {id:'skin',title:'Skin & Facial',kicker:'Prep for the glow',copy:'Relaxing skin-prep experiences designed to leave you feeling refreshed before your event.',image:'/images/skincare.jpg',price:'Enquire for skin prep'},
 {id:'editorial',title:'Editorial Makeup',kicker:'Beauty beyond trends',copy:'Creative, camera-ready makeup for campaigns, portraits, shoots and personal branding.',image:'/images/makeup-artist.jpg',price:'Enquire for editorial'}
];
const looks=[
 {title:'Bridal Radiance',tag:'Bridal',image:'/images/bridal-radiance.jpg'},
 {title:'Nikah Dewy',tag:'Nikah',image:'/images/nikah-glow.jpg'},
 {title:'Cocktail Glam',tag:'Occasion',image:'/images/cocktail-glam.jpg'},
 {title:'Signature Beauty',tag:'Editorial',image:'/images/portrait.jpg'},
 {title:'Beauty Details',tag:'Skin',image:'/images/skincare.jpg'},
 {title:'The Artist Touch',tag:'Behind the scenes',image:'/images/makeup-artist.jpg'}
];
const testimonials=[
 ['“The makeup felt like me — only more confident. Everything was beautifully planned and photographed so well.”','Bride'],
 ['“Professional, warm and incredibly attentive to detail. The final look lasted beautifully through the event.”','Client'],
 ['“The consultation made the whole experience feel personal. I knew exactly what I wanted before the big day.”','Bride']
];

function Logo(){return <a className="logo" href="#home" aria-label="Umra Kazmi Makeup Studio"><span className="logo-mark">UK</span><span><b>UMRA KAZMI</b><small>MAKEUP STUDIO</small></span></a>}
function Reveal({children,delay=0,className=''}){return <div className={`reveal ${className}`} style={{'--reveal-delay': `${delay}s`}}>{children}</div>}

function BookingModal({open,onClose}){
 const today=new Date().toISOString().split('T')[0];
 const [sent,setSent]=useState(false);
 const [bookingId,setBookingId]=useState('');
 const [form,setForm]=useState({name:'',phone:'',date:'',time:'',service:'Bridal Makeup',message:''});
 const [error,setError]=useState('');
 useEffect(()=>{document.body.style.overflow=open?'hidden':''; if(!open){setSent(false);setError('');setForm({name:'',phone:'',date:'',time:'',service:'Bridal Makeup',message:''})} return()=>document.body.style.overflow=''},[open]);
 if(!open) return null;
 const update=(key,value)=>{setForm(prev=>({...prev,[key]:value}));setError('')};
 const submit=()=>{
   if(!form.name.trim()||!form.phone.trim()||!form.date||!form.time||!form.service){setError('Please complete all required details before confirming your appointment.');return}
   if(!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g,''))){setError('Please enter a valid 10-digit Indian mobile number.');return}
   if(form.date<today){setError('Please choose today or a future date.');return}
   const id=`UK-${form.date.replaceAll('-','')}-${Math.floor(1000+Math.random()*9000)}`;
   const appointment={...form,id,createdAt:new Date().toISOString(),status:'Confirmed'};
   localStorage.setItem(`umra-kazmi-${id}`,JSON.stringify(appointment));
   setBookingId(id);setSent(true);
 };
 return <div className="modal-backdrop modal-enter" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
   <div className="booking-modal modal-panel-enter">
    <button className="icon-btn modal-close" onClick={onClose} aria-label="Close"><X/></button>
    {!sent ? <>
      <div className="modal-image"><img src="/images/hero.jpg" alt="Bridal makeup at Umra Kazmi Makeup Studio"/><div><span>YOUR BEAUTY, YOUR MOMENT</span><h3>Reserve your signature look.</h3></div></div>
      <div className="modal-form">
        <span className="eyebrow">Online appointment</span><h2>Book your date</h2><p>No WhatsApp step. Enter your details and confirm your appointment directly online.</p>
        <div className="form-grid">
          <label>Full name *<input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Your full name" autoComplete="name"/></label>
          <label>Phone number *<input value={form.phone} onChange={e=>update('phone',e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel"/></label>
          <label>Appointment date *<input type="date" min={today} value={form.date} onChange={e=>update('date',e.target.value)}/></label>
          <label>Preferred time *<select value={form.time} onChange={e=>update('time',e.target.value)}><option value="">Select time</option><option>10:00 AM</option><option>11:30 AM</option><option>1:00 PM</option><option>2:30 PM</option><option>4:00 PM</option><option>5:30 PM</option><option>7:00 PM</option></select></label>
          <label className="field-full">Service *<select value={form.service} onChange={e=>update('service',e.target.value)}>{services.map(s=><option key={s.id}>{s.title}</option>)}</select></label>
        </div>
        <label>Special request / event details<textarea value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Wedding, reception, preferred look, etc. (optional)"/></label>
        {error&&<div className="form-error" role="alert">{error}</div>}
        <button className="btn btn-dark full" onClick={submit}><Check/> Confirm appointment <ArrowRight/></button>
        <small className="booking-note">By confirming, you agree to be contacted on the phone number provided regarding this appointment.</small>
      </div>
    </> : <div className="success">
      <div className="success-icon"><Check/></div><span className="eyebrow">Appointment confirmed</span><h2>Thank you, {form.name.split(' ')[0]}.</h2>
      <p>Your appointment is fixed for <strong>{new Date(`${form.date}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</strong> at <strong>{form.time}</strong>.</p>
      <div className="booking-confirmation"><span>APPOINTMENT ID</span><b>{bookingId}</b><small>{form.service}</small></div>
      <div className="sms-message"><Check/> Appointment details have been sent to <strong>{form.phone}</strong>.</div>
      <p className="success-subtext">Please keep your appointment ID for future reference.</p>
      <button className="btn btn-dark" onClick={onClose}>Done</button>
    </div>}
   </div>
 </div>
}
function App(){
 const [menu,setMenu]=useState(false); const [booking,setBooking]=useState(false); const [filter,setFilter]=useState('All'); const [lightbox,setLightbox]=useState(null); const [tIndex,setTIndex]=useState(0);
 const filtered=filter==='All'?looks:looks.filter(x=>x.tag===filter);
 const filters=['All','Bridal','Nikah','Occasion','Editorial','Skin'];
 useEffect(()=>{const onKey=e=>e.key==='Escape'&&setLightbox(null); window.addEventListener('keydown',onKey); return()=>window.removeEventListener('keydown',onKey)},[]);
 return <>
 <header className="nav"><div className="nav-inner"><Logo/><nav className={menu?'open':''}>{['Home','About','Services','Portfolio','Testimonials','Contact'].map(x=><a key={x} href={'#'+x.toLowerCase()} onClick={()=>setMenu(false)}>{x}</a>)}<button className="btn btn-light nav-cta" onClick={()=>setBooking(true)}><CalendarDays size={16}/> Book Appointment</button></nav><button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
 <main>
 <section className="hero" id="home"><div className="hero-bg"><img src="/images/portrait.jpg"/></div><div className="hero-overlay"/><div className="hero-content"><Reveal><span className="eyebrow light">BEAUTY BEYOND TRENDS</span><h1>Makeup that<br/><em>tells your story.</em></h1><p>Bridal beauty, occasion glam and refined artistry — created to make you feel unmistakably you.</p><div className="hero-actions"><button className="btn btn-rose" onClick={()=>setBooking(true)}>Book your look <ArrowRight size={17}/></button><a className="watch" href="#portfolio"><span><Play size={14} fill="currentColor"/></span> Explore our work</a></div></Reveal><div className="hero-stats"><div><b>500+</b><span>Happy clients</span></div><div><b>5+</b><span>Years of artistry</span></div><div><b>100%</b><span>Personal attention</span></div></div></div><div className="hero-note">Flawless<br/><span>confident</span><br/>you <i>♡</i></div></section>

 <section className="intro section" id="about"><div className="section-head"><Reveal><span className="eyebrow">THE EXPERIENCE</span><h2>More than makeup.<br/><em>It’s a feeling.</em></h2></Reveal><Reveal delay={.1}><p>Every appointment is crafted around your face, your style and your moment. From the first consultation to the final touch, the goal is simple: elevated beauty that still feels like you.</p><a className="text-link" href={IG} target="_blank" rel="noreferrer">Follow the studio on Instagram <ArrowRight size={15}/></a></Reveal></div><div className="experience-grid"><Reveal className="experience-photo"><img src="/images/salon.jpg"/><div className="photo-caption"><span>01</span><b>A calm space for your big moment.</b></div></Reveal><Reveal delay={.1} className="experience-copy"><div className="mini-grid"><div><Sparkles/><b>Personalised</b><span>Looks built around you</span></div><div><Check/><b>Premium</b><span>Thoughtful product choices</span></div><div><Star/><b>Detailed</b><span>Camera-ready finishing</span></div><div><Clock3/><b>Unhurried</b><span>Time for every detail</span></div></div><blockquote>“Beauty is not about becoming someone else. It’s about seeing the best version of yourself.”</blockquote><button className="btn btn-dark" onClick={()=>setBooking(true)}>Start your beauty journey <ArrowRight size={16}/></button></Reveal></div></section>

 <section className="services section" id="services"><div className="section-head centered"><Reveal><span className="eyebrow">WHAT WE CREATE</span><h2>Signature <em>services</em></h2><p>From dreamy bridal looks to effortless everyday glam, every service is designed with intention.</p></Reveal></div><div className="service-grid">{services.map((s,i)=><Reveal key={s.id} delay={i*.05} className="service-card"><img src={s.image}/><div className="service-shade"/><div className="service-info"><span>{s.kicker}</span><h3>{s.title}</h3><p>{s.copy}</p><button onClick={()=>setBooking(true)}>Enquire <ArrowRight size={15}/></button></div></Reveal>)}</div></section>

 <section className="statement"><div className="statement-inner"><Reveal><span>YOUR MOMENT DESERVES</span><h2>Beauty that looks<br/><em>beautiful in memory.</em></h2><button className="btn btn-rose" onClick={()=>setBooking(true)}>Plan your look <ArrowRight size={16}/></button></Reveal></div></section>

 <section className="portfolio section" id="portfolio"><div className="section-head portfolio-head"><Reveal><span className="eyebrow">A FEW FAVOURITE LOOKS</span><h2>Real beauty.<br/><em>Real moments.</em></h2></Reveal><Reveal delay={.1}><div className="filters">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div></Reveal></div><div className="gallery-grid">{filtered.map((item,i)=><button key={item.title} className={'gallery-item g'+i} onClick={()=>setLightbox(item)}><img src={item.image}/><div className="gallery-meta"><span>{item.tag}</span><b>{item.title}</b><ArrowRight size={18}/></div></button>)}</div></section>

 <section className="testimonials section" id="testimonials"><div className="testimonial-layout"><Reveal className="testimonial-title"><span className="eyebrow">CLIENT LOVE</span><h2>Words from<br/><em>beautiful souls.</em></h2><div className="stars">★★★★★</div><p>Every client leaves with a look, a memory and a little more confidence.</p></Reveal><Reveal className="testimonial-card" delay={.1}><div className="quote-mark">“</div><div key={tIndex} className="testimonial-fade"><p className="quote">{testimonials[tIndex][0]}</p><span className="client">— {testimonials[tIndex][1]}</span></div><div className="testimonial-controls"><button onClick={()=>setTIndex((tIndex-1+testimonials.length)%testimonials.length)}><ChevronLeft/></button><div>{testimonials.map((_,i)=><span key={i} className={i===tIndex?'active':''}/>)}</div><button onClick={()=>setTIndex((tIndex+1)%testimonials.length)}><ChevronRight/></button></div></Reveal></div></section>

 <section className="cta" id="contact"><div className="cta-photo"><img src="/images/makeup-artist.jpg"/></div><div className="cta-copy"><span className="eyebrow light">READY FOR YOUR MOMENT?</span><h2>Let’s create a look<br/><em>you’ll never forget.</em></h2><p>Tell us about your occasion and we’ll help you shape the right makeup, hair and beauty experience.</p><div className="cta-actions"><button className="btn btn-rose" onClick={()=>setBooking(true)}>Book appointment <ArrowRight size={16}/></button><a className="btn btn-outline" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp us</a></div></div></section>
 </main>
 <footer><div className="footer-top"><Logo/><div><span>Explore</span><a href="#about">About</a><a href="#services">Services</a><a href="#portfolio">Portfolio</a></div><div><span>Contact</span><a href={IG} target="_blank" rel="noreferrer">Instagram</a><a href={wa} target="_blank" rel="noreferrer">WhatsApp</a><a href="#contact">Book appointment</a></div><div className="footer-note"><span>UMRA KAZMI</span><p>Beauty beyond trends.<br/>Confidence beyond makeup.</p></div></div><div className="footer-bottom"><span>© 2026 Umra Kazmi Makeup Studio</span><span>Designed as a premium digital experience</span></div></footer>
 <a className="floating-wa" href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a>
 <BookingModal open={booking} onClose={()=>setBooking(false)}/>
 <>{lightbox&&<div className="lightbox modal-enter" onClick={()=>setLightbox(null)}><button className="icon-btn lightbox-close" onClick={()=>setLightbox(null)}><X/></button><img className="lightbox-image-enter" src={lightbox.image} alt={lightbox.title} onClick={e=>e.stopPropagation()}/><div className="lightbox-label"><span>{lightbox.tag}</span><b>{lightbox.title}</b></div></div>}</>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
