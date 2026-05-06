import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Section = "site" | "forum" | "donate";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "site", label: "Главная", icon: "Home" },
  { id: "forum", label: "Форум", icon: "MessageSquare" },
  { id: "donate", label: "Донат", icon: "Gem" },
];

const SERVERS = [
  { name: "Nebraska RP #1", ip: "188.127.241.74:3109", players: 248, maxPlayers: 500, mode: "Roleplay" },
];

const UPDATES = [
  {
    id: 1, type: "update", icon: "Zap",
    title: "Обновление 4.2 — Новые районы города",
    text: "Добавлены 3 новых района с уникальными бизнесами и интерьерами. Расширена карта восточного даунтауна.",
    date: "6 мая 2026", tag: "Обновление",
  },
  {
    id: 2, type: "event", icon: "Trophy",
    title: "Турнир стрелков — призовой фонд 5 000 000$",
    text: "Ежемесячный турнир на арене. Регистрация открыта. Участвуй и выиграй уникальный скин оружия.",
    date: "5 мая 2026", tag: "Событие",
  },
  {
    id: 3, type: "update", icon: "Shield",
    title: "Обновление системы фракций",
    text: "Полностью переработана система полиции: новые звания, обмундирование и транспорт для LSPD.",
    date: "3 мая 2026", tag: "Обновление",
  },
  {
    id: 4, type: "event", icon: "Star",
    title: "Двойной опыт на выходных",
    text: "Каждые выходные двойной опыт за любую активность. Качайся быстрее вместе с Nebraska RP!",
    date: "2 мая 2026", tag: "Событие",
  },
  {
    id: 5, type: "update", icon: "Car",
    title: "20 новых транспортных средств",
    text: "Пополнен автопарк сервера: спорткары, мотоциклы, грузовики. Доступны у дилеров по всему городу.",
    date: "28 апреля 2026", tag: "Обновление",
  },
  {
    id: 6, type: "event", icon: "Gift",
    title: "Праздничный ивент — День города",
    text: "Три дня праздника с уникальными заданиями, розыгрышами и особыми наградами для всех игроков.",
    date: "25 апреля 2026", tag: "Событие",
  },
];

const FORUM_TOPICS = [
  { title: "Правила сервера v3.1 — обязательно к прочтению", replies: 0, pinned: true, author: "Admin" },
  { title: "Гайд по созданию персонажа для новичков", replies: 34, pinned: true, author: "Moderator" },
  { title: "Жалобы на игроков — правила подачи", replies: 12, pinned: false, author: "Support" },
  { title: "Набор в фракцию LSPD — требования и анкета", replies: 67, pinned: false, author: "LSPD_Command" },
  { title: "Как открыть собственный бизнес?", replies: 45, pinned: false, author: "xNightWolf" },
  { title: "Баг с инвентарём — список известных проблем", replies: 23, pinned: false, author: "Dev_Team" },
];

