import { useState, useEffect, useRef, useCallback } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const WHATSAPP_NUMBER = "5568992403062";

const IMG = {
  hero: "https://images.unsplash.com/photo-1646072508214-b88d6b1677c3?w=900&h=1200&fit=crop&auto=format",
  about:
    "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=900&h=1100&fit=crop&auto=format",
  cta: "https://images.unsplash.com/photo-1628884879718-60dd217d5c9b?w=800&h=1000&fit=crop&auto=format",
  hypertrophy:
    "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=600&h=420&fit=crop&auto=format",
  fat: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=420&fit=crop&auto=format",
  conditioning:
    "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=600&h=420&fit=crop&auto=format",
  performance:
    "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&h=420&fit=crop&auto=format",
  custom:
    "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?w=600&h=420&fit=crop&auto=format",
  gallery1:
    "https://images.unsplash.com/photo-1604480133435-25b86862d276?w=600&h=800&fit=crop&auto=format",
  gallery2:
    "https://images.unsplash.com/photo-1616279969722-d81a5a3944ef?w=600&h=400&fit=crop&auto=format",
  gallery3:
    "https://images.unsplash.com/photo-1738725602689-f260e7f528cd?w=400&h=500&fit=crop&auto=format",
  before1:
    "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=600&h=800&fit=crop&auto=format&grayscale",
  after1:
    "https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?w=600&h=800&fit=crop&auto=format",
  before2:
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=800&fit=crop&auto=format&grayscale",
  after2:
    "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=600&h=800&fit=crop&auto=format",
  before3:
    "https://images.unsplash.com/photo-1606889462784-c033891d5a3e?w=600&h=800&fit=crop&auto=format&grayscale",
  after3:
    "https://images.unsplash.com/photo-1786135364960-26a19410cefd?w=600&h=800&fit=crop&auto=format",
  // Método
  stepAvaliacao:
    "https://images.unsplash.com/photo-1738523686514-4b6819db42ad?w=600&h=400&fit=crop&auto=format",
  stepPlanejamento:
    "https://images.unsplash.com/photo-1692158962133-6c97ee651ab9?w=600&h=400&fit=crop&auto=format",
  stepTreino:
    "https://images.unsplash.com/photo-1592588253414-887759037c2a?w=600&h=400&fit=crop&auto=format",
  stepEvolucao:
    "https://images.unsplash.com/photo-1655451111874-bdfa1f236abe?w=600&h=400&fit=crop&auto=format",
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.5);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 18);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Label chip ───────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-5 h-px" style={{ background: "#c8ff00" }} />
      <span
        style={{
          color: "#c8ff00",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.22em",
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "INÍCIO", href: "#inicio" },
    { label: "SOBRE", href: "#sobre" },
    { label: "MÉTODO", href: "#metodo" },
    { label: "TREINOS", href: "#treinos" },
    { label: "RESULTADOS", href: "#resultados" },
    { label: "PLANOS", href: "#planos" },
    { label: "CONTATO", href: "#contato" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid #161616" : "none",
          paddingTop: scrolled ? "14px" : "22px",
          paddingBottom: scrolled ? "14px" : "22px",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2.5">
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#c8ff00",
                color: "#080808",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
              }}
            >
              LF
            </div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                letterSpacing: "0.16em",
                fontSize: "0.8rem",
                color: "#f5f5f5",
              }}
            >
              LUCAS FERREIRA
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "#666",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#planos"
              className="hidden md:block"
              style={{
                background: "#c8ff00",
                color: "#080808",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                padding: "10px 22px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              VER PLANOS
            </a>
            <button
              className="lg:hidden p-2 flex flex-col gap-1.5"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px bg-white transition-all duration-300"
                  style={{
                    width: i === 1 ? (open ? "24px" : "14px") : "24px",
                    opacity: open && i === 1 ? 0 : 1,
                    transform: open
                      ? i === 0
                        ? "rotate(45deg) translate(3px, 3px)"
                        : i === 2
                          ? "rotate(-45deg) translate(3px, -3px)"
                          : ""
                      : "",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center items-center gap-7 transition-all duration-500"
        style={{
          background: "#080808",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            className="font-black uppercase transition-colors duration-200"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "3.2rem",
              color: open ? "#f5f5f5" : "#111",
              transitionDelay: `${i * 0.04}s`,
            }}
            onClick={() => setOpen(false)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c8ff00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f5f5f5")}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#080808" }}
    >
      <div className="absolute inset-0 md:left-[42%]">
        <img
          src={IMG.hero}
          alt="Lucas Ferreira personal trainer"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #080808 0%, #080808 35%, rgba(8,8,8,0.55) 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{
            background: "linear-gradient(to top, #080808, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end pb-16 px-6 md:px-16 max-w-7xl mx-auto w-full pt-32">
        <Label>Personal Trainer · Rio Branco</Label>

        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(4.5rem, 13vw, 10rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
          }}
        >
          <span className="block text-white">SEU</span>
          <span className="block" style={{ color: "#c8ff00" }}>
            CORPO.
          </span>
          <span className="block text-white">SEU</span>
          <span
            className="block"
            style={{ WebkitTextStroke: "2px #f5f5f5", color: "transparent" }}
          >
            RITMO.
          </span>
          <span className="block text-white">SEU</span>
          <span className="block" style={{ color: "#c8ff00" }}>
            RESULTADO.
          </span>
        </h1>

        <p
          className="mb-10"
          style={{
            color: "#999",
            fontFamily: "'Barlow', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.65,
            maxWidth: "400px",
          }}
        >
          Treinamento personalizado para quem quer evoluir de verdade. Método,
          ciência e acompanhamento total.
        </p>

        <div className="flex flex-wrap gap-4 mb-14">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Olá, Lucas! Vim pelo site e gostaria de começar meu treinamento.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3"
            style={{
              background: "#c8ff00",
              color: "#080808",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              padding: "16px 32px",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 36px rgba(200,255,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            COMEÇAR AGORA
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M3 7.5h9M9 4l3.5 3.5L9 11"
                stroke="#080808"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#metodo"
            className="inline-flex items-center gap-3"
            style={{
              border: "1px solid #2a2a2a",
              color: "#f5f5f5",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              padding: "16px 32px",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c8ff00";
              e.currentTarget.style.color = "#c8ff00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#f5f5f5";
            }}
          >
            CONHECER O MÉTODO
          </a>
        </div>

        <div
          className="flex flex-wrap gap-10"
          style={{ borderTop: "1px solid #181818", paddingTop: "40px" }}
        >
          {[
            { val: 500, suffix: "+", label: "ALUNOS" },
            { val: 5, suffix: " ANOS", label: "EXPERIÊNCIA" },
            { val: 100, suffix: "%", label: "PERSONALIZADO" },
          ].map(({ val, suffix, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "2.8rem",
                  fontWeight: 900,
                  color: "#c8ff00",
                  lineHeight: 1,
                }}
              >
                <AnimatedNumber target={val} suffix={suffix} />
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#444",
                  letterSpacing: "0.15em",
                  marginTop: "4px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sobre ─────────────────────────────────────────────────────────────────
function Sobre() {
  return (
    <section
      id="sobre"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <FadeUp>
          <div className="relative">
            <div
              className="absolute"
              style={{
                top: "-16px",
                left: "-16px",
                width: "120px",
                height: "120px",
                border: "1px solid rgba(200,255,0,0.2)",
                pointerEvents: "none",
              }}
            />
            <img
              src={IMG.about}
              alt="Lucas Ferreira"
              className="w-full object-cover"
              style={{
                maxHeight: "600px",
                filter: "brightness(0.85) contrast(1.08)",
              }}
            />
            <div
              className="absolute bottom-6 left-6"
              style={{ background: "#c8ff00", padding: "14px 20px" }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.6rem",
                  color: "#080808",
                  lineHeight: 1,
                }}
              >
                27 ANOS
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  color: "#080808",
                  opacity: 0.6,
                  letterSpacing: "0.1em",
                }}
              >
                PERSONAL TRAINER
              </div>
            </div>
          </div>
        </FadeUp>

        <div>
          <FadeUp delay={0.1}>
            <Label>Sobre</Label>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 0.92,
                marginBottom: "32px",
              }}
            >
              MAIS
              <br />
              <span style={{ color: "#c8ff00" }}>QUE</span>
              <br />
              TREINO.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                color: "#888",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: "420px",
                marginBottom: "20px",
              }}
            >
              Sou Lucas Ferreira, personal trainer especializado em
              transformação real. Minha abordagem vai além das séries e
              repetições — construo com você disciplina, consistência e uma
              relação saudável com o seu corpo.
            </p>
            <p
              style={{
                color: "#888",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: "420px",
                marginBottom: "40px",
              }}
            >
              Cada protocolo é criado do zero. Nada de planilha pronta. Nada de
              copy paste. Só o que funciona para o seu corpo e para a sua
              rotina.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="grid grid-cols-2 gap-3">
              {[
                "27 ANOS",
                "PERSONAL TRAINER",
                "PERFORMANCE",
                "TREINAMENTO PERSONALIZADO",
              ].map((tag) => (
                <div
                  key={tag}
                  style={{
                    border: "1px solid #1e1e1e",
                    padding: "12px 16px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#444",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Método ────────────────────────────────────────────────────────────────
function Metodo() {
  const steps = [
    {
      num: "01",
      title: "AVALIAÇÃO",
      desc: "Analisamos seu histórico, objetivos, limitações e estilo de vida. Sem isso, qualquer treino é chute no escuro.",
      img: IMG.stepAvaliacao,
      alt: "Avaliação física com personal trainer",
    },
    {
      num: "02",
      title: "PLANEJAMENTO",
      desc: "Montamos um protocolo exclusivo com periodização, volume e intensidade certos para o seu perfil.",
      img: IMG.stepPlanejamento,
      alt: "Planejamento de treino personalizado",
    },
    {
      num: "03",
      title: "TREINAMENTO",
      desc: "Execução com técnica apurada, acompanhamento próximo e ajustes em tempo real.",
      img: IMG.stepTreino,
      alt: "Sessão de treinamento com acompanhamento",
    },
    {
      num: "04",
      title: "EVOLUÇÃO",
      desc: "Monitoramos resultados, ajustamos a rota e garantimos progresso contínuo. Sem platôs.",
      img: IMG.stepEvolucao,
      alt: "Evolução física e resultados visíveis",
    },
  ];

  return (
    <section
      id="metodo"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#0b0b0b" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label>Processo</Label>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              marginBottom: "72px",
            }}
          >
            MEU
            <br />
            <span style={{ color: "#c8ff00" }}>MÉTODO</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.1}>
              <div
                className="flex flex-col h-full cursor-default group transition-all duration-300 overflow-hidden"
                style={{ border: "1px solid #1a1a1a", background: "#0f0f0f" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c8ff00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                }}
              >
                {/* foto */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "180px" }}
                >
                  <img
                    src={s.img}
                    alt={s.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.55) saturate(0.8)" }}
                  />
                  {/* número sobreposto */}
                  <div
                    className="absolute bottom-0 right-0 px-4 py-2"
                    style={{ background: "rgba(8,8,8,0.85)" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "3rem",
                        fontWeight: 900,
                        color: "#1e1e1e",
                        lineHeight: 1,
                        WebkitTextStroke: "1px #2a2a2a",
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                  {/* linha verde na base da foto ao hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-full transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ background: "#c8ff00" }}
                  />
                </div>

                {/* texto */}
                <div style={{ padding: "24px 24px 28px" }}>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "1rem",
                      color: "#f0f0f0",
                      marginBottom: "10px",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {s.title}
                  </div>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.85rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Treinos ───────────────────────────────────────────────────────────────
function Treinos() {
  const cards = [
    {
      title: "HIPERTROFIA",
      sub: "Ganho de massa",
      img: IMG.hypertrophy,
      tag: "FORÇA",
    },
    {
      title: "EMAGRECIMENTO",
      sub: "Queima de gordura",
      img: IMG.fat,
      tag: "CARDIO",
    },
    {
      title: "CONDICIONAMENTO",
      sub: "Resistência total",
      img: IMG.conditioning,
      tag: "ENDURANCE",
    },
    {
      title: "PERFORMANCE",
      sub: "Alto rendimento",
      img: IMG.performance,
      tag: "POTÊNCIA",
    },
    {
      title: "PERSONALIZADO",
      sub: "Seu objetivo, nossa missão",
      img: IMG.custom,
      tag: "EXCLUSIVO",
    },
  ];

  return (
    <section
      id="treinos"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <Label>Modalidades</Label>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 0.92,
                }}
              >
                SEUS
                <br />
                <span style={{ color: "#c8ff00" }}>OBJETIVOS</span>
              </h2>
            </div>
            <p
              style={{
                color: "#555",
                fontSize: "0.88rem",
                maxWidth: "240px",
                lineHeight: 1.7,
              }}
            >
              Cada modalidade é adaptada ao seu nível, rotina e metas.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <FadeUp
              key={c.title}
              delay={i * 0.08}
              className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{ height: "320px" }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ filter: "brightness(0.4) saturate(0.8)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.07)";
                    e.currentTarget.style.filter =
                      "brightness(0.25) saturate(0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter =
                      "brightness(0.4) saturate(0.8)";
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <div
                    style={{
                      alignSelf: "flex-start",
                      padding: "6px 12px",
                      background: "rgba(200,255,0,0.1)",
                      color: "#c8ff00",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      border: "1px solid rgba(200,255,0,0.2)",
                    }}
                  >
                    {c.tag}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "1.9rem",
                        fontWeight: 900,
                        color: "#f5f5f5",
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {c.title}
                    </div>
                    <div style={{ color: "#777", fontSize: "0.85rem" }}>
                      {c.sub}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full"
                  style={{ background: "#c8ff00", width: "0%" }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Slider antes/depois (reutilizável) ───────────────────────────────────
function BeforeAfterSlider({
  before,
  after,
  sliderHeight = 360,
}: {
  before: string;
  after: string;
  sliderHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(48);
  const dragging = useRef(false);

  const getPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 48;
    return Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging.current) setPos(getPos(e.clientX));
    },
    [getPos],
  );
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (dragging.current) setPos(getPos(e.touches[0].clientX));
    },
    [getPos],
  );
  const stop = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [onMouseMove, onTouchMove, stop]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{
        height: `${sliderHeight}px`,
        cursor: "ew-resize",
        background: "#111",
      }}
      onMouseDown={() => {
        dragging.current = true;
      }}
      onTouchStart={() => {
        dragging.current = true;
      }}
    >
      <img
        src={after}
        alt="depois"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.88)" }}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt="antes"
          className="absolute inset-0 h-full object-cover"
          style={{
            width: containerRef.current?.offsetWidth ?? "100%",
            filter: "brightness(0.7) saturate(0.25)",
          }}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          left: `${pos}%`,
          background: "#c8ff00",
          boxShadow: "0 0 12px rgba(200,255,0,0.55)",
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            background: "#c8ff00",
            borderRadius: "50%",
            boxShadow: "0 0 18px rgba(200,255,0,0.5)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4.5 8h7M2 5.5l-2 2.5 2 2.5M14 5.5l2 2.5-2 2.5"
              stroke="#080808"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute top-3 left-3 pointer-events-none"
        style={{ opacity: pos > 10 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <span
          style={{
            background: "rgba(0,0,0,0.75)",
            color: "#666",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            padding: "3px 9px",
          }}
        >
          ANTES
        </span>
      </div>
      <div
        className="absolute top-3 right-3 pointer-events-none"
        style={{ opacity: pos < 90 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <span
          style={{
            background: "rgba(200,255,0,0.14)",
            color: "#c8ff00",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            padding: "3px 9px",
            border: "1px solid rgba(200,255,0,0.22)",
          }}
        >
          DEPOIS
        </span>
      </div>
    </div>
  );
}

// ─── Resultados + Transformações unificados ────────────────────────────────
function Resultados() {
  const casos = [
    {
      nome: "Rafael M.",
      idade: "28 anos",
      objetivo: "HIPERTROFIA",
      periodo: "6 MESES",
      kg: "+8kg",
      label: "MASSA GANHA",
      depoimento:
        "Nunca tinha evoluído tanto em tão pouco tempo. O Lucas ajusta o treino toda semana de acordo com a minha resposta. Não é só mandar planilha e sumir — ele acompanha de verdade.",
      before: IMG.before1,
      after: IMG.after1,
    },
    {
      nome: "Juliana S.",
      idade: "31 anos",
      objetivo: "EMAGRECIMENTO",
      periodo: "4 MESES",
      kg: "12kg",
      label: "GORDURA PERDIDA",
      depoimento:
        "Perdi 12kg e mantive toda a massa muscular. O protocolo dele é completamente diferente do que eu tinha tentado antes. Finalmente entendi que treino inteligente é diferente de treino pesado.",
      before: IMG.before2,
      after: IMG.after2,
    },
    {
      nome: "Bruno K.",
      idade: "25 anos",
      objetivo: "PERFORMANCE",
      periodo: "3 MESES",
      kg: "+23%",
      label: "RENDIMENTO",
      depoimento:
        "Sou atleta amador e o protocolo foi montado especificamente para a minha modalidade. Meu desempenho melhorou de um jeito que não esperava tão rápido. Recomendo sem hesitar.",
      before: IMG.before3,
      after: IMG.after3,
    },
  ];

  return (
    <section
      id="resultados"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#0b0b0b" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label>Resultados reais</Label>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              marginBottom: "64px",
            }}
          >
            QUEM
            <br />
            <span style={{ color: "#c8ff00" }}>EVOLUIU</span>
          </h2>
        </FadeUp>

        {/* Métricas */}
        <FadeUp delay={0.08}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px mb-20"
            style={{ background: "#1a1a1a" }}
          >
            {[
              { val: 200, suffix: "kg+", label: "KG PERDIDOS" },
              { val: 85, suffix: "%", label: "TAXA DE ADESÃO" },
              { val: 30, suffix: "%+", label: "PERFORMANCE" },
              { val: 97, suffix: "%", label: "SATISFAÇÃO" },
            ].map(({ val, suffix, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-9 px-4"
                style={{ background: "#0b0b0b" }}
              >
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "3rem",
                    fontWeight: 900,
                    color: "#c8ff00",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  <AnimatedNumber target={val} suffix={suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "#444",
                    letterSpacing: "0.14em",
                    textAlign: "center",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Cards unificados: depoimento + antes/depois */}
        <div className="grid md:grid-cols-3 gap-6">
          {casos.map((c, i) => (
            <FadeUp key={c.nome} delay={i * 0.1}>
              <div
                className="flex flex-col overflow-hidden transition-all duration-300"
                style={{ border: "1px solid #191919", background: "#0f0f0f" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2a2a2a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#191919";
                }}
              >
                {/* Cabeçalho do card */}
                <div style={{ padding: "28px 28px 0" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900,
                          fontSize: "1.1rem",
                          color: "#f5f5f5",
                          lineHeight: 1.1,
                        }}
                      >
                        {c.nome}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          color: "#444",
                          letterSpacing: "0.1em",
                          marginTop: "3px",
                        }}
                      >
                        {c.idade}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "2.2rem",
                          fontWeight: 900,
                          color: "#c8ff00",
                          lineHeight: 1,
                        }}
                      >
                        {c.kg}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "0.58rem",
                          fontWeight: 700,
                          color: "#333",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {c.label}
                      </div>
                    </div>
                  </div>

                  {/* Tag objetivo + período */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      style={{
                        background: "rgba(200,255,0,0.08)",
                        color: "#c8ff00",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        padding: "4px 10px",
                        border: "1px solid rgba(200,255,0,0.18)",
                      }}
                    >
                      {c.objetivo}
                    </span>
                    <span
                      style={{
                        background: "transparent",
                        color: "#333",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        padding: "4px 10px",
                        border: "1px solid #222",
                      }}
                    >
                      {c.periodo}
                    </span>
                  </div>

                  {/* Depoimento */}
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.85rem",
                      lineHeight: 1.8,
                      marginBottom: "24px",
                    }}
                  >
                    "{c.depoimento}"
                  </p>

                  {/* Divider com instrução */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      style={{ flex: 1, height: "1px", background: "#181818" }}
                    />
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        color: "#2a2a2a",
                        letterSpacing: "0.14em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ARRASTE PARA VER A TRANSFORMAÇÃO
                    </span>
                    <div
                      style={{ flex: 1, height: "1px", background: "#181818" }}
                    />
                  </div>
                </div>

                {/* Slider antes/depois */}
                <BeforeAfterSlider
                  before={c.before}
                  after={c.after}
                  sliderHeight={300}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Planos ────────────────────────────────────────────────────────────────
function Planos() {
  const [billing, setBilling] = useState<"mensal" | "trimestral">("mensal");

  const plans = [
    {
      name: "STARTER",
      tag: "Para quem está começando",
      priceM: 290,
      priceT: 249,
      color: "#1a1a1a",
      accent: "#444",
      highlight: false,
      features: [
        "2 treinos por semana",
        "Planilha de treino",
        "Acompanhamento mensal",
        "Suporte via WhatsApp",
        "Avaliação física inicial",
      ],
    },
    {
      name: "PRO",
      tag: "O mais escolhido",
      priceM: 490,
      priceT: 420,
      color: "#c8ff00",
      accent: "#080808",
      highlight: true,
      features: [
        "4 treinos por semana",
        "Planilha de treino personalizada",
        "Acompanhamento semanal",
        "Suporte ilimitado via WhatsApp",
        "Avaliação física quinzenal",
        "Plano alimentar básico",
        "Acesso à comunidade exclusiva",
      ],
    },
    {
      name: "ELITE",
      tag: "Máxima performance",
      priceM: 790,
      priceT: 680,
      color: "#1a1a1a",
      accent: "#f5f5f5",
      highlight: false,
      features: [
        "Treinos todos os dias",
        "Protocolos 100% exclusivos",
        "Acompanhamento diário",
        "Suporte prioritário 24h",
        "Avaliação física semanal",
        "Plano alimentar completo",
        "Consultoria de suplementação",
        "Relatório mensal de evolução",
      ],
    },
  ];

  return (
    <section
      id="planos"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#0b0b0b" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label>Investimento</Label>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 0.92,
              }}
            >
              ESCOLHA
              <br />
              <span style={{ color: "#c8ff00" }}>SEU PLANO</span>
            </h2>

            {/* Toggle */}
            <div className="flex items-center gap-4 self-start md:self-end">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: billing === "mensal" ? "#f5f5f5" : "#444",
                  letterSpacing: "0.1em",
                }}
              >
                MENSAL
              </span>
              <button
                onClick={() =>
                  setBilling((b) => (b === "mensal" ? "trimestral" : "mensal"))
                }
                className="relative transition-all duration-300"
                style={{
                  width: "52px",
                  height: "28px",
                  background: billing === "trimestral" ? "#c8ff00" : "#1e1e1e",
                  borderRadius: "14px",
                }}
              >
                <div
                  className="absolute top-1 transition-all duration-300"
                  style={{
                    width: "20px",
                    height: "20px",
                    background: billing === "trimestral" ? "#080808" : "#555",
                    borderRadius: "50%",
                    left: billing === "trimestral" ? "30px" : "4px",
                  }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: billing === "trimestral" ? "#f5f5f5" : "#444",
                    letterSpacing: "0.1em",
                  }}
                >
                  TRIMESTRAL
                </span>
                <span
                  style={{
                    background: "rgba(200,255,0,0.15)",
                    color: "#c8ff00",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    padding: "3px 8px",
                    border: "1px solid rgba(200,255,0,0.2)",
                  }}
                >
                  ECONOMIZE 15%
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.1}>
              <div
                className="relative flex flex-col h-full transition-all duration-300"
                style={{
                  background: p.highlight ? "#c8ff00" : "#0f0f0f",
                  border: p.highlight ? "none" : "1px solid #1a1a1a",
                  padding: "40px 32px",
                  transform: p.highlight ? "scale(1.03)" : "scale(1)",
                }}
              >
                {p.highlight && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5"
                    style={{
                      background: "#080808",
                      color: "#c8ff00",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 900,
                      letterSpacing: "0.15em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    MAIS POPULAR
                  </div>
                )}

                <div style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "2rem",
                      color: p.highlight ? "#080808" : "#f5f5f5",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: p.highlight ? "rgba(8,8,8,0.55)" : "#444",
                      letterSpacing: "0.1em",
                      marginTop: "4px",
                    }}
                  >
                    {p.tag.toUpperCase()}
                  </div>
                </div>

                <div
                  className="flex items-end gap-1 my-8"
                  style={{
                    borderTop: `1px solid ${p.highlight ? "rgba(8,8,8,0.15)" : "#1a1a1a"}`,
                    paddingTop: "28px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      color: p.highlight ? "rgba(8,8,8,0.7)" : "#555",
                      marginBottom: "8px",
                    }}
                  >
                    R$
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "4.5rem",
                      lineHeight: 1,
                      color: p.highlight ? "#080808" : "#f5f5f5",
                    }}
                  >
                    {billing === "mensal" ? p.priceM : p.priceT}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: p.highlight ? "rgba(8,8,8,0.55)" : "#444",
                      marginBottom: "6px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    /mês
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 mb-10">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{
                          width: "18px",
                          height: "18px",
                          background: p.highlight
                            ? "rgba(8,8,8,0.12)"
                            : "rgba(200,255,0,0.1)",
                          borderRadius: "50%",
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path
                            d="M1.5 4.5l2 2 4-4"
                            stroke={p.highlight ? "#080808" : "#c8ff00"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: "0.85rem",
                          color: p.highlight ? "#080808" : "#666",
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Olá, Lucas! Tenho interesse no plano ${p.name}. Gostaria de saber mais detalhes.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center transition-all duration-250"
                  style={{
                    background: p.highlight ? "#080808" : "#c8ff00",
                    color: p.highlight ? "#c8ff00" : "#080808",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    padding: "15px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.88";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  QUERO ESTE PLANO
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <p
            className="text-center mt-10"
            style={{
              color: "#333",
              fontSize: "0.8rem",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Todos os planos incluem avaliação física gratuita na primeira
            semana. Sem fidelidade mínima no plano mensal.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Galeria ───────────────────────────────────────────────────────────────
function Galeria() {
  return (
    <section
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-5 h-px" style={{ background: "#c8ff00" }} />
            <span
              style={{
                color: "#c8ff00",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
              }}
            >
              GALERIA
            </span>
          </div>
        </FadeUp>

        <div
          className="grid grid-cols-12 grid-rows-2 gap-4"
          style={{ height: "clamp(380px, 62vw, 620px)" }}
        >
          <FadeUp className="col-span-12 md:col-span-5 row-span-2 overflow-hidden">
            <div className="relative w-full h-full overflow-hidden group">
              <img
                src={IMG.gallery1}
                alt="Lucas treinando"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ filter: "brightness(0.65)" }}
              />
              <div className="absolute bottom-8 left-8">
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "#c8ff00",
                    opacity: 0.9,
                    lineHeight: 1,
                  }}
                >
                  +500
                </div>
                <div
                  style={{
                    color: "#888",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  VIDAS TRANSFORMADAS
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp
            delay={0.1}
            className="col-span-12 md:col-span-7 row-span-1 overflow-hidden"
          >
            <div className="relative w-full h-full overflow-hidden group">
              <img
                src={IMG.gallery2}
                alt="Treino"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ filter: "brightness(0.5)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(200,255,0,0.25)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  EVOLUA
                </span>
              </div>
            </div>
          </FadeUp>

          <FadeUp
            delay={0.2}
            className="col-span-12 md:col-span-7 row-span-1 overflow-hidden"
          >
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="overflow-hidden group">
                <img
                  src={IMG.gallery3}
                  alt="Atleta"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  style={{ filter: "brightness(0.5)" }}
                />
              </div>
              <div
                className="flex flex-col items-center justify-center gap-2"
                style={{ background: "#c8ff00" }}
              >
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    color: "#080808",
                    lineHeight: 1.05,
                    textAlign: "center",
                  }}
                >
                  5 ANOS DE
                  <br />
                  EXCELÊNCIA
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "rgba(8,8,8,0.5)",
                    letterSpacing: "0.12em",
                  }}
                >
                  SÃO PAULO · SP
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Final ─────────────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section
      className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden"
      style={{ background: "#0b0b0b" }}
    >
      <div className="absolute inset-0 md:left-[52%]">
        <img
          src={IMG.cta}
          alt="Lucas Ferreira"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0b0b0b 45%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp>
          <Label>Pronto?</Label>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              marginBottom: "24px",
              maxWidth: "700px",
            }}
          >
            PRONTO PARA
            <br />
            <span style={{ color: "#c8ff00" }}>MUDAR O</span>
            <br />
            JOGO?
          </h2>
          <p
            style={{
              color: "#777",
              fontSize: "1.05rem",
              marginBottom: "40px",
              maxWidth: "360px",
              lineHeight: 1.7,
            }}
          >
            Seu próximo nível começa com o primeiro treino.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Olá, Lucas! Tenho interesse em começar meu treinamento. Gostaria de saber mais detalhes.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 transition-all duration-300"
            style={{
              background: "#c8ff00",
              color: "#080808",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              padding: "18px 36px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 14px 44px rgba(200,255,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            COMEÇAR MEU TREINAMENTO
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 9h10M10 5l4 4-4 4"
                stroke="#080808"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Contato ───────────────────────────────────────────────────────────────
function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    plano: "",
  });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Olá, Lucas! Vim pelo seu site e gostaria de fazer uma avaliação.\n\nNome: ${form.nome}\nPlano de interesse: ${form.plano}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");

    setSent(true);
  };

  return (
    <section
      id="contato"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <FadeUp>
          <Label>Contato</Label>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              marginBottom: "28px",
            }}
          >
            VAMOS
            <br />
            <span style={{ color: "#c8ff00" }}>COMEÇAR</span>
          </h2>
          <p
            style={{
              color: "#555",
              fontSize: "0.92rem",
              maxWidth: "360px",
              lineHeight: 1.75,
              marginBottom: "40px",
            }}
          >
            Preencha seu nome e escolha o plano de interesse. Ao enviar, você
            será direcionado para o WhatsApp.
          </p>
          <div className="flex flex-col gap-5">
            {[
              {
                icon: <FaWhatsapp />,
                label: "WHATSAPP",
                val: "+55 (68) 99240-3062",
              },
              {
                icon: <FaInstagram />,
                label: "INSTAGRAM",
                val: "@lucasferreira.pt",
              },
              {
                icon: <FaLocationDot />,
                label: "LOCALIZAÇÃO",
                val: "Rio Branco, AC",
              },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex items-center gap-5">
                <div
                  className="flex-shrink-0 flex items-center justify-center text-base"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#0f0f0f",
                    border: "1px solid #1a1a1a",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "#444",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ color: "#f5f5f5", fontSize: "0.9rem" }}>
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          {sent ? (
            <div
              className="flex flex-col items-center justify-center gap-4 text-center"
              style={{
                border: "1px solid #c8ff00",
                background: "#0f0f0f",
                padding: "64px 40px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "2.5rem",
                  color: "#c8ff00",
                }}
              >
                MENSAGEM ENVIADA!
              </div>
              <p style={{ color: "#666" }}>
                Lucas entrará em contato em breve para agendar sua avaliação.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handle}
              className="flex flex-col gap-5"
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                padding: "clamp(24px, 5vw, 48px)",
              }}
            >
              {[
                {
                  id: "nome",
                  label: "NOME COMPLETO",
                  type: "text",
                  ph: "Seu nome",
                },
              ].map(({ id, label, type, ph }) => (
                <div key={id} className="flex flex-col gap-2">
                  <label
                    htmlFor={id}
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 900,
                      color: "#444",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={ph}
                    required
                    value={form[id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    style={{
                      background: "#080808",
                      border: "1px solid #1e1e1e",
                      color: "#f5f5f5",
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "0.88rem",
                      padding: "14px 16px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#c8ff00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#1e1e1e")
                    }
                  />
                </div>
              ))}
              {[
                {
                  id: "plano",
                  label: "PLANO DE INTERESSE",
                  opts: [
                    "Starter (R$ 290/mês)",
                    "Pro (R$ 490/mês)",
                    "Elite (R$ 790/mês)",
                  ],
                },
              ].map(({ id, label, opts }) => (
                <div key={id} className="flex flex-col gap-2">
                  <label
                    htmlFor={id}
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 900,
                      color: "#444",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {label}
                  </label>
                  <select
                    id={id}
                    required
                    value={form[id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    style={{
                      background: "#080808",
                      border: "1px solid #1e1e1e",
                      color: form[id as keyof typeof form] ? "#f5f5f5" : "#444",
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "0.88rem",
                      padding: "14px 16px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#c8ff00")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#1e1e1e")
                    }
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {opts.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                type="submit"
                className="mt-3 transition-all duration-200"
                style={{
                  background: "#c8ff00",
                  color: "#080808",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  padding: "17px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d4ff26";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#c8ff00";
                  e.currentTarget.style.transform = "";
                }}
              >
                QUERO MINHA AVALIAÇÃO GRATUITA
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Método", href: "#metodo" },
    { label: "Treinos", href: "#treinos" },
    { label: "Resultados", href: "#resultados" },
    { label: "Planos", href: "#planos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #101010" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#c8ff00",
                  color: "#080808",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
                }}
              >
                LF
              </div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  fontSize: "0.8rem",
                }}
              >
                LUCAS FERREIRA
              </span>
            </div>
            <p
              style={{
                color: "#444",
                fontSize: "0.85rem",
                lineHeight: 1.75,
                maxWidth: "240px",
              }}
            >
              Seu corpo, seu ritmo, seu resultado. Treinamento personalizado que
              transforma vidas.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 900,
                color: "#333",
                letterSpacing: "0.15em",
                marginBottom: "20px",
              }}
            >
              LINKS RÁPIDOS
            </div>
            <div className="flex flex-col gap-2.5">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    color: "#444",
                    fontSize: "0.88rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c8ff00")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 900,
                color: "#333",
                letterSpacing: "0.15em",
                marginBottom: "20px",
              }}
            >
              REDES SOCIAIS
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Instagram", val: "@lucasferreira.pt" },
                { label: "WhatsApp", val: "+55 (11) 99999-0000" },
                { label: "E-mail", val: "lucas@lucasferreira.com" },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: "#2a2a2a",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ color: "#555", fontSize: "0.85rem" }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid #101010" }}
        >
          <p style={{ color: "#2a2a2a", fontSize: "0.78rem" }}>
            © 2026 Lucas Ferreira Personal Trainer. Todos os direitos
            reservados.
          </p>
          <p
            style={{
              color: "#c8ff00",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              opacity: 0.4,
            }}
          >
            EVOLUA SEM LIMITES
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        background: "#080808",
        color: "#f5f5f5",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <Navbar />
      <Hero />
      <Sobre />
      <Metodo />
      <Treinos />
      <Resultados />
      <Planos />
      <Galeria />
      <CTAFinal />
      <Contato />
      <Footer />
    </div>
  );
}
