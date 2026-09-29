import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type FormEvent,
} from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const WHATSAPP_NUMBER = "5568992403062";
const INSTAGRAM_URL = "https://instagram.com/lucasferreira.pt";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// IMPORTANTE: antes de publicar, troque as imagens genéricas pelos arquivos reais do treinador e dos alunos.
// As fotos de antes/depois devem ser do MESMO aluno e usadas com autorização.
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
  children: ReactNode;
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

function BeforeAfterSlider({
  before,
  after,
  height = 440,
}: {
  before: string;
  after: string;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const startDrag = useCallback(
    (clientX: number) => {
      dragging.current = true;
      updatePosition(clientX);
    },
    [updatePosition],
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging.current) updatePosition(event.clientX);
    },
    [updatePosition],
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      if (dragging.current) updatePosition(event.touches[0].clientX);
    },
    [updatePosition],
  );

  const stopDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [onMouseMove, onTouchMove, stopDrag]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{
        height: `${height}px`,
        background: "#111",
        touchAction: "none",
        cursor: "ew-resize",
      }}
      role="slider"
      tabIndex={0}
      aria-label="Comparar antes e depois"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          setPos((current) => Math.max(0, current - 5));
        }
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          setPos((current) => Math.min(100, current + 5));
        }
        if (e.key === "Home") {
          e.preventDefault();
          setPos(0);
        }
        if (e.key === "End") {
          e.preventDefault();
          setPos(100);
        }
      }}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      <img
        src={after}
        alt="Depois da transformação"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ background: "#111", filter: "brightness(0.9)" }}
        draggable={false}
      />

      <img
        src={before}
        alt="Antes da transformação"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{
          background: "#111",
          filter: "brightness(0.68) saturate(0.3)",
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`,
        }}
        draggable={false}
      />

      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          left: `${pos}%`,
          background: "#c8ff00",
          boxShadow: "0 0 14px rgba(200,255,0,0.55)",
        }}
      >
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            width: "46px",
            height: "46px",
            background: "#c8ff00",
            borderRadius: "50%",
            boxShadow: "0 0 22px rgba(200,255,0,0.45)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 10h8M3 7l-3 3 3 3M17 7l3 3-3 3"
              stroke="#080808"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <span
        className="absolute top-4 left-4 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.78)",
          color: "#f5f5f5",
          padding: "6px 10px",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
        }}
      >
        ANTES
      </span>

      <span
        className="absolute top-4 right-4 pointer-events-none"
        style={{
          background: "rgba(200,255,0,0.14)",
          color: "#c8ff00",
          border: "1px solid rgba(200,255,0,0.25)",
          padding: "6px 10px",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
        }}
      >
        DEPOIS
      </span>

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.72)",
          color: "#aaa",
          padding: "7px 12px",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          whiteSpace: "nowrap",
        }}
      >
        ARRASTE PARA COMPARAR
      </div>
    </div>
  );
}

// ─── Label chip ───────────────────────────────────────────────────────────
function Label({ children }: { children: ReactNode }) {
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
    { label: "MODALIDADES", href: "#modalidades" },
    { label: "PLANOS", href: "#planos" },
    { label: "FAQ", href: "#faq" },
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

          <div className="hidden xl:flex items-center gap-6">
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
              className="hidden xl:block"
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
              className="xl:hidden p-2 flex flex-col gap-1.5"
              onClick={() => setOpen(!open)}
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
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
        id="mobile-menu"
        className="fixed inset-0 z-40 xl:hidden flex flex-col justify-center items-center gap-7 transition-all duration-500"
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
              fontSize: "clamp(2.4rem, 10vw, 3.2rem)",
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
            fontSize: "clamp(3.7rem, 14vw, 10rem)",
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
          Para quem quer emagrecer, ganhar massa, melhorar o condicionamento ou
          voltar a treinar com direção. Método, estratégia e acompanhamento.
        </p>

        <div className="flex flex-wrap gap-4 mb-14">
          <a
            href={whatsappLink(
              "Olá, Lucas! Vim pelo site e quero entender como funciona o treinamento.",
            )}
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
            QUERO SABER MAIS
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
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3"
            style={{
              border: "1px solid #2a2a2a",
              color: "#f5f5f5",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              padding: "16px 24px",
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
            <FaInstagram />
            SEGUIR NO INSTAGRAM
          </a>
        </div>

        <div
          className="flex flex-wrap gap-10"
          style={{ borderTop: "1px solid #181818", paddingTop: "40px" }}
        >
          {[
            { value: "100%", label: "PERSONALIZADO" },
            { value: "3", label: "MODALIDADES" },
            { value: "AC", label: "RIO BRANCO" },
          ].map(({ value, label }) => (
            <div key={label} className="min-w-0">
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#c8ff00",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#555",
                  letterSpacing: "0.15em",
                  marginTop: "5px",
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

// ─── Para quem é ─────────────────────────────────────────────────────────────
function PerfilIdeal() {
  const items = [
    {
      num: "01",
      title: "VOCÊ COMEÇA E PARA",
      desc: "Tem dificuldade de manter constância e quer transformar treino em rotina.",
    },
    {
      num: "02",
      title: "TREINA SEM DIREÇÃO",
      desc: "Faz exercícios, mas não sabe se volume, carga e frequência estão certos para o seu objetivo.",
    },
    {
      num: "03",
      title: "QUER UM PLANO SEU",
      desc: "Não quer mais copiar treino pronto e procura uma estratégia adaptada à sua rotina.",
    },
    {
      num: "04",
      title: "QUER ACOMPANHAMENTO",
      desc: "Busca alguém para ajustar o processo, cobrar consistência e acompanhar a evolução.",
    },
  ];

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-16"
      style={{
        background: "#0b0b0b",
        borderTop: "1px solid #111",
        borderBottom: "1px solid #111",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
            <div>
              <Label>Para quem é</Label>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 0.92,
                  marginBottom: "22px",
                }}
              >
                TREINO COM
                <br />
                <span style={{ color: "#c8ff00" }}>DIREÇÃO.</span>
              </h2>
              <p
                style={{
                  color: "#555",
                  fontSize: "0.92rem",
                  lineHeight: 1.8,
                  maxWidth: "430px",
                }}
              >
                O objetivo aqui não é só treinar mais. É saber por que você está
                treinando, o que precisa ajustar e qual é o próximo passo.
              </p>
            </div>

            <div
              className="grid sm:grid-cols-2 gap-px"
              style={{ background: "#1a1a1a" }}
            >
              {items.map((item, index) => (
                <FadeUp key={item.num} delay={index * 0.06}>
                  <div
                    className="h-full"
                    style={{ background: "#0b0b0b", padding: "28px" }}
                  >
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "#c8ff00",
                        fontWeight: 900,
                        fontSize: "0.7rem",
                        letterSpacing: "0.14em",
                        marginBottom: "18px",
                      }}
                    >
                      {item.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "#f5f5f5",
                        fontWeight: 900,
                        fontSize: "1.15rem",
                        letterSpacing: "0.05em",
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </div>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "0.82rem",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>
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

// ─── Credibilidade ──────────────────────────────────────────────────────────
function Credibilidade() {
  const itens = [
    {
      label: "PERSONALIZAÇÃO",
      value:
        "Treino estruturado a partir do objetivo, nível e rotina do aluno.",
    },
    {
      label: "ACOMPANHAMENTO",
      value:
        "Contato e ajustes ao longo do processo, conforme a modalidade escolhida.",
    },
    {
      label: "FLEXIBILIDADE",
      value:
        "Opções online, semipresencial e presencial para diferentes rotinas.",
    },
    {
      label: "ATUAÇÃO",
      value:
        "Atendimento presencial em Rio Branco, AC, e acompanhamento online.",
    },
  ];

  return (
    <section
      className="px-6 md:px-16 pb-24 md:pb-32"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "#1a1a1a", border: "1px solid #1a1a1a" }}
          >
            {itens.map((item) => (
              <div
                key={item.label}
                className="min-w-0"
                style={{ background: "#0b0b0b", padding: "24px" }}
              >
                <div
                  style={{
                    color: "#c8ff00",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 900,
                    letterSpacing: "0.14em",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    color: "#777",
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Modalidades ───────────────────────────────────────────────────────────
type ModalidadeDetalhe = {
  label: string;
  title: string;
  description: string;
  ideal: string;
  includes: string[];
};

const MODALIDADES: Record<Modalidade, ModalidadeDetalhe> = {
  online: {
    label: "ONLINE",
    title: "Treine de onde estiver.",
    description:
      "Uma opção para quem precisa de flexibilidade e quer seguir uma estratégia personalizada sem depender de treinos presenciais.",
    ideal:
      "Ideal para quem tem autonomia para treinar e quer acompanhamento à distância.",
    includes: [
      "Treino personalizado",
      "Acompanhamento remoto",
      "Ajustes conforme evolução",
      "Suporte pelo WhatsApp",
    ],
  },
  semipresencial: {
    label: "SEMIPRESENCIAL",
    title: "Autonomia com acompanhamento de perto.",
    description:
      "Combina momentos presenciais com treinos planejados para você executar sozinho durante a semana.",
    ideal:
      "Ideal para quem quer aprender, corrigir execução e manter autonomia.",
    includes: [
      "Treinos presenciais e remotos",
      "Correção de execução",
      "Ajustes personalizados",
      "Acompanhamento contínuo",
    ],
  },
  presencial: {
    label: "PRESENCIAL",
    title: "Acompanhamento durante o treino.",
    description:
      "Para quem prefere ter o personal por perto durante a sessão, com orientação e correções em tempo real.",
    ideal:
      "Ideal para quem valoriza supervisão próxima e orientação durante a execução.",
    includes: [
      "Treino acompanhado",
      "Correção de execução",
      "Ajustes durante a sessão",
      "Planejamento individualizado",
    ],
  },
};

function Modalidades() {
  const [active, setActive] = useState<Modalidade>("presencial");
  const current = MODALIDADES[active];

  return (
    <section
      id="modalidades"
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="max-w-3xl mb-10">
            <Label>Como você pode treinar</Label>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 0.92,
              }}
            >
              ESCOLHA A
              <br />
              <span style={{ color: "#c8ff00" }}>MODALIDADE.</span>
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "0.92rem",
                lineHeight: 1.8,
                marginTop: "18px",
              }}
            >
              Entenda a diferença entre cada formato antes de escolher seu
              plano. A modalidade selecionada também aparece na mensagem enviada
              pelo WhatsApp.
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-5 items-stretch">
          <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {(Object.keys(MODALIDADES) as Modalidade[]).map((key) => {
              const item = MODALIDADES[key];
              const selected = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className="text-left transition-all duration-200"
                  aria-pressed={selected}
                  style={{
                    background: selected ? "#c8ff00" : "#0f0f0f",
                    color: selected ? "#080808" : "#f5f5f5",
                    border: `1px solid ${selected ? "#c8ff00" : "#1c1c1c"}`,
                    padding: "22px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "1.05rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="block mt-2"
                    style={{
                      color: selected ? "rgba(8,8,8,0.6)" : "#555",
                      fontSize: "0.75rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {item.ideal}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="min-w-0"
            style={{
              border: "1px solid #1b1b1b",
              background: "#0f0f0f",
              padding: "clamp(24px, 5vw, 44px)",
            }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                style={{
                  background: "rgba(200,255,0,0.08)",
                  border: "1px solid rgba(200,255,0,0.2)",
                  color: "#c8ff00",
                  padding: "6px 10px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                }}
              >
                {current.label}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 0.98,
                maxWidth: "650px",
              }}
            >
              {current.title}
            </h3>
            <p
              style={{
                color: "#777",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                maxWidth: "680px",
                marginTop: "18px",
              }}
            >
              {current.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {current.includes.map((item, index) => (
                <div key={item} className="flex items-start gap-3 min-w-0">
                  <span
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(200,255,0,0.1)",
                      color: "#c8ff00",
                      fontSize: "0.65rem",
                      fontWeight: 900,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    style={{
                      color: "#aaa",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#planos"
              className="inline-flex mt-10 items-center gap-3"
              style={{
                background: "#c8ff00",
                color: "#080808",
                padding: "14px 20px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
              }}
            >
              VER PLANOS {current.label} →
            </a>
          </div>
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

// ─── Como funciona ──────────────────────────────────────────────────────────
function ComoFunciona() {
  const passos = [
    [
      "01",
      "CHAME NO WHATSAPP",
      "Você escolhe um horário para conversar e explica seu objetivo, rotina e momento atual.",
    ],
    [
      "02",
      "FAÇA A AVALIAÇÃO",
      "A primeira conversa organiza as informações necessárias para definir o ponto de partida.",
    ],
    [
      "03",
      "RECEBA SUA ESTRATÉGIA",
      "O treino é estruturado considerando objetivo, nível e o que precisa caber na sua rotina.",
    ],
    [
      "04",
      "ACOMPANHE A EVOLUÇÃO",
      "Os resultados são acompanhados e o plano pode ser ajustado conforme você evolui.",
    ],
  ];

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <Label>Sem complicação</Label>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 0.92,
                }}
              >
                DO PRIMEIRO
                <br />
                <span style={{ color: "#c8ff00" }}>CONTATO</span>
              </h2>
            </div>
            <p
              style={{
                color: "#555",
                fontSize: "0.88rem",
                maxWidth: "300px",
                lineHeight: 1.7,
              }}
            >
              Um caminho claro para você saber o que acontece depois de clicar
              em “quero começar”.
            </p>
          </div>
        </FadeUp>

        <div
          className="grid md:grid-cols-4 gap-px"
          style={{ background: "#1a1a1a" }}
        >
          {passos.map(([num, title, desc], index) => (
            <FadeUp key={num} delay={index * 0.08}>
              <div
                className="h-full"
                style={{ background: "#0b0b0b", padding: "30px" }}
              >
                <div
                  style={{
                    color: "#c8ff00",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    marginBottom: "32px",
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color: "#f5f5f5",
                    fontSize: "1.2rem",
                    fontWeight: 900,
                    letterSpacing: "0.05em",
                    marginBottom: "10px",
                  }}
                >
                  {title}
                </div>
                <p
                  style={{
                    color: "#555",
                    fontSize: "0.82rem",
                    lineHeight: 1.75,
                  }}
                >
                  {desc}
                </p>
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

// ─── Resultados ────────────────────────────────────────────────────────────
function FeedbackPrint({
  name,
  objective,
  messages,
}: {
  name: string;
  objective: string;
  messages: { from: "student" | "lucas"; text: string; time: string }[];
}) {
  return (
    <article
      className="overflow-hidden h-full"
      style={{ border: "1px solid #1b1b1b", background: "#101010" }}
    >
      <div
        className="flex items-center justify-between gap-4 px-5 py-4"
        style={{ borderBottom: "1px solid #1b1b1b", background: "#0d0d0d" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: "38px",
              height: "38px",
              background: "#c8ff00",
              color: "#080808",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
            }}
          >
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div
              className="truncate"
              style={{
                color: "#f5f5f5",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "0.95rem",
                letterSpacing: "0.04em",
              }}
            >
              {name}
            </div>
            <div
              style={{
                color: "#555",
                fontSize: "0.65rem",
                marginTop: "2px",
              }}
            >
              {objective} · acompanhamento
            </div>
          </div>
        </div>
        <span
          className="shrink-0"
          style={{
            color: "#c8ff00",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.55rem",
            fontWeight: 900,
            letterSpacing: "0.12em",
          }}
        >
          MOCKUP
        </span>
      </div>

      <div
        className="p-5 flex flex-col gap-3 min-h-72.5"
        style={{
          background:
            "radial-gradient(circle at 80% 10%, rgba(200,255,0,0.06), transparent 28%), #121212",
        }}
      >
        {messages.map((message, index) => {
          const isStudent = message.from === "student";
          return (
            <div
              key={`${message.time}-${index}`}
              className={`flex ${isStudent ? "justify-start" : "justify-end"}`}
            >
              <div
                className="max-w-[88%] rounded-2xl px-3.5 py-2.5"
                style={{
                  background: isStudent ? "#1d1d1d" : "#c8ff00",
                  color: isStudent ? "#e7e7e7" : "#080808",
                  borderBottomLeftRadius: isStudent ? "4px" : "16px",
                  borderBottomRightRadius: isStudent ? "16px" : "4px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.55,
                    overflowWrap: "anywhere",
                  }}
                >
                  {message.text}
                </p>
                <div
                  className="text-right mt-1"
                  style={{
                    fontSize: "0.52rem",
                    color: isStudent ? "#666" : "rgba(8,8,8,0.55)",
                  }}
                >
                  {message.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function Resultados() {
  const destaque = {
    nome: "Rafael M.",
    objetivo: "HIPERTROFIA",
    periodo: "6 MESES",
    before: IMG.before1,
    after: IMG.after1,
  };

  const casos = [
    {
      nome: "Juliana S.",
      objetivo: "EMAGRECIMENTO",
      periodo: "8 MESES",
      before: IMG.before2,
      after: IMG.after2,
    },
    {
      nome: "Bruno K.",
      objetivo: "PERFORMANCE",
      periodo: "6 MESES",
      before: IMG.before3,
      after: IMG.after3,
    },
  ];

  const feedbacks = [
    {
      name: "Rafael M.",
      objective: "HIPERTROFIA",
      messages: [
        {
          from: "student" as const,
          text: "Lucas, consegui aumentar a carga hoje. Nem eu esperava.",
          time: "08:41",
        },
        {
          from: "lucas" as const,
          text: "Boa! É exatamente esse tipo de evolução que a gente busca. Vamos manter e ajustar o próximo treino.",
          time: "08:43",
        },
        {
          from: "student" as const,
          text: "Agora tô começando a gostar de treinar de verdade kkkkk",
          time: "08:44",
        },
      ],
    },
    {
      name: "Juliana S.",
      objective: "EMAGRECIMENTO",
      messages: [
        {
          from: "student" as const,
          text: "Consegui cumprir todos os treinos da semana.",
          time: "19:12",
        },
        {
          from: "lucas" as const,
          text: "Boa! Consistência primeiro. Vou acompanhar como seu corpo respondeu e ajustar o que for necessário.",
          time: "19:15",
        },
        {
          from: "student" as const,
          text: "Tá ficando muito mais fácil manter a rotina.",
          time: "19:17",
        },
      ],
    },
    {
      name: "Bruno K.",
      objective: "PERFORMANCE",
      messages: [
        {
          from: "student" as const,
          text: "Meu desempenho no treino de hoje foi muito melhor.",
          time: "07:28",
        },
        {
          from: "lucas" as const,
          text: "Excelente. Anotei sua resposta. Vamos usar isso para organizar a próxima progressão.",
          time: "07:31",
        },
        {
          from: "student" as const,
          text: "É muito melhor quando o treino acompanha o que eu consigo fazer.",
          time: "07:32",
        },
      ],
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
          <div className="max-w-3xl mb-14">
            <Label>Resultados e acompanhamento</Label>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 900,
                lineHeight: 0.9,
              }}
            >
              RESULTADO
              <br />
              <span style={{ color: "#c8ff00" }}>É PROCESSO.</span>
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                maxWidth: "620px",
                marginTop: "22px",
              }}
            >
              O objetivo desta seção é mostrar a jornada completa: ponto de
              partida, evolução e acompanhamento. As imagens e conversas abaixo
              são layouts demonstrativos e devem ser substituídos por materiais
              reais e autorizados antes da publicação.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <article
            className="overflow-hidden"
            style={{ border: "1px solid #1b1b1b", background: "#0f0f0f" }}
          >
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="min-w-0">
                <div
                  style={{
                    color: "#c8ff00",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    marginBottom: "8px",
                  }}
                >
                  CASO EM DESTAQUE · MOCKUP
                </div>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {destaque.nome}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  style={{
                    color: "#c8ff00",
                    border: "1px solid rgba(200,255,0,0.2)",
                    background: "rgba(200,255,0,0.07)",
                    padding: "6px 10px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                  }}
                >
                  {destaque.objetivo}
                </span>
                <span
                  style={{
                    color: "#777",
                    border: "1px solid #222",
                    padding: "6px 10px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                  }}
                >
                  {destaque.periodo}
                </span>
              </div>
            </div>

            <BeforeAfterSlider
              before={destaque.before}
              after={destaque.after}
              height={520}
            />

            <div
              className="grid md:grid-cols-3 gap-px"
              style={{ background: "#1b1b1b" }}
            >
              {[
                [
                  "01",
                  "PONTO DE PARTIDA",
                  "Entender o objetivo, rotina e contexto do aluno.",
                ],
                [
                  "02",
                  "ESTRATÉGIA",
                  "Treino estruturado para o momento e a capacidade atual.",
                ],
                [
                  "03",
                  "ACOMPANHAMENTO",
                  "Ajustar o caminho conforme a resposta e a evolução.",
                ],
              ].map(([num, title, text]) => (
                <div
                  key={num}
                  style={{ background: "#0b0b0b", padding: "22px" }}
                >
                  <div
                    style={{
                      color: "#c8ff00",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      marginBottom: "8px",
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      color: "#f5f5f5",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      marginBottom: "6px",
                    }}
                  >
                    {title}
                  </div>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="mt-20 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <Label>Outros casos</Label>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                }}
              >
                CADA ALUNO,
                <br />
                <span style={{ color: "#c8ff00" }}>UM CONTEXTO.</span>
              </h3>
            </div>
            <p
              style={{
                color: "#555",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                maxWidth: "360px",
              }}
            >
              Mostre objetivos diferentes sem transformar a seção em uma galeria
              repetitiva de cards.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-5">
          {casos.map((caso, index) => (
            <FadeUp key={caso.nome} delay={index * 0.08}>
              <article
                className="overflow-hidden h-full"
                style={{ border: "1px solid #191919", background: "#0f0f0f" }}
              >
                <div
                  className="grid grid-cols-2 gap-px"
                  style={{ background: "#222" }}
                >
                  {[
                    { label: "ANTES", src: caso.before },
                    { label: "DEPOIS", src: caso.after },
                  ].map((photo) => (
                    <div
                      key={photo.label}
                      className="relative aspect-4/5 overflow-hidden"
                      style={{ background: "#111" }}
                    >
                      <img
                        src={photo.src}
                        alt={`${photo.label} — ${caso.nome}`}
                        className="w-full h-full object-cover"
                        style={{
                          filter:
                            photo.label === "ANTES"
                              ? "brightness(0.68) saturate(0.35)"
                              : "brightness(0.9)",
                        }}
                      />
                      <span
                        className="absolute top-3 left-3"
                        style={{
                          background:
                            photo.label === "DEPOIS"
                              ? "rgba(200,255,0,0.14)"
                              : "rgba(0,0,0,0.78)",
                          color: photo.label === "DEPOIS" ? "#c8ff00" : "#fff",
                          border:
                            photo.label === "DEPOIS"
                              ? "1px solid rgba(200,255,0,0.22)"
                              : "none",
                          padding: "4px 8px",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                        }}
                      >
                        {photo.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 900,
                      }}
                    >
                      {caso.nome}
                    </h4>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "0.75rem",
                        marginTop: "4px",
                      }}
                    >
                      {caso.objetivo} · {caso.periodo}
                    </p>
                  </div>
                  <span
                    style={{
                      color: "#444",
                      fontSize: "0.65rem",
                      lineHeight: 1.5,
                      maxWidth: "220px",
                    }}
                  >
                    MOCKUP — substituir por fotos do mesmo aluno, com
                    enquadramento consistente.
                  </span>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15}>
          <div className="mt-24 mb-8">
            <Label>Feedbacks do acompanhamento</Label>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 0.92,
              }}
            >
              NÃO É SÓ O
              <br />
              <span style={{ color: "#c8ff00" }}>RESULTADO FINAL.</span>
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                maxWidth: "600px",
                marginTop: "18px",
              }}
            >
              O diferencial aparece também no caminho: dúvidas, pequenas
              vitórias, ajustes e retorno do aluno durante o acompanhamento.
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-5">
          {feedbacks.map((feedback, index) => (
            <FadeUp key={feedback.name} delay={index * 0.08}>
              <FeedbackPrint {...feedback} />
            </FadeUp>
          ))}
        </div>

        <div
          className="mt-6 px-5 py-4"
          style={{
            border: "1px dashed #242424",
            background: "#0d0d0d",
            color: "#444",
            fontSize: "0.72rem",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "#666" }}>Importante:</strong> os prints desta
          versão são mockups de interface. Na versão comercial, substitua-os por
          feedbacks verdadeiros e autorizados pelos alunos.
        </div>
      </div>
    </section>
  );
}

// ─── Planos ────────────────────────────────────────────────────────────────
type Modalidade = "online" | "semipresencial" | "presencial";

const MODALIDADE_LABEL: Record<Modalidade, string> = {
  online: "ONLINE",
  semipresencial: "SEMIPRESENCIAL",
  presencial: "PRESENCIAL",
};

function Planos() {
  const [billing, setBilling] = useState<"mensal" | "trimestral">("mensal");

  const plans = [
    {
      name: "STARTER",
      tag: "Para quem está começando",
      prices: {
        online: { mensal: 169, trimestral: 149 },
        semipresencial: { mensal: 219, trimestral: 199 },
        presencial: { mensal: 290, trimestral: 249 },
      },
      highlight: false,
      features: [
        "2 treinos por semana",
        "Planilha de treino personalizada",
        "Acompanhamento mensal",
        "Suporte via WhatsApp",
        "Avaliação inicial",
      ],
    },
    {
      name: "PRO",
      tag: "O mais escolhido",
      prices: {
        online: { mensal: 299, trimestral: 269 },
        semipresencial: { mensal: 369, trimestral: 329 },
        presencial: { mensal: 490, trimestral: 420 },
      },
      highlight: true,
      features: [
        "4 treinos por semana",
        "Planilha 100% personalizada",
        "Acompanhamento semanal",
        "Suporte via WhatsApp",
        "Avaliação quinzenal",
        "Ajustes de protocolo",
        "Comunidade exclusiva",
      ],
    },
    {
      name: "ELITE",
      tag: "Máxima performance",
      prices: {
        online: { mensal: 449, trimestral: 399 },
        semipresencial: { mensal: 549, trimestral: 489 },
        presencial: { mensal: 790, trimestral: 680 },
      },
      highlight: false,
      features: [
        "Treino altamente personalizado",
        "Acompanhamento próximo",
        "Suporte prioritário",
        "Avaliação semanal",
        "Ajustes contínuos",
        "Relatório de evolução",
        "Estratégia para performance",
      ],
    },
  ];

  const [modalidades, setModalidades] = useState<Record<string, Modalidade>>(
    Object.fromEntries(
      plans.map((plan) => [plan.name, "presencial"]),
    ) as Record<string, Modalidade>,
  );

  const selecionarModalidade = (plano: string, modalidade: Modalidade) => {
    setModalidades((current) => ({ ...current, [plano]: modalidade }));
  };

  return (
    <section
      id="planos"
      className="py-24 md:py-36 px-6 md:px-16"
      style={{ background: "#0b0b0b" }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label>Investimento</Label>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
            <div>
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
              <p
                style={{
                  color: "#555",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  maxWidth: "500px",
                  marginTop: "18px",
                }}
              >
                O mesmo plano pode funcionar em três formatos: online,
                semipresencial ou presencial. Escolha a modalidade e veja o
                valor correspondente antes de chamar no WhatsApp.
              </p>
            </div>

            {/* Toggle de pagamento */}
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
                type="button"
                aria-label="Alternar entre cobrança mensal e trimestral"
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
                  ECONOMIZE
                </span>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => {
            const modalidade = modalidades[p.name];
            const preco = p.prices[modalidade][billing];

            return (
              <FadeUp key={p.name} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full transition-all duration-300"
                  style={{
                    background: p.highlight ? "#c8ff00" : "#0f0f0f",
                    border: p.highlight ? "none" : "1px solid #1a1a1a",
                    padding: "40px 32px",
                    transform: p.highlight ? "scale(1.02)" : "scale(1)",
                    zIndex: p.highlight ? 2 : 1,
                    overflow: "hidden",
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

                  {/* Modalidade do plano */}
                  <div
                    style={{
                      borderTop: `1px solid ${p.highlight ? "rgba(8,8,8,0.15)" : "#1a1a1a"}`,
                      paddingTop: "22px",
                      marginTop: "16px",
                    }}
                  >
                    <label
                      htmlFor={`modalidade-${p.name}`}
                      style={{
                        display: "block",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 900,
                        color: p.highlight ? "rgba(8,8,8,0.55)" : "#444",
                        letterSpacing: "0.14em",
                        marginBottom: "8px",
                      }}
                    >
                      MODALIDADE
                    </label>
                    <select
                      id={`modalidade-${p.name}`}
                      value={modalidade}
                      onChange={(e) =>
                        selecionarModalidade(
                          p.name,
                          e.target.value as Modalidade,
                        )
                      }
                      style={{
                        width: "100%",
                        background: p.highlight
                          ? "rgba(8,8,8,0.08)"
                          : "#080808",
                        border: `1px solid ${p.highlight ? "rgba(8,8,8,0.18)" : "#202020"}`,
                        color: p.highlight ? "#080808" : "#f5f5f5",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        padding: "13px 14px",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      {Object.entries(MODALIDADE_LABEL).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="flex items-end gap-1 my-7">
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
                        fontSize: "clamp(3.2rem, 9vw, 4.5rem)",
                        lineHeight: 0.95,
                        color: p.highlight ? "#080808" : "#f5f5f5",
                      }}
                    >
                      {preco}
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
                      {billing === "mensal" ? "/mês" : "/mês no trimestral"}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      background: p.highlight
                        ? "rgba(8,8,8,0.1)"
                        : "rgba(200,255,0,0.08)",
                      color: p.highlight ? "#080808" : "#c8ff00",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 900,
                      letterSpacing: "0.12em",
                      padding: "6px 9px",
                      marginBottom: "22px",
                    }}
                  >
                    {MODALIDADE_LABEL[modalidade]}
                  </div>

                  <div className="flex flex-col gap-3 flex-1 mb-10">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div
                          className="shrink-0 flex items-center justify-center"
                          style={{
                            width: "18px",
                            height: "18px",
                            background: p.highlight
                              ? "rgba(8,8,8,0.12)"
                              : "rgba(200,255,0,0.1)",
                            borderRadius: "50%",
                          }}
                        >
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                          >
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
                            lineHeight: 1.45,
                            color: p.highlight ? "#080808" : "#666",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappLink(
                      `Olá, Lucas! Tenho interesse no plano ${p.name} na modalidade ${MODALIDADE_LABEL[modalidade].toLowerCase()}, ${billing === "mensal" ? "cobrança mensal" : "plano trimestral"}. Gostaria de saber mais detalhes.`,
                    )}
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
            );
          })}
        </div>

        <FadeUp delay={0.25}>
          <div
            className="mt-10"
            style={{
              border: "1px solid #171717",
              background: "#0f0f0f",
              padding: "18px 20px",
            }}
          >
            <p
              className="text-center"
              style={{
                color: "#444",
                fontSize: "0.8rem",
                fontFamily: "'Barlow', sans-serif",
                lineHeight: 1.7,
              }}
            >
              Valores exibidos como referência. Antes de publicar, confirme os
              preços reais de cada modalidade, benefícios e condições com o
              treinador.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const questions = [
    {
      q: "Como funciona a avaliação?",
      a: "Você entra em contato pelo WhatsApp e conversa sobre objetivo, rotina e momento atual. A partir disso, é definido o próximo passo do atendimento.",
    },
    {
      q: "Quais modalidades estão disponíveis?",
      a: "Você pode escolher entre atendimento online, semipresencial e presencial. A modalidade escolhida acompanha o plano quando você chamar no WhatsApp.",
    },
    {
      q: "Onde é o atendimento?",
      a: "O atendimento apresentado neste site é em Rio Branco, AC.",
    },
    {
      q: "Como escolho entre online, semipresencial e presencial?",
      a: "Cada modalidade atende a uma rotina diferente. Você escolhe a opção no card do plano ou no formulário de contato, e a escolha já vai junto na mensagem do WhatsApp.",
    },
    {
      q: "O treino é realmente personalizado?",
      a: "A proposta do serviço é montar o protocolo a partir do objetivo, histórico, limitações e rotina do aluno, em vez de usar uma planilha igual para todo mundo.",
    },
    {
      q: "O que acontece depois que eu clico em um botão?",
      a: "Você vai direto para o WhatsApp com uma mensagem pronta. Assim, a conversa continua com Lucas sem precisar preencher um cadastro longo.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ background: "#0b0b0b" }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <Label>Perguntas frequentes</Label>
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 0.92,
              }}
            >
              ANTES DE
              <br />
              <span style={{ color: "#c8ff00" }}>COMEÇAR</span>
            </h2>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-2">
          {questions.map((item, index) => {
            const isOpen = open === index;

            return (
              <FadeUp key={item.q} delay={index * 0.04}>
                <div
                  style={{ border: "1px solid #191919", background: "#0f0f0f" }}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-6 text-left"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    style={{
                      padding: "22px 24px",
                      color: "#f5f5f5",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      style={{
                        color: "#c8ff00",
                        fontSize: "1.3rem",
                        lineHeight: 1,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    <p
                      style={{
                        color: "#555",
                        fontSize: "0.85rem",
                        lineHeight: 1.8,
                        padding: "0 24px 24px",
                        maxWidth: "760px",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
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
            Seu próximo nível começa com uma conversa clara sobre seu objetivo,
            sua rotina e o que faz sentido para você.
          </p>
          <a
            href={whatsappLink(
              "Olá, Lucas! Tenho interesse em começar meu treinamento. Gostaria de saber mais detalhes.",
            )}
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
    modalidade: "",
    plano: "",
    objetivo: "",
  });

  const handle = (e: FormEvent) => {
    e.preventDefault();

    const message = `Olá, Lucas! Vim pelo seu site e gostaria de conhecer o treinamento.\n\nNome: ${form.nome}\nModalidade: ${form.modalidade}\nPlano de interesse: ${form.plano}\nObjetivo: ${form.objetivo}`;

    const whatsappUrl = whatsappLink(message);

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
            Preencha seu nome, escolha a modalidade, o plano e seu objetivo. Ao
            enviar, o WhatsApp já receberá tudo organizado para o primeiro
            atendimento.
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
                  className="shrink-0 flex items-center justify-center text-base"
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
                  <div
                    style={{
                      color: "#f5f5f5",
                      fontSize: "0.9rem",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {label === "WHATSAPP" ? (
                      <a
                        href={whatsappLink("Olá, Lucas! Vim pelo seu site.")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {val}
                      </a>
                    ) : label === "INSTAGRAM" ? (
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {val}
                      </a>
                    ) : (
                      val
                    )}
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
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="modalidade-contato"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    color: "#444",
                    letterSpacing: "0.14em",
                  }}
                >
                  MODALIDADE
                </label>
                <select
                  id="modalidade-contato"
                  required
                  value={form.modalidade}
                  onChange={(e) =>
                    setForm({ ...form, modalidade: e.target.value })
                  }
                  style={{
                    background: "#080808",
                    border: "1px solid #1e1e1e",
                    color: form.modalidade ? "#f5f5f5" : "#444",
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
                    Escolha como quer treinar...
                  </option>
                  <option value="Online">Online</option>
                  <option value="Semipresencial">Semipresencial</option>
                  <option value="Presencial">Presencial</option>
                </select>
              </div>

              {[
                {
                  id: "plano",
                  label: "PLANO DE INTERESSE",
                  opts: ["Starter", "Pro", "Elite"],
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
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="objetivo"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    color: "#444",
                    letterSpacing: "0.14em",
                  }}
                >
                  OBJETIVO PRINCIPAL
                </label>
                <select
                  id="objetivo"
                  required
                  value={form.objetivo}
                  onChange={(e) =>
                    setForm({ ...form, objetivo: e.target.value })
                  }
                  style={{
                    background: "#080808",
                    border: "1px solid #1e1e1e",
                    color: form.objetivo ? "#f5f5f5" : "#444",
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
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Hipertrofia">Hipertrofia</option>
                  <option value="Condicionamento">Condicionamento</option>
                  <option value="Performance">Performance</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div
                style={{
                  color: "#333",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  lineHeight: 1.6,
                }}
              >
                Ao enviar, o site abre o WhatsApp com seus dados e preferências
                já preenchidos.
              </div>

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
                QUERO SABER MAIS
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

// ─── WhatsApp flutuante ─────────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        "Olá, Lucas! Vim pelo site e gostaria de saber mais sobre o treinamento.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Lucas pelo WhatsApp"
      className="fixed right-4 bottom-4 sm:right-5 sm:bottom-5 z-40 flex items-center gap-3 transition-all duration-300"
      style={{
        background: "#c8ff00",
        color: "#080808",
        padding: "12px 16px",
        boxShadow: "0 10px 35px rgba(200,255,0,0.18)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 14px 45px rgba(200,255,0,0.32)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 10px 35px rgba(200,255,0,0.18)";
      }}
    >
      <FaWhatsapp size={20} />
      <span
        className="hidden sm:block"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
        }}
      >
        FALAR NO WHATSAPP
      </span>
    </a>
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
    { label: "Modalidades", href: "#modalidades" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
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
                { label: "WhatsApp", val: "+55 (68) 99240-3062" },
                { label: "Localização", val: "Rio Branco, AC" },
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
                    {label === "Instagram" ? (
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#c8ff00")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#555")
                        }
                      >
                        {val}
                      </a>
                    ) : label === "WhatsApp" ? (
                      <a
                        href={whatsappLink("Olá, Lucas! Vim pelo seu site.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#c8ff00")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#555")
                        }
                      >
                        {val}
                      </a>
                    ) : (
                      val
                    )}
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
      className="min-h-screen overflow-x-hidden selection:bg-[#c8ff00] selection:text-[#080808]"
      style={{
        background: "#080808",
        color: "#f5f5f5",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        [id] { scroll-margin-top: 92px; }
        button, a, select, input { -webkit-tap-highlight-color: transparent; }
        ::selection { background: #c8ff00; color: #080808; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <PerfilIdeal />
      <Sobre />
      <Credibilidade />
      <Metodo />
      <ComoFunciona />
      <Treinos />
      <Resultados />
      <Modalidades />
      <Planos />
      <FAQ />
      <CTAFinal />
      <Contato />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
