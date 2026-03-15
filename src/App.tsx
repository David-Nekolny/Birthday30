import { useState, useEffect, ReactNode, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Beer, Utensils, Gift, PartyPopper, Check, Gamepad2, Baby } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-yellow-50 font-body text-slate-800 overflow-x-hidden">
      <HeroSection />
      <IntroSection />
      <CountdownSection />
      <LogisticsSection />
      <ProgramSection />
      <GiftsSection />
      <RsvpSection />
      <FooterSection />
    </div>
  );
}

function IntroSection() {
  return (
    <section className="py-16 px-4 text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-slate-800 mb-6">Ahoj všichni! 👋</h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          Rádi bychom s vámi oslavili naše kulatiny na pořádné letní grilovačce. 
          Třicítka je na krku a to si žádá pořádnou oslavu s dobrým jídlem, pitím a hlavně s vámi! 
          Přijďte s námi posedět, pokecat a užít si fajn odpoledne na zahradě.
        </p>
      </motion.div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
      {/* Decorative background blobs - Light for contrast */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-5xl mx-auto pb-12 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <img 
              src="/twins.jpeg" 
              alt="David a Vítek" 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-8 border-white/20 shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-emerald-900 font-display text-xl px-6 py-2 rounded-full shadow-lg z-20 transform rotate-12">
              Level 30!
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-6xl md:text-8xl mb-6 tracking-tight text-white drop-shadow-md">
            DAVID & VÍTEK <br className="md:hidden" /> 
            <span className="text-yellow-300 inline-block ml-2">3.0</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl font-bold text-emerald-100 mt-4 inline-block px-6 py-2 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm"
        >
          Největší update od roku 1996
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed"
        >
          Beta testování ukončeno. Verze 3.0 je konečně stabilní a připravený na zátěžový test.
        </motion.div>
      </div>

      {/* Curve at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-yellow-50" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2026-06-27T14:00:00") - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border-b-8 border-cyan-400">
        <h2 className="font-display text-3xl text-center text-cyan-600 mb-8">Odpočet do startu</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <TimeBox value={timeLeft.days} label="Dní" color="bg-pink-100 text-pink-600" />
          <TimeBox value={timeLeft.hours} label="Hodin" color="bg-purple-100 text-purple-600" />
          <TimeBox value={timeLeft.minutes} label="Minut" color="bg-yellow-100 text-yellow-600" />
          <TimeBox value={timeLeft.seconds} label="Sekund" color="bg-green-100 text-green-600" />
        </div>
      </div>
    </section>
  );
}

function TimeBox({ value, label, color }: { value: number, label: string, color: string }) {
  return (
    <div className={`p-4 rounded-2xl ${color} flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-32`}>
      <span className="font-display text-4xl md:text-5xl font-bold">{value}</span>
      <span className="font-bold uppercase text-sm mt-2 tracking-wider">{label}</span>
    </div>
  );
}

function LogisticsSection() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-orange-100 p-8 rounded-3xl border-4 border-orange-300 shadow-lg flex flex-col items-center text-center"
        >
          <div className="bg-orange-500 text-white p-4 rounded-full mb-6">
            <Calendar size={40} />
          </div>
          <h3 className="font-display text-2xl text-orange-800 mb-2">Kdy to vypukne?</h3>
          <p className="text-xl font-bold text-slate-700">27. června 2026</p>
          <div className="flex items-center gap-2 mt-2 text-slate-600">
            <Clock size={18} />
            <span>Start ve 14:00</span>
          </div>
          <p className="mt-4 text-sm text-slate-500 italic">Přijďte včas, ať nepropásnete úvodní proslov (který nebude).</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-blue-100 p-8 rounded-3xl border-4 border-blue-300 shadow-lg flex flex-col items-center text-center"
        >
          <div className="bg-blue-500 text-white p-4 rounded-full mb-6">
            <MapPin size={40} />
          </div>
          <h3 className="font-display text-2xl text-blue-800 mb-2">Kde se potkáme?</h3>
          <p className="text-xl font-bold text-slate-700">Rybníky 50, 263 01</p>
          <p className="mt-2 text-slate-600">Zahrada, tráva, sluníčko.</p>
          <a 
            href="https://mapy.cz/zakladni?q=Rybníky+50,+263+01" 
            target="_blank" 
            rel="noreferrer"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md inline-flex items-center gap-2"
          >
            <MapPin size={18} />
            Ukázat na mapě
          </a>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-emerald-100 p-8 rounded-3xl border-4 border-emerald-300 shadow-lg flex flex-col items-center text-center"
        >
          <div className="bg-emerald-500 text-white p-4 rounded-full mb-6 flex gap-2">
            <Baby size={30} />
            <Gamepad2 size={30} />
          </div>
          <h3 className="font-display text-2xl text-emerald-800 mb-2">Děti & Hry</h3>
          <p className="mt-2 text-slate-600">Děti jsou vítány! Zahrada je dost velká na řádění. A pro ty větší máme připravené venkovní hry. 🎯</p>

        </motion.div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section className="py-16 px-4 bg-white skew-y-3 my-10">
      <div className="-skew-y-3 max-w-4xl mx-auto">
        <h2 className="font-display text-4xl text-center text-slate-800 mb-12">
          Co vás čeká? <span className="text-sm block font-body font-normal text-slate-500 mt-2">(Kromě nás dvou)</span>
        </h2>
        
        <div className="space-y-8">
          <ProgramItem 
            icon={<Utensils size={32} />}
            title="Gastro zážitek"
            desc="Gril pojede na plné obrátky. Maso, sýry a zelenina — zkrátka všechno, co na správnou letní grilovačku patří."
            color="bg-red-100 text-red-600 border-red-200"
          />
          <ProgramItem 
            icon={<Beer size={32} />}
            title="Pitný režim"
            desc="Zajistíme dostatek piva (i nealko), vody a džusů. Pokud preferujete víno, míchané drinky nebo tvrdý alkohol, fungujeme v režimu BYOB (Bring Your Own Booze) – přivezte si, na co máte zrovna chuť!"
            color="bg-amber-100 text-amber-600 border-amber-200"
          />
          <ProgramItem 
            icon={<PartyPopper size={32} />}
            title="Chill & Zábava"
            desc="Zahradní pohoda, hudba a spousta venkovních her! Máme připravený badminton, kubb, mölkky, slackline, spikeball i frisbee. Hlavně žádný stres."
            color="bg-purple-100 text-purple-600 border-purple-200"
          />
        </div>
      </div>
    </section>
  );
}

function ProgramItem({ icon, title, desc, color }: { icon: ReactNode, title: string, desc: string, color: string }) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={`flex items-start gap-6 p-6 rounded-2xl border-2 ${color}`}
    >
      <div className="shrink-0 p-3 bg-white rounded-xl shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-700 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function GiftsSection() {
  return (
    <section className="py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto bg-emerald-50 p-10 rounded-full border-dashed border-4 border-emerald-300 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white p-3 rounded-full shadow-lg">
          <Gift size={32} />
        </div>
        <h2 className="font-display text-3xl text-emerald-800 mt-4 mb-4">A co dárky?</h2>
        <p className="text-lg text-emerald-900 font-medium">
          "Dárky si nechte pro sebe, nám stačí, když dorazíte s dobrou náladou a prázdným žaludkem."
        </p>
        <p className="text-sm text-emerald-600 mt-4">
          (Vážně, máme všechno... hlavně jeden druhého 👬)
        </p>
      </div>
    </section>
  );
}

function RsvpSection() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, count, note }),
      });

      if (!response.ok) {
        throw new Error("Nepodařilo se odeslat RSVP. Zkontroluj připojení.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Něco se pokazilo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-slate-900 text-white rounded-t-[3rem] mt-10">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-4xl mb-6 text-yellow-400">Dorazíš?</h2>
        <p className="mb-8 text-slate-300">Budeme rádi za info, abychom věděli, kolik toho nakoupit. Ale když se rozhodneš na poslední chvíli, taky tě nevyhodíme!</p>

        {isSubmitted ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-500 text-white p-8 rounded-2xl shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <Check size={48} className="bg-white text-green-500 rounded-full p-2" />
            </div>
            <h3 className="font-display text-2xl mb-2">Super, počítáme s tebou!</h3>
            <p className="mb-6">Těšíme se, {name}!</p>
            
            <a 
              href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("David & Vítek 3.0 Party")}&details=${encodeURIComponent("Oslava 30. narozenin Davida a Vítka. Přijďte včas, bude to legendární!")}&location=${encodeURIComponent("Rybníky 50, 263 01")}&dates=20260627T120000Z/20260627T200000Z`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors shadow-md"
            >
              <Calendar size={20} />
              Přidat do kalendáře
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 text-left">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2 ml-2 text-yellow-300">Tvoje jméno</label>
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sem napiš jméno..."
                className="w-full p-4 rounded-xl bg-white/90 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="count" className="block text-sm font-bold mb-2 ml-2 text-yellow-300">Počet osob (včetně tebe)</label>
              <input 
                type="number" 
                id="count"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full p-4 rounded-xl bg-white/90 text-slate-900 focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-bold mb-2 ml-2 text-yellow-300">Poznámka (alergie, vzkaz...)</label>
              <textarea 
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Mám alergii na nudu..."
                className="w-full p-4 rounded-xl bg-white/90 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold min-h-[100px]"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-display text-xl py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? "Odesílám..." : "Jasně, dorazím!"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-slate-950 text-slate-600 py-8 text-center text-sm">
      <p>© 2026 David & Vítek. Všechna práva na zábavu vyhrazena.</p>
      <p className="mt-2 opacity-50">Made with ❤️ by AI (because we are too lame for coding)</p>
    </footer>
  );
}
