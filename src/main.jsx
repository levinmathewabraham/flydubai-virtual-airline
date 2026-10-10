import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";

const crewRegister = "https://vamsys.io/register/vfdb";
const crewLogin = "https://vamsys.io/login/vfdb";
const hangarLogin = "https://hangar.to/login";

const heroImages = [
  "/images/vfdb-wing.jpg",
  "/images/vfdb-parked.jpg",
  "/images/vfdb-pushback.jpg",
  "/images/vfdb-max8-air.jpg",
  "/images/vfdb-max8-cockpit.jpg",
  "/images/vfdb-approach.jpg",
  "/images/vfdb-apron-tail.jpg",
];

const photos = {
  hero: "/images/vfdb-wing.jpg",
  apron: "/images/vfdb-apron.jpg",
  fleet800: "/images/vfdb-737-800.jpg",
  fleetMax8: "/images/vfdb-max8.jpg",
  fleetMax9: "/images/vfdb-max9.jpg",
};

const fleet = [
  {
    code: "737-800",
    title: "Boeing 737-800",
    description:
      "The core workhorse of the vFDB fleet, built for the short and medium-haul network from Dubai.",
    image: photos.fleet800,
    stats: ["737NG", "Single aisle"],
  },
  {
    code: "737 MAX 8",
    title: "Boeing 737 MAX 8",
    description:
      "Next-generation efficiency for longer sectors across the vFDB network.",
    image: photos.fleetMax8,
    stats: ["MAX family", "Single aisle"],
  },
  {
    code: "737 MAX 9",
    title: "Boeing 737 MAX 9",
    description:
      "The largest aircraft in the planned vFDB fleet, ready for high-demand routes.",
    image: photos.fleetMax9,
    stats: ["MAX family", "Single aisle"],
  },
];

const regions = [
  ["Africa", "Growing connections from our home hub."],
  ["Central Asia", "Routes across the crossroads of continents."],
  ["Europe", "Longer sectors connecting Dubai with Europe."],
  [
    "Indian Subcontinent",
    "Connecting Dubai with key destinations across South Asia.",
  ],
  ["Middle East", "Regional sectors across the Gulf and beyond."],
  ["Southeast Asia", "A key part of the Dubai network."],
];

const partners = [
  {
    name: "vAMSYS",
    url: "https://vamsys.co.uk/",
    logo: {
      light: "/brand/vamsys-logo-light.png",
      dark: "/brand/vamsys-logo-dark.png",
    },
  },
  {
    name: "VATSIM",
    url: "https://vatsim.net",
    logo: {
      light: "/brand/vatsim-white.webp",
      dark: "/brand/vatsim-dark.png",
    },
  },
];

const codeshareAirlines = [
  {
    name: "Indigo Virtual",
    url: "https://vamsys.io/register/ifly",
    logo: {
      light: "/brand/indigo-virtual-white.png",
      dark: "/brand/indigo-virtual-dark.png",
    },
  },
];

const faqs = [
  [
    "How do I join vFDB?",
    "Register on vAMSYS using any of the links above. You'll then receive next steps to complete your pilot onboarding.",
  ],
  [
    "Do I need VATSIM?",
    "VATSIM is the primary online network for our operations and events. The community is designed around realistic online airline flying. However, you are free to fly offline as well.",
  ],
  [
    "Which flight simulators and softwares should I use?",
    "vFDB supports Microsoft Flight Simulator 2020 & 2024, X-Plane 11 & 12, and Prepar3D. Flights are tracked through vAMSYS Pegasus, the ACARS application used to monitor your flight activity.",
  ],
  [
    "Can I transfer my rank from another VA?",
    "Yes. Rank-transfer requests can be reviewed through the our community discord according to the current transfer policy and codeshare agreements.",
  ],
];