const DONATE_PACKAGES = [
  {
    name: "Базовый", price: "149 ₽",
    color: "from-blue-900/40 to-blue-950/60", border: "border-blue-700/40", highlight: false,
    features: ["VIP статус на 30 дней", "Уникальный тег в чате", "2 дополнительных скина", "Приоритет входа на сервер"],
  },
  {
    name: "Премиум", price: "349 ₽",
    color: "from-cyan-900/40 to-blue-950/60", border: "border-cyan-500/60", highlight: true,
    features: ["VIP+ статус на 30 дней", "5 уникальных скинов", "Личный транспорт", "Уникальный ник в чате", "Доступ к закрытым зонам", "Удвоенный опыт"],
  },
  {
    name: "Элита", price: "799 ₽",
    color: "from-indigo-900/40 to-blue-950/60", border: "border-indigo-400/50", highlight: false,
    features: ["ELITE статус навсегда", "10 эксклюзивных скинов", "Личный дом в городе", "Личный телохранитель (NPC)", "Все функции Премиум", "Специальный значок"],
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("site");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalOnline = SERVERS.reduce((s, srv) => s + srv.players, 0);

  return (
    <div className="min-h-screen grid-lines relative font-exo">
      <div className="scanline" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[var(--navy-border)]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/869983e7-1a51-4569-bf14-862f6fc16bef/bucket/1ae80966-383e-43e3-858e-f9cf7735359f.png"
              alt="Nebraska RP Logo"
              className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(0,180,255,0.6)]"
            />
            <div>
              <span className="font-oswald font-bold text-white text-lg tracking-wider">NEBRASKA</span>
              <span className="font-oswald font-light text-[var(--neon-blue)] text-lg tracking-wider ml-1">ROLE PLAY</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded font-semibold text-sm tracking-wide transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-[var(--neon-blue)] text-[var(--deep-navy)] neon-glow"
                    : "text-blue-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 glass-card px-3 py-1.5 rounded">
            <div className="w-2 h-2 rounded-full bg-green-400 online-dot" />
            <span className="text-green-400 font-bold text-sm">{totalOnline}</span>
            <span className="text-blue-400/60 text-xs">онлайн</span>
          </div>

          <button
            className="md:hidden text-blue-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--navy-border)] px-4 py-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded font-semibold text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-[var(--neon-blue)] text-[var(--deep-navy)]"
                    : "text-blue-300 hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* ===== ГЛАВНАЯ ===== */}
        {activeSection === "site" && (
          <div className="animate-fade-in">
            <section className="relative hero-bg min-h-[70vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-navy)] via-[var(--deep-navy)]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-navy)] via-transparent to-transparent" />
              <div className="relative max-w-7xl mx-auto px-4 py-20 animate-slide-up">
                <div className="inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 online-dot" />
                  <span className="text-green-400 text-xs font-semibold uppercase tracking-widest">Серверы онлайн</span>
                </div>
                <img
                  src="https://cdn.poehali.dev/projects/869983e7-1a51-4569-bf14-862f6fc16bef/bucket/1ae80966-383e-43e3-858e-f9cf7735359f.png"
                  alt="Nebraska RP"
                  className="w-24 h-24 object-contain drop-shadow-[0_0_24px_rgba(0,180,255,0.7)] mb-4"
                />
                <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-none mb-2">NEBRASKA</h1>
                <h2 className="font-oswald text-5xl md:text-7xl font-light neon-text leading-none mb-6">ROLE PLAY</h2>
                <p className="text-blue-300/80 text-lg max-w-xl mb-8 font-light">
                  Лучший ролевой сервер SA:MP. Живая экономика, реалистичные фракции и уникальный игровой мир ждут тебя.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[var(--neon-blue)] text-[var(--deep-navy)] font-bold px-8 py-3 rounded neon-glow hover:scale-105 transition-transform text-sm tracking-wide uppercase">
                    Играть сейчас
                  </button>
                  <button
                    onClick={() => setActiveSection("forum")}
                    className="glass-card neon-border border text-[var(--neon-blue)] font-semibold px-8 py-3 rounded hover:bg-[var(--blue-glow)] transition-colors text-sm tracking-wide uppercase"
                  >
                    Форум
                  </button>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-lg mx-auto">
                {SERVERS.map((srv, i) => (
                  <div key={i} className="card-navy rounded-xl p-5 neon-border border hover:scale-[1.02] transition-transform animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-oswald text-white font-semibold text-lg">{srv.name}</div>
                        <div className="text-blue-400/50 text-xs font-mono mt-0.5">{srv.ip}</div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-950/50 px-2 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 online-dot" />
                        <span className="text-green-400 text-xs font-semibold">Online</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-blue-400/60">Игроков</span>
                        <span className="text-white font-bold">{srv.players} / {srv.maxPlayers}</span>
                      </div>
                      <div className="h-1.5 bg-[var(--navy)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(srv.players / srv.maxPlayers) * 100}%`,
                            background: `linear-gradient(90deg, var(--neon-blue), var(--neon-cyan))`,
                            boxShadow: `0 0 8px var(--neon-blue)`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-blue-400/50 text-xs">{srv.mode}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded bg-[var(--neon-blue)] neon-glow" />
                <h2 className="font-oswald text-2xl font-semibold text-white tracking-wide">Лента обновлений</h2>
                <div className="ml-auto glass-card px-3 py-1 rounded text-blue-400/60 text-xs font-mono">
                  {currentTime.toLocaleTimeString("ru-RU")}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UPDATES.map((update, i) => (
                  <div
                    key={update.id}
                    className="card-navy rounded-xl p-5 border border-[var(--navy-border)] hover:border-[var(--neon-blue)]/40 hover:shadow-[0_0_20px_rgba(0,180,255,0.08)] transition-all cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${update.type === "event" ? "bg-cyan-500/10 border border-cyan-500/30" : "bg-blue-500/10 border border-blue-500/30"}`}>
                        <Icon name={update.icon} size={18} className={update.type === "event" ? "text-cyan-400" : "text-blue-400"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${update.type === "event" ? "bg-cyan-500/10 text-cyan-400" : "bg-blue-500/10 text-blue-400"}`}>
                            {update.tag}
                          </span>
                          <span className="text-blue-400/40 text-xs">{update.date}</span>
                        </div>
                        <div className="text-white font-semibold text-sm mb-1 leading-snug">{update.title}</div>
                        <div className="text-blue-300/60 text-xs leading-relaxed">{update.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===== ФОРУМ ===== */}
        {activeSection === "forum" && (
          <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded bg-[var(--neon-blue)] neon-glow" />
              <h1 className="font-oswald text-3xl font-semibold text-white tracking-wide">Форум</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: "BookOpen", label: "Правила", count: 8, color: "text-blue-400" },
                { icon: "Bell", label: "Новости", count: 24, color: "text-cyan-400" },
                { icon: "Users", label: "Фракции", count: 47, color: "text-indigo-400" },
                { icon: "HelpCircle", label: "Помощь", count: 136, color: "text-blue-400" },
                { icon: "AlertTriangle", label: "Жалобы", count: 89, color: "text-yellow-500" },
                { icon: "MessageCircle", label: "Общение", count: 312, color: "text-cyan-400" },
              ].map((cat, i) => (
                <button key={i} className="card-navy border border-[var(--navy-border)] hover:border-[var(--neon-blue)]/50 rounded-xl p-4 flex items-center gap-3 transition-all hover:scale-[1.02] animate-slide-up" style={{ animationDelay: `${i * 0.07}s` }}>
                  <Icon name={cat.icon} size={20} className={cat.color} />
                  <span className="text-white font-semibold text-sm">{cat.label}</span>
                  <span className="ml-auto text-blue-400/40 text-xs">{cat.count}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded bg-[var(--neon-blue)]/60" />
              <h2 className="font-oswald text-xl text-white tracking-wide">Последние темы</h2>
            </div>
            <div className="rounded-xl overflow-hidden border border-[var(--navy-border)]">
              {FORUM_TOPICS.map((topic, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-[var(--navy-border)] last:border-b-0 hover:bg-[var(--blue-glow)] transition-colors cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${topic.pinned ? "bg-[var(--neon-blue)]/10 border border-[var(--neon-blue)]/30" : "bg-[var(--navy)]"}`}>
                    <Icon name={topic.pinned ? "Pin" : "MessageSquare"} size={14} className={topic.pinned ? "text-[var(--neon-blue)]" : "text-blue-400/40"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{topic.title}</div>
                    <div className="text-blue-400/50 text-xs mt-0.5">{topic.author}</div>
                  </div>
                  <div className="text-blue-400/40 text-xs whitespace-nowrap">{topic.replies} отв.</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="glass-card neon-border border text-[var(--neon-blue)] font-semibold px-8 py-2.5 rounded hover:bg-[var(--blue-glow)] transition-colors text-sm">
                Перейти на форум
              </button>
            </div>
          </div>
        )}

        {/* ===== ДОНАТ ===== */}
        {activeSection === "donate" && (
          <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-1 h-8 rounded bg-[var(--neon-blue)] neon-glow" />
                <h1 className="font-oswald text-3xl font-semibold text-white tracking-wide">Поддержать сервер</h1>
                <div className="w-1 h-8 rounded bg-[var(--neon-blue)] neon-glow" />
              </div>
              <p className="text-blue-300/60 text-sm max-w-md mx-auto">
                Ваша поддержка помогает развивать сервер. Получайте уникальные привилегии и выделяйтесь среди других игроков.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DONATE_PACKAGES.map((pkg, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 border bg-gradient-to-br ${pkg.color} ${pkg.border} relative overflow-hidden animate-slide-up transition-transform hover:scale-[1.03] ${pkg.highlight ? "neon-glow" : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {pkg.highlight && (
                    <div className="absolute top-4 right-4 bg-[var(--neon-blue)] text-[var(--deep-navy)] text-xs font-bold px-2 py-0.5 rounded-full">ХИТ</div>
                  )}
                  <div className="font-oswald text-2xl font-bold text-white mb-1">{pkg.name}</div>
                  <div className="text-3xl font-bold neon-text mb-6">{pkg.price}</div>
                  <ul className="space-y-2.5 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-blue-200/80 text-sm">
                        <Icon name="Check" size={14} className="text-[var(--neon-blue)] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all ${pkg.highlight ? "bg-[var(--neon-blue)] text-[var(--deep-navy)] neon-glow hover:scale-105" : "glass-card border border-[var(--neon-blue)]/30 text-[var(--neon-blue)] hover:bg-[var(--blue-glow)]"}`}>
                    Купить {pkg.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-10 card-navy rounded-2xl p-6 border border-[var(--navy-border)]">
              <h3 className="font-oswald text-lg text-white mb-4 tracking-wide">Часто задаваемые вопросы</h3>
              <div className="space-y-3">
                {[
                  ["Как активируется покупка?", "Привилегии активируются автоматически в течение 5 минут после оплаты."],
                  ["Можно ли вернуть деньги?", "Возврат средств за игровые привилегии не предусмотрен."],
                  ["Какие способы оплаты доступны?", "Принимаем карты Visa, МИР, а также электронные кошельки."],
                ].map(([q, a], i) => (
                  <div key={i} className="glass-card rounded-lg p-4">
                    <div className="text-white text-sm font-semibold mb-1">{q}</div>
                    <div className="text-blue-300/60 text-xs">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--navy-border)] mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-oswald text-white font-semibold">NEBRASKA ROLE PLAY</span>
            <span className="text-blue-400/40 text-xs">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-blue-400/50 text-xs">
            <span className="hover:text-[var(--neon-blue)] cursor-pointer transition-colors">Discord</span>
            <span className="hover:text-[var(--neon-blue)] cursor-pointer transition-colors">VK</span>
            <span className="hover:text-[var(--neon-blue)] cursor-pointer transition-colors">Telegram</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400/40 text-xs">
            <Icon name="Shield" size={12} />
            Сервер защищён Anti-Cheat
          </div>
        </div>
      </footer>
    </div>
  );
}