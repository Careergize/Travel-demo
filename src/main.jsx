import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUpRight, Bus, CalendarDays, Compass, MapPin, Menu, Luggage, Mountain, Phone, Route, X } from 'lucide-react'
import './style.css'

const trips = [
  { name: 'Munnar & Alleppey', time: '4 days', group: 'Hills & backwaters', photo: 'munnar.jpg', description: 'Walk through tea country, then trade the hills for an evening on the backwaters.', stops: ['Kochi arrival and drive to Munnar', 'Tea gardens and hill viewpoints', 'Alleppey backwaters', 'Return to Kochi'] },
  { name: 'Alleppey Backwater Escape', time: '2 days', group: 'Slow travel', photo: 'alleppey.jpg', description: 'Follow palm-lined canals and spend a night by the water.', stops: ['Arrive in Alleppey and explore the canals', 'Enjoy a slow morning before returning to Kochi'] },
  { name: 'Munnar Hill Retreat', time: '3 days', group: 'Mountain getaway', photo: 'munnar.jpg', description: 'Spend a long weekend among rolling tea estates and misty mountain views.', stops: ['Travel from Kochi to Munnar', 'Explore a tea estate and nearby viewpoints', 'Return to Kochi'] },
]
const busName = '45-seater bus'
const busPhoto = import.meta.env.BASE_URL + 'images/yellow-bus.jpg'
const nav = [['Tours', '#tours'], ['Our bus', '#transport'], ['About', '#about']]
const whatsappUrl = 'https://wa.me/919495658241'

function BusPhoto({ alt, priority = false }) {
  return (
    <div className="branded-bus">
      <img className="bus-photo" src={busPhoto} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />
    </div>
  )
}

function Brand() {
  return <a className="brand" href="#home"><span><Mountain size={23} /></span>Palamoottil&nbsp;<span className="brand-accent">Travels</span></a>
}

