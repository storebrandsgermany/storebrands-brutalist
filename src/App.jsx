import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. WebGL Background (ThreeScene)
// ==========================================
function ParticleSwarm() {
  const count = 3000;
  const mesh = useRef();

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.05;
      mesh.current.rotation.x = t * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#4ade80" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}

function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ParticleSwarm />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// ==========================================
// 2. Custom Cursor
// ==========================================
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-difference hidden md:block">
      <div ref={dotRef} className="absolute w-2 h-2 bg-brand-limestrong rounded-full -ml-1 -mt-1" />
      <div ref={ringRef} className="absolute w-8 h-8 border border-brand-limestrong rounded-full -ml-4 -mt-4 transition-transform" />
    </div>
  );
}

// ==========================================
// 3. Components
// ==========================================
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 nav-glass transition-all duration-300">
    <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
      <a href="#" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 group">
        <div className="w-5 h-5 bg-brand-limestrong flex items-center justify-center transition-transform group-hover:rotate-90 duration-500">
          <div className="w-2 h-2 bg-brand-dark"></div>
        </div>
        STORE<span className="text-brand-limestrong">BRANDS</span>
      </a>
      
      <div className="hidden md:flex items-center gap-12 text-xs uppercase tracking-[0.2em] font-bold text-brand-muted">
        <a href="#expertise" className="hover:text-brand-limestrong transition-colors glitch-hover">Expertise</a>
        <a href="#scale" className="hover:text-brand-limestrong transition-colors glitch-hover">Scale</a>
        <a href="#about" className="hover:text-brand-limestrong transition-colors glitch-hover">Company</a>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-white/10 text-white bg-black/50">
          <div className="w-1.5 h-1.5 bg-brand-limestrong rounded-full animate-pulse"></div>
          Engineered in Germany
        </div>
        <a href="#contact" className="btn-sharp px-6 py-3 cursor-pointer">
          Initiate Project
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gsap-hero', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center px-6 lg:px-12 pt-20">
      <div className="max-w-[90vw] z-10">
        <div className="overflow-hidden mb-4">
          <p className="text-brand-limestrong font-bold tracking-[0.3em] uppercase text-xs md:text-sm gsap-hero opacity-0 translate-y-10">
            // Enterprise Architecture & Code
          </p>
        </div>
        
        <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] uppercase">
          <div className="overflow-hidden">
            <span className="block gsap-hero opacity-0 translate-y-full">We Build</span>
          </div>
          <div className="overflow-hidden flex items-center gap-4 md:gap-8">
            <span className="block gsap-hero opacity-0 translate-y-full text-outline hover:text-brand-limestrong cursor-default">Digital</span>
            <span className="block gsap-hero opacity-0 translate-y-full text-brand-limestrong glitch-hover">Monoliths.</span>
          </div>
        </h1>
        
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <p className="text-lg md:text-xl text-brand-muted max-w-xl font-light leading-relaxed gsap-hero opacity-0">
            Keine Standard-Templates. Wir entwickeln kompromisslose, hochskalierbare Web-, App- und E-Commerce-Ökosysteme für die Marktführer von morgen.
          </p>
          
          <a href="#expertise" className="group flex items-center gap-4 cursor-pointer gsap-hero opacity-0">
            <div className="w-16 h-16 rounded-full border border-brand-limestrong/30 flex items-center justify-center group-hover:bg-brand-limestrong transition-all duration-300">
              <svg className="w-6 h-6 text-brand-limestrong group-hover:text-brand-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest font-bold group-hover:text-brand-limestrong transition-colors">Explore Architecture</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-white/10 bg-black py-4 z-20 relative">
      <div className="flex animate-[marquee_20s_linear_infinite]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/5">
            <span className="mx-8 hover:text-brand-limestrong transition-colors">E-Commerce</span> <span className="text-brand-limestrong mx-4">*</span>
            <span className="mx-8 hover:text-brand-limestrong transition-colors">Mobile Apps</span> <span className="text-brand-limestrong mx-4">*</span>
            <span className="mx-8 hover:text-brand-limestrong transition-colors">System Integration</span> <span className="text-brand-limestrong mx-4">*</span>
            <span className="mx-8 hover:text-brand-limestrong transition-colors">High Performance Web</span> <span className="text-brand-limestrong mx-4">*</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

