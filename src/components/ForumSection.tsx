import Icon from "@/components/ui/icon";

const FORUM_TOPICS = [
  { title: "Правила сервера v3.1 — обязательно к прочтению", replies: 0, pinned: true, author: "Admin" },
  { title: "Гайд по созданию персонажа для новичков", replies: 34, pinned: true, author: "Moderator" },
  { title: "Жалобы на игроков — правила подачи", replies: 12, pinned: false, author: "Support" },
  { title: "Набор в фракцию LSPD — требования и анкета", replies: 67, pinned: false, author: "LSPD_Command" },
  { title: "Как открыть собственный бизнес?", replies: 45, pinned: false, author: "xNightWolf" },
  { title: "Баг с инвентарём — список известных проблем", replies: 23, pinned: false, author: "Dev_Team" },
];

export default function ForumSection() {
  return (
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
  );
}