function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "about"],
    ["Fleet", "fleet"],
    ["Routes", "routes"],
    ["Pilot Center", "pilot-center"],
    ["Documents", "documents"],
    ["FAQ", "faq"],
    ["Community", "community"],
  ];
  const close = () => setOpen(false);
  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top vfdb-navbar ${open ? "is-open" : ""}`}
    >
      <div className="container-fluid px-3 px-lg-5">
        <a
          className="navbar-brand"
          href="#home"
          onClick={close}
          aria-label="vFDB home"
        >
          <img
            src={
              theme === "light"
                ? "/brand/vFDB-logo-color.png"
                : "/brand/vFDB-logo-white.png"
            }
            alt="vFDB"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map(([label, id]) => (
              <li className="nav-item" key={id}>
                <a className="nav-link" href={`#${id}`} onClick={close}>
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                className="theme-toggle"
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                <span className="theme-icon">
                  {theme === "dark" ? "☼" : "☾"}
                </span>
                <span>{theme === "dark" ? "Light" : "Dark"}</span>
              </button>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a
                className="btn vfdb-nav-cta"
                href={crewLogin}
                target="_blank"
                rel="noreferrer"
                onClick={close}
              >
                Crew Login <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function SectionHeading({ eyebrow, title, children, centered = false }) {
  return (
    <div className={`section-heading ${centered ? "text-center mx-auto" : ""}`}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero({ theme }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="hero-section">
      <div
        className="hero-media"
        style={{
          backgroundImage: `url("${heroImages[currentImage]}")`,
        }}
      />
      <div className="hero-tint" />
      <div className="hero-grid" />
      <div className="container position-relative z-2">
        <div className="row align-items-center min-vh-100 hero-row">
          <div className="col-lg-8 col-xl-7">
            <div className="hero-kicker">
              <span /> Virtual Airline · Dubai
            </div>
            <img
              className="hero-logo"
              src={
                theme === "light"
                  ? "/brand/vFDB-logo-color.png"
                  : "/brand/vFDB-logo-white.png"
              }
              loading="lazy"
              decoding="async"
              alt="vFDB Logo"
            />
            <h1>
              From the heart of{" "}
              <em className="hero-location">
                <span className="location-default">.دبي</span>
                <span className="location-hover">Dubai.</span>
              </em>
            </h1>
            <p className="hero-copy">
              A community-driven virtual airline for pilots who want realistic
              operations, great events, and a place to call home in the virtual
              skies.
            </p>
            <div className="d-flex flex-wrap gap-3 hero-actions">
              <a
                href={crewRegister}
                target="_blank"
                rel="noreferrer"
                className="btn btn-vfdb-primary"
              >
                Join the Crew <span>↗</span>
              </a>
              <a href="#about" className="btn btn-vfdb-ghost">
                Explore vFDB <span>↓</span>
              </a>
            </div>
            <div className="hero-meta">
              <span>OMDB / DXB</span>
              <i /> <span>FLYDUBAI</span>
              <i /> <span>فلاي دبي</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span /> Scroll to explore
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad about-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <SectionHeading
              eyebrow="About vFDB"
              title="Built around the way pilots actually fly."
            >
              vFDB brings the spirit of FlyDubai to the virtual skies with a
              focus on realistic operations, accessible flying, and a strong
              pilot community.
            </SectionHeading>
            <p className="body-copy">
              Based at Dubai International Airport, our network connects the
              Middle East with Europe, Central Asia, Indian Subcontinent,
              South-East Asia and Africa. Whether you are here for a quick
              sector or a full event, every flight is part of the same journey.
            </p>
            <div className="about-signature">
              <span className="signature-line" />
              <span>From the heart of Dubai</span>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-card about-image-card">
              <img
                src={photos.apron}
                loading="lazy"
                decoding="async"
                alt="vFDB Boeing 737 at the airport apron"
              />
              <div className="image-card-label">
                <strong>OMDB / DXB</strong>
                <span>Dubai International Airport</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section id="fleet" className="section-pad fleet-section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Fleet"
          title="Three aircraft. One home."
          centered
        >
          A focused Boeing 737 fleet designed around the network we fly and the
          operations we want to recreate.
        </SectionHeading>
        <div className="row g-4 mt-2">
          {fleet.map((aircraft, index) => (
            <div className="col-md-6 col-xl-4" key={aircraft.code}>
              <article className="fleet-card">
                <div className="fleet-photo">
                  <img
                    src={aircraft.image}
                    loading="lazy"
                    decoding="async"
                    alt={aircraft.title}
                  />
                  <div className="fleet-photo-overlay" />
                </div>
                <div className="fleet-card-top">
                  <span>vFDB FLEET</span>
                  <span>0{index + 1}</span>
                </div>
                <div className="fleet-card-content">
                  <div className="fleet-code">{aircraft.code}</div>
                  <h3>{aircraft.title}</h3>
                  <p>{aircraft.description}</p>
                  <div className="fleet-stats">
                    {aircraft.stats.map((stat) => (
                      <span key={stat}>{stat}</span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Routes({ theme }) {
  return (
    <section id="routes" className="section-pad routes-section">
      <div className="container">
        <SectionHeading eyebrow="Route Network" title="Dubai to the world.">
          Our virtual network is built around the real-world geography of
          Flydubai.
        </SectionHeading>
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <div className="route-origin">
              <span className="route-dot" />
              <div>
                <strong>DXB · OMDB</strong>
                <small>Dubai International Airport</small>
              </div>
            </div>
            <div className="route-regions mt-4">
              {regions.map(([name, desc]) => (
                <div className="region-card" key={name}>
                  <span>→</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="route-image">
              <img
                src={
                  theme === "light"
                    ? "/images/vfdb-route-network-light.png"
                    : "/images/vfdb-route-network-dark.png"
                }
                loading="lazy"
                decoding="async"
                alt="Route network of Flydubai from its hub, Dubai"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PilotCenter() {
  return (
    <section id="pilot-center" className="section-pad pilot-section">
      <div className="container">
        <div className="pilot-card">
          <div className="pilot-glow" />
          <div className="row align-items-center g-5 position-relative z-1">
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Pilot Center"
                title="Your flight. Your cockpit. Your vFDB."
              >
                We are a <span>vAMSYS</span> based virtual airline and we use
                vAMSYS Pegasus for ACARS reporting. Access your crew portal,
                manage your virtual operations, and stay connected with the vFDB
                community.
              </SectionHeading>
              <div className="d-flex flex-wrap gap-3 pt-2">
                <a
                  href={crewLogin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-vfdb-primary"
                >
                  Open Crew Portal ↗
                </a>
                <a href="#documents" className="btn btn-vfdb-ghost">
                  Pilot Resources ↓
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="flight-deck-card">
                <div className="deck-header">
                  <span>vFDB / PILOT CENTER</span>
                  <b>ONLINE</b>
                </div>
                <div className="deck-route">
                  <div>
                    <small>ORIGIN</small>
                    <strong>OMDB</strong>
                    <span>Dubai/DXB</span>
                  </div>
                  <div className="deck-arrow">→</div>
                  <div className="text-end">
                    <small>CALLSIGN</small>
                    <strong>FDB</strong>
                    <span>SKYDUBAI/FZ</span>
                  </div>
                </div>
                <div className="deck-progress">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="deck-footer">
                  <span>VAMSYS</span>
                  <span>CREW PORTAL</span>
                  <span>DASHBOARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Documents() {
  return (
    <section id="documents" className="section-pad documents-section">
      <div className="container">
        <SectionHeading
          eyebrow="Documents"
          title="Know the operation."
          centered
        >
          Operational manuals, aircraft resources, procedures, and training
          materials are available to registered vFDB pilots through vAMSYS
          Hangar. Before joining our crew, take a moment to familiarize yourself
          with our company policies.
          <div className="pt-3 d-flex flex-wrap justify-content-center gap-2">
            <a
              href={hangarLogin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-vfdb-primary"
            >
              vAMSYS Hangar <span>↗</span>
            </a>
            <a
              href="https://drive.google.com/drive/folders/1O5_cxABYcZ-akbJrymHOLE9nJTmFWDxM"
              target="_blank"
              rel="noreferrer"
              className="btn btn-vfdb-ghost"
            >
              Company Policy <span>↗</span>
            </a>
          </div>
        </SectionHeading>
      </div>
    </section>
  );
}

function Partners({ theme }) {
  return (
    <section className="partners-section section-pad-sm">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="partner-label">Partners</div>
            <div className="partner-logos">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  className="partner-logo"
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={partner.name}
                >
                  <img
                    src={
                      theme === "light" ? partner.logo.light : partner.logo.dark
                    }
                    loading="lazy"
                    decoding="async"
                    alt={partner.name}
                  />
                </a>
              ))}
            </div>
            <p>
              Infrastructure and platform partners that power our operations.
            </p>
          </div>

          <div className="col-lg-6">
            <div className="partner-label">Codeshare Airlines</div>
            <div className="codeshare-logos">
              {codeshareAirlines.map((codeshare) => (
                <a
                  key={codeshare.name}
                  className="partner-logo"
                  href={codeshare.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={codeshare.name}
                >
                  <img
                    src={
                      theme === "light"
                        ? codeshare.logo.light
                        : codeshare.logo.dark
                    }
                    loading="lazy"
                    decoding="async"
                    alt={codeshare.name}
                  />
                </a>
              ))}
            </div>
            <p>
              Working together across the virtual skies through codeshare
              partnerships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="section-pad faq-section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <SectionHeading eyebrow="FAQ" title="Questions before takeoff?">
              A few of the things pilots usually want to know before joining the
              flight deck.
            </SectionHeading>
          </div>
          <div className="col-lg-8">
            <div className="accordion vfdb-accordion" id="vfdbFaq">
              {faqs.map(([q, a], i) => (
                <div className="accordion-item" key={q}>
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${i}`}
                      aria-expanded={i === 0}
                      aria-controls={`faq-${i}`}
                    >
                      {q}
                      <span>+</span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                    data-bs-parent="#vfdbFaq"
                  >
                    <div className="accordion-body">{a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="community-section">
      <div className="community-bg" />
      <div className="container position-relative z-2 text-center">
        <div className="section-eyebrow">Community</div>
        <h2>
          Ready for your
          <br />
          <em>next flight?</em>
        </h2>
        <p>
          Join the vFDB community discord through vAMSYS, meet fellow pilots,
          take part in events, and make Dubai your home in the virtual skies.
        </p>
        <a
          href={crewRegister}
          target="_blank"
          rel="noreferrer"
          className="btn btn-vfdb-primary btn-lg"
        >
          Join vAMSYS ↗
        </a>
      </div>
    </section>
  );
}

function Footer({ theme }) {
  return (
    <footer className="vfdb-footer">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-5">
            <img
              className="footer-logo"
              src={
                theme === "light"
                  ? "/brand/vFDB-logo-color.png"
                  : "/brand/vFDB-logo-white.png"
              }
              alt="vFDB"
            />
            <p>From the heart of Dubai.</p>
          </div>
          <div className="col-lg-7">
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#fleet">Fleet</a>
              <a href="#routes">Routes</a>
              <a href="#pilot-center">Pilot Center</a>
              <a href="#documents">Documents</a>
              <a href="#faq">FAQ</a>
              <a href="#community">Community</a>
            </div>
            <div className="text-lg-end">
              <small>
                &copy; {new Date().getFullYear()} vFDB Virtual Airline. This
                site is a non-profit virtual airline created solely for flight
                simulation. We have no affiliation with any real-world airline
                or organization.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("vfdb-theme") || "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("vfdb-theme", theme);
  }, [theme]);
  return (
    <div className="vfdb-app">
      <Navbar
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <Hero theme={theme} />
      <About />
      <Fleet />
      <Routes theme={theme} />
      <PilotCenter />
      <Documents />
      <Partners theme={theme} />
      <FAQ />
      <Community />
      <Footer theme={theme} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