const Services = () => {
  return (
    <section id="expertise" className="relative min-h-screen py-32 flex items-center">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/90 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark z-20"></div>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-background-32560-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full px-6 lg:px-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 sticky top-32">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Systeme <br/>ohne <span className="text-brand-limestrong">Limit.</span>
            </h2>
            <p className="text-brand-muted text-lg mb-8">Maßgeschneiderte Infrastruktur für Unternehmen, bei denen Ausfälle oder Performance-Lags keine Option sind.</p>
            <div className="h-px w-full bg-gradient-to-r from-brand-limestrong to-transparent mb-8"></div>
            <div className="text-6xl font-black text-outline cursor-default">01.</div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="sharp-border bg-black/60 backdrop-blur-md p-10 group cursor-crosshair">
              <div className="text-brand-limestrong text-sm font-bold tracking-[0.2em] mb-8 uppercase flex items-center justify-between">
                <span>Web & Mobile</span>
                <svg className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-brand-limestrong transition-colors">Custom Applications</h3>
              <p className="text-brand-muted leading-relaxed">Wir coden native Apps und komplexe Web-Portale, die sich exakt Ihren internen Prozessen anpassen. React, Flutter, Node.js.</p>
            </div>

            <div className="sharp-border bg-black/60 backdrop-blur-md p-10 group cursor-crosshair">
              <div className="text-brand-limestrong text-sm font-bold tracking-[0.2em] mb-8 uppercase flex items-center justify-between">
                <span>Commerce</span>
                <svg className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-brand-limestrong transition-colors">Enterprise E-Commerce</h3>
              <p className="text-brand-muted leading-relaxed">Headless Commerce Architekturen. Rasant schnell, maximal konvertierend. Für Millionen-Umsätze skaliert.</p>
            </div>

            <div className="sharp-border bg-black/60 backdrop-blur-md p-10 group md:col-span-2">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-brand-limestrong text-sm font-bold tracking-[0.2em] mb-8 uppercase">Architecture & Integration</div>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-brand-limestrong transition-colors">API & Legacy Connect</h3>
                  <p className="text-brand-muted leading-relaxed mb-6">Wir verbinden Ihre neuen digitalen Frontends nahtlos mit bestehenden ERP/CRM-Monolithen (SAP, Salesforce). Perfekter Datenfluss in Echtzeit.</p>
                  <button className="btn-sharp px-6 py-3 cursor-pointer">Tech Stack ansehen</button>
                </div>
                <div className="relative h-48 bg-brand-dark border border-white/5 overflow-hidden flex items-center justify-center">
                  <div className="absolute w-full flex justify-around opacity-50">
                    {[1, 1.5, 0.8, 2, 1.2].map((dur, i) => (
                      <div key={i} className="w-px h-64 bg-brand-limestrong animate-pulse" style={{ animationDuration: \`\${dur}s\` }}></div>
                    ))}
                  </div>
                  <div className="z-10 font-mono text-brand-limestrong text-xs glitch-hover">
                    {'>'} CONNECTING_NODES...<br/>
                    {'>'} SYNC_RATE: 0.02ms<br/>
                    {'>'} STATUS: STABLE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-stat', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="scale" className="py-32 bg-[#020202] border-y border-white/5 overflow-hidden relative">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-limestrong/5 blur-[150px] pointer-events-none"></div>
      <div className="w-full px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="pt-8 md:pt-0 md:px-8 text-center gsap-stat">
            <div className="text-[6rem] lg:text-[8rem] font-black leading-none text-outline hover:text-brand-limestrong transition-colors mb-4 cursor-default">99<span className="text-brand-limestrong text-4xl">.9%</span></div>
            <div className="text-sm uppercase tracking-[0.3em] text-brand-muted font-bold">Uptime SLA</div>
          </div>
          <div className="pt-8 md:pt-0 md:px-8 text-center gsap-stat">
            <div className="text-[6rem] lg:text-[8rem] font-black leading-none text-white mb-4 cursor-default"><span className="text-brand-limestrong text-5xl">+</span>150</div>
            <div className="text-sm uppercase tracking-[0.3em] text-brand-muted font-bold">Enterprise Deployments</div>
          </div>
          <div className="pt-8 md:pt-0 md:px-8 text-center gsap-stat">
            <div className="text-[6rem] lg:text-[8rem] font-black leading-none text-outline hover:text-brand-limestrong transition-colors mb-4 cursor-default">0<span className="text-brand-limestrong text-4xl">.2s</span></div>
            <div className="text-sm uppercase tracking-[0.3em] text-brand-muted font-bold">Avg. System Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-brand-limestrong z-0"></div>
    <div className="absolute inset-0 z-0 opacity-20" style={{ 
      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
      backgroundSize: '40px 40px', 
      transform: 'perspective(500px) rotateX(60deg) translateY(-100px)', 
      animation: 'gridMove 20s linear infinite' 
    }}></div>
    <style>{`
      @keyframes gridMove { 0% { backgroundPosition: 0 0; } 100% { backgroundPosition: 0 40px; } }
    `}</style>
    
    <div className="relative z-10 text-center px-6 mix-blend-difference">
      <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-8 cursor-default">
        Deploy <br/>The Future.
      </h2>
      <a href="#contact" className="inline-flex items-center gap-4 border-2 border-white text-white px-8 py-5 text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer">
        Start Architecture Review
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7-7m7-7H3"></path></svg>
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black pt-24 pb-8 border-t border-brand-limestrong/20">
    <div className="w-full px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="lg:col-span-1">
          <a href="#" className="text-3xl font-black tracking-tighter text-white flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-brand-limestrong"></div>
            STOREBRANDS
          </a>
          <div className="border border-white/10 p-6 bg-white/[0.02]">
            <div className="text-brand-limestrong text-xs font-bold uppercase tracking-widest mb-2">// HEADQUARTER</div>
            <p className="text-brand-muted text-sm font-mono leading-relaxed mb-6">
              Tech Campus Berlin<br/>
              Musterstraße 123<br/>
              10115 Berlin, Germany
            </p>
            <div className="h-px w-full bg-white/10 mb-6"></div>
            <div className="text-white text-xl font-bold hover:text-brand-limestrong transition-colors cursor-pointer">hello@storebrands.de</div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-limestrong inline-block"></span> Capabilities
          </h4>
          <ul className="space-y-4 text-sm font-mono text-brand-muted">
            {['Web Application Dev', 'Native Mobile Apps', 'Headless Commerce', 'API Architecture', 'Cloud Infrastructure'].map(item => (
              <li key={item}><a href="#" className="hover:text-brand-limestrong transition-colors glitch-hover">{'>'} {item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-limestrong inline-block"></span> Entity
          </h4>
          <ul className="space-y-4 text-sm font-mono text-brand-muted">
            <li><a href="#" className="hover:text-brand-limestrong transition-colors glitch-hover">{'>'} Agency Manifesto</a></li>
            <li><a href="#" className="hover:text-brand-limestrong transition-colors glitch-hover">{'>'} Open Positions <span className="text-brand-dark bg-brand-limestrong px-2 py-0.5 ml-2 font-bold text-[10px]">HIRING</span></a></li>
            <li><a href="#" className="hover:text-brand-limestrong transition-colors glitch-hover">{'>'} GitHub / Open Source</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-limestrong inline-block"></span> System Status
          </h4>
          <div className="bg-black border border-brand-limestrong/30 p-4 font-mono text-xs text-brand-muted cursor-default">
            <div className="flex justify-between mb-2"><span>API Server</span> <span className="text-brand-limestrong animate-pulse">Online</span></div>
            <div className="flex justify-between mb-2"><span>Database Cluster</span> <span className="text-brand-limestrong animate-pulse">Online</span></div>
            <div className="flex justify-between"><span>CDN Edge</span> <span className="text-brand-limestrong animate-pulse">Online</span></div>
            <div className="mt-4 pt-4 border-t border-white/10 text-[10px] opacity-50">Last check: Just now</div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-muted uppercase tracking-widest">
        <p>&copy; 2026 STOREBRANDS GMBH.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Impressum</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <>
      <CustomCursor />
      <ThreeBackground />
      <div className="relative z-10 selection:bg-brand-limestrong selection:text-brand-dark cursor-none">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Stats />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;