import Icon from "@/components/ui/icon";

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

export default function DonateSection() {
  return (
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
  );
}
