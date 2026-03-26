"use client";

/* ── Unsplash random images ── */
const IMG = {
  obj1: "./factory1.png",
  obj2: "./factory2.png",
  obj3: "./factory3.png",
  obj4: "./factory4.png",
  mission:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  stats: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  cta: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
};

const stats = [
  { value: "10+", label: "Лет опыта" },
  { value: "200+", label: "Реализованных проектов" },
  { value: "50+", label: "Специалистов" },
  { value: "14+", label: "Регионов" },
];

const services = [
  {
    title: "Проектирование систем безопасности",
    desc: "Разработка проектной документации для систем видеонаблюдения, контроля доступа и сигнализации.",
  },
  {
    title: "Монтаж и пусконаладка",
    desc: "Профессиональный монтаж инженерных систем на объектах любой сложности.",
  },
  {
    title: "Использование инженерных систем",
    desc: "Обслуживание и эксплуатация установленных систем безопасности.",
  },
  {
    title: "Пуско-наладочные работы",
    desc: "Настройка и тестирование смонтированного оборудования перед сдачей объекта.",
  },
];

const reasons = [
  {
    title: "Работаем со сложными объектами",
    desc: "Реализуем проекты на промышленных предприятиях, объектах повышенной сложности и критической инфраструктуре.",
  },
  {
    title: "Собственная команда специалистов",
    desc: "Все работы выполняются штатными сертифицированными специалистами без привлечения субподрядчиков.",
  },
  {
    title: "Опыт работы с различными типами объектов",
    desc: "За годы работы реализовали проекты на промышленных, коммерческих и государственных объектах.",
  },
  {
    title: "Ориентация на результат проекта",
    desc: "Гарантируем выполнение работ в срок и в соответствии с техническим заданием заказчика.",
  },
];

const objects = [
  {
    title: "Промышленные предприятия",
    desc: "Заводы, фабрики и производственные комплексы с повышенными требованиями к безопасности.",
    img: IMG.obj1,
    red: true,
    odd: true,
  },
  {
    title: "Крупные офисные здания",
    desc: "Бизнес-центры и офисные здания — комплексные инженерные системы под ключ.",
    img: IMG.obj2,
    red: true,
    odd: false,
  },
  {
    title: "Торговые и общественные объекты",
    desc: "Торговые центры, гостиницы, рестораны и другие объекты общественного назначения.",
    img: IMG.obj3,
    red: true,
    odd: true,
  },
  {
    title: "Государственные и муниципальные объекты",
    desc: "Государственные учреждения с высокими требованиями к надёжности и сертификации.",
    img: IMG.obj4,
    red: true,
    odd: false,
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-white font-sans text-gray-900">
      {/* ════════════ HERO ════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[820px] items-center">
        <div className="flex flex-col justify-center px-8 py-20 md:px-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Инженерные <span className="text-red-600">решения</span>,<br />
            которым доверяют
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-md mb-8">
            Проектируем и монтируем инженерные системы безопасности для
            промышленных, коммерческих и государственных объектов любой
            сложности.
          </p>
        </div>
        <div className="relative">
          <img src="./about-hero.png" alt="" />
        </div>
      </section>

      {/* ════════════ MISSION ════════════ */}
      <section className="bg-[#1a2b3c] py-20 px-8 md:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug mb-4">
              Наша миссия — создавать безопасные и надёжные инженерные системы
            </h2>
            <p className="text-white/60 leading-relaxed">
              Мы берёмся за проекты любой сложности и доводим их до результата.
              Каждый объект — это ответственность перед клиентом и обществом.
            </p>
          </div>
          <div className="relative h-64 rounded overflow-hidden">
            <img
              src={IMG.mission}
              alt="Mission"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center shadow-xl">
              <svg
                className="w-7 h-7 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section className="container mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-20">
        <div className="relative min-h-72 md:min-h-0 overflow-hidden">
          <img
            src={IMG.stats}
            alt="Stats"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="bg-gray-800 flex flex-col justify-center px-8 py-14 md:px-14">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-1">
            Инженерные решения
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">
            для вашего бизнеса
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.value}
                className="bg-white/5 border border-white/10 rounded px-5 py-5"
              >
                <span className="block text-4xl font-bold text-red-500 leading-none mb-1">
                  {s.value}
                </span>
                <span className="text-xs text-white/50 uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <button className="w-fit bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-8 py-3 text-sm">
            Подробнее об услугах
          </button>
        </div>
      </section>

      {/* ════════════ FULL CYCLE ════════════ */}
      <section className="py-20 px-8 md:px-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Полный цикл <span className="text-red-600">инженерных</span> работ
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
              От проектирования до монтажа и технического обслуживания — мы
              берём на себя все этапы реализации проекта.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex gap-6">
              <ul className="divide-y divide-gray-100 flex-1">
                {services.map((s, i) => (
                  <li key={i} className="flex gap-3 py-5">
                    <span className="mt-2 w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                    <div>
                      <strong className="block text-sm font-semibold mb-1">
                        {s.title}
                      </strong>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[550px] rounded overflow-hidden">
              <img
                src={"./sikl.png"}
                alt="Cycle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ WHY US ════════════ */}
      <section className="bg-gray-50 py-20 px-8 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Почему нам <span className="text-red-600">доверяют</span> сложные
            объекты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {reasons.map((r, i) => (
              <div key={i} className="py-8 border-b border-gray-200">
                <h3 className="font-semibold mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ OBJECTS ════════════ */}
      <section className="py-20 px-8 md:px-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            С какими <span className="text-red-600">объектами</span> мы работаем
          </h2>
          <div className="flex flex-col gap-10">
            {objects.map((o, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row ${o.odd ? "md:flex-row-reverse" : ""} gap-8 items-center justify-between`}
              >
                <div className="relative w-full md:w-[550px] h-auto flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className={`text-2xl font-semibold mb-2 ${o.red ? "text-red-600" : "text-gray-900"}`}
                  >
                    {o.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                    {o.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 mb-20 container mx-auto">
        <div className="px-4 py-16 md:px-14 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Получить консультацию
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Оставьте заявку — мы свяжемся в течение 24 часов и проведём
            бесплатную консультацию по вашему проекту.
          </p>
          <div className="flex flex-col gap-3">
            {["Ваше имя", "Номер телефона", "Название компании"].map((p, i) => (
              <input
                key={i}
                type="text"
                placeholder={p}
                className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors hover:border-gray-400"
              />
            ))}
            <textarea
              placeholder="Сообщение"
              rows={4}
              className="border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors resize-none hover:border-gray-400"
            />
            <button className="w-fit bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-8 py-3 text-sm">
              Отправить
            </button>
          </div>
        </div>
        <div className="relative min-h-80 md:min-h-0 overflow-hidden">
          <img
            src={IMG.cta}
            alt="Contact"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>
    </main>
  );
}