function App() {
  const [menu, setMenu] = useState(false)
  const [selection, setSelection] = useState('')
  const [name, setName] = useState('')
  const [pickup, setPickup] = useState('')
  const [date, setDate] = useState('')
  const [activeTrip, setActiveTrip] = useState(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('entered')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.benefits-intro, .trip, .bus-feature, .review-card').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  function enquire(value) {
    setSelection(value)
    document.querySelector('#enquire').scrollIntoView()
  }

  function prepareEnquiry(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fields = [['Name', 'name'], ['Phone', 'phone'], ['Interested in', 'trip'], ['Pickup location', 'pickup'], ['Travel date', 'date'], ['Notes', 'notes']]
    const message = ['Hello Palamoottil Travels, I’d like to plan a trip.', ...fields.flatMap(([label, key]) => data.get(key)?.trim() ? [label + ': ' + data.get(key).trim()] : [])].join('\n')
    window.location.assign(whatsappUrl + '?text=' + encodeURIComponent(message))
  }

  return <>
    <header id="home" className="header">
      <div className="wrap header-inner">
        <Brand />
        <button type="button" className="menu-button" aria-expanded={menu} aria-controls="navigation" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        <nav id="navigation" className={menu ? 'nav open' : 'nav'} aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}
          <a className="button dark" href="#enquire" onClick={() => setMenu(false)}>Plan my trip <ArrowUpRight size={17} /></a>
        </nav>
      </div>
    </header>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow hero-label"><MapPin size={15} /> Kerala, India</div>
              <h1 id="hero-title">Effortless travel<br /><span>starts here.</span></h1>
              <p>Hire our yellow 45-seater bus for family trips, airport transfers, and group journeys across Kerala.</p>
              <div className="flex flex-wrap gap-3">
                <a className="button orange" href="#quick-trip">Plan my ride <ArrowRight size={18} /></a>
                <a className="button hero-secondary" href="#transport">See our bus</a>
              </div>
            </div>
            <figure className="hero-vehicle">
              <BusPhoto alt="Yellow 45-seater Palamoottil Travels bus" priority />
              <figcaption><strong>45-seater bus</strong><span>Family trips & group travel</span></figcaption>
            </figure>
          </div>
          <form id="quick-trip" className="quick-trip" onSubmit={event => { event.preventDefault(); enquire(busName); document.getElementById('enquiry-phone').focus({ preventScroll: true }) }}>
            <label>Your name<input name="name" autoComplete="name" placeholder="Enter your name" value={name} onChange={event => setName(event.target.value)} /></label>
            <label>Pickup location<input name="pickup" placeholder="City or pickup point" value={pickup} onChange={event => setPickup(event.target.value)} /></label>
            <label>Travel date<input name="date" type="date" value={date} onChange={event => setDate(event.target.value)} /></label>
            <button className="button orange">Continue to enquiry <ArrowRight size={17} /></button>
          </form>
        </div>
      </section>
      <section className="travel-benefits" aria-labelledby="benefits-title">
        <div className="wrap section">
          <div className="benefits-intro">
            <div>
              <p className="eyebrow">GROUP TRAVEL WITH PALAMOOTTIL TRAVELS</p>
              <h2 id="benefits-title">Travel together.<br />Plan your own route.</h2>
              <p>From airport pickups to multi-day Kerala tours, plan one ride around your group, your luggage, and the places you want to visit.</p>
              <a className="text-link" href="#transport">See the 45-seater bus <ArrowRight size={17} /></a>
            </div>
            <div className="benefits-vehicle">
              <BusPhoto alt="" />
            </div>
          </div>
          <div className="benefits-grid">
            {[
              [Bus, 'Travel as a group', 'Keep your family or group together in one vehicle.'],
              [Route, 'Flexible stops', 'Build in sightseeing stops and breaks along the way.'],
              [Luggage, 'Room for luggage', 'Share your bag count when enquiring about the bus.'],
              [Compass, 'Point-to-point rides', 'Arrange pickups for flights, hotels, and events.'],
            ].map(([Icon, title, copy]) => (
              <article key={title}>
                <span className="benefit-icon"><Icon size={21} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section" id="tours">
        <div className="section-heading">
          <div><p className="eyebrow">TOUR IDEAS</p><h2 className="tours-title">Find your <em>Kerala escape.</em></h2></div>
          <p>Explore sample itineraries you can adapt to your dates, interests, and group size.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {trips.map((trip, index) => <article className="trip" key={trip.name}>
            <div className={'trip-photo photo-' + index}><img src={import.meta.env.BASE_URL + 'images/' + trip.photo} alt={trip.photo === 'munnar.jpg' ? 'Tea plantations in Munnar' : 'Houseboat on the Alleppey backwaters'} loading="lazy" /><span><CalendarDays size={15} />{trip.time}</span></div>
            <div className="trip-body"><p className="eyebrow">{trip.group}</p><h3>{trip.name}</h3><p>{trip.description}</p>
              <button type="button" aria-expanded={activeTrip === trip.name} aria-controls={'itinerary-' + index} onClick={() => setActiveTrip(activeTrip === trip.name ? null : trip.name)} className="text-link">{activeTrip === trip.name ? 'Hide itinerary' : 'View itinerary'} <ArrowRight size={17} /></button>
              <div id={'itinerary-' + index} hidden={activeTrip !== trip.name}>
                <ol className="my-4 list-decimal space-y-2 pl-5">{trip.stops.map(stop => <li key={stop}>{stop}</li>)}</ol>
                <button className="button dark" onClick={() => enquire(trip.name)}>Plan this trip <ArrowUpRight size={16} /></button>
              </div>
            </div>
          </article>)}
        </div>
      </section>
      <section className="transport" id="transport" aria-labelledby="bus-title">
        <div className="wrap section">
          <article className="bus-feature">
            <BusPhoto alt="Yellow 45-seater Palamoottil Travels bus" />
            <div>
              <p className="eyebrow">OUR BUS</p>
              <h2 id="bus-title">45 seats. One shared ride.</h2>
              <p>Hire our yellow bus for family outings, weddings, group transfers, and Kerala sightseeing. Share your pickup point, route, and dates to check availability.</p>
              <button className="button orange" onClick={() => enquire(busName)}>Check availability <ArrowUpRight size={17} /></button>
            </div>
          </article>
        </div>
      </section>
      <section id="about" className="wrap section about">
        <img src={import.meta.env.BASE_URL + 'images/alleppey.jpg'} alt="Houseboats on the Alleppey backwaters" loading="lazy" />
        <div><p className="eyebrow">ABOUT PALAMOOTTIL TRAVELS</p><h2>See more of Kerala at your own pace.</h2><p>Palamoottil Travels brings itinerary ideas and transport planning together. Start with a destination you’ve been wanting to see, then shape the route around the time you have and the people travelling with you.</p><a className="text-link" href="#enquire">Start planning <ArrowRight size={18} /></a></div>
      </section>
      <section className="faq" aria-labelledby="faq-title">
        <div className="wrap section faq-layout">
          <div><p className="eyebrow">TRIP PLANNING</p><h2 id="faq-title">Before you go.</h2></div>
          <div>
            <details><summary>Can I customise an itinerary?</summary><p>Yes. Choose a sample tour or select Custom itinerary in the enquiry form. Include your preferred stops, trip length, and group size.</p></details>
            <details><summary>How many passengers can the bus seat?</summary><p>Our bus seats 45 passengers. Include your group size and luggage needs when you enquire.</p></details>
            <details><summary>What information should I include for an airport pickup?</summary><p>Include your arrival airport, flight number, arrival time, passenger count, and drop-off address in the trip notes.</p></details>
          </div>
        </div>
      </section>
      <section className="enquiry" id="enquire">
        <div className="wrap section enquiry-grid">
          <div><p className="eyebrow">TRIP ENQUIRIES</p><h2>Where would you like to go?</h2><p>Share your dates, destination, and group size to put together an enquiry.</p></div>
          <form onSubmit={prepareEnquiry}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>Your name<input required name="name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} /></label>
              <label>Phone number<input id="enquiry-phone" required name="phone" type="tel" autoComplete="tel" /></label>
              <label>Interested in<select name="trip" value={selection} onChange={event => setSelection(event.target.value)}><option value="">Choose an option</option>{[...trips.map(trip => trip.name), busName, 'Custom itinerary'].map(item => <option key={item}>{item}</option>)}</select></label>
              <label>Pickup location<input name="pickup" value={pickup} onChange={event => setPickup(event.target.value)} /></label><label>Travel date<input name="date" type="date" value={date} onChange={event => setDate(event.target.value)} /></label>
              <label className="sm:col-span-2">Trip notes<textarea name="notes" rows="3" placeholder="Group size, pickup point, or places you’d like to visit" /></label>
            </div>
            <button className="button orange mt-5">Continue to WhatsApp <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
      <section className="reviews" aria-labelledby="reviews-title">
        <div className="wrap section">
          <div className="section-heading">
            <div><h2 id="reviews-title">Traveller stories.</h2></div>
            <p>Sample testimonials with placeholder portraits.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['12', 'Varun Vasanthan', 'Family getaway', 'We had time for a houseboat ride and a long lunch by the water. The kids loved it.'],
              ['47', 'Sangeetha', 'Munnar weekend', 'Stopping among the tea gardens was our favourite part of the drive.'],
              ['33', 'Gokhul Kumar', 'Group pickup', 'Travelling together made it easier to keep track of everyone and their bags.'],
            ].map(([portrait, name, trip, quote]) => (
              <figure className="review-card" key={name}>
                <div className="review-body">
                  <img className="review-avatar" src={'https://i.pravatar.cc/160?img=' + portrait} alt="" width="64" height="64" loading="lazy" />
                  <blockquote>“{quote}”</blockquote>
                  <figcaption><strong>{name}</strong><span>{trip} · Sample review</span></figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="wrap footer-grid">
            <div className="footer-brand">
        <Brand />
        <p>45-seater bus hire for Kerala tours and group transfers.</p>
        <a className="button orange" href="#enquire">Plan your trip <ArrowUpRight size={17} /></a>
      </div>
      <nav aria-label="Footer navigation"><h2>Explore</h2>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div>
        <h2>Get in touch</h2>
        <address>
          <p><MapPin size={18} aria-hidden="true" /> <span>Choonad, Oachira<br />Kollam, Kerala</span></p>
          <p><Phone size={18} aria-hidden="true" /> <span><a href="tel:+919495658241">9495658241</a><a href="tel:+919447348005">9447348005</a></span></p>
        </address>
      </div>
    </div>
    <div className="wrap footer-bottom">
      <small>© {new Date().getFullYear()} Palamoottil Travels</small>
      <details><summary>Photo credits</summary><p><a href="https://commons.wikimedia.org/wiki/File:Munnar_Tea_Plantations-WUS06964-Pano.jpg">Munnar by Rainer Halama</a> · <a href="https://commons.wikimedia.org/wiki/File:Backwaters_of_Alleppey.jpg">Alleppey by Antonysamy Xavier</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Photos cropped for display.</p></details>
    </div></footer>
    <a className="whatsapp-chat" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Palamoottil Travels on WhatsApp">
      <svg width="29" height="29" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2 22l5.5-1.4A9.8 9.8 0 1 0 12 2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.8Zm4.5-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.1-.3.1-.5 0a6.6 6.6 0 0 1-3.2-2.8c-.2-.3 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.8-1.9c-.1-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.7.3-.2.3-.8.8-.8 2s.8 2.3 1 2.5c.1.1 1.6 2.6 4.1 3.6 1.5.7 2.1.7 2.8.6.4 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.3-.4Z" />
      </svg>
    </a>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
