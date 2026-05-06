import Icon from "@/components/ui/icon";

type Section = "site" | "forum" | "donate";

interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  hostname: string;
}

interface NewsItem {
  id: number;
  title: string;
  text: string;
  tag: string;
  image_url: string | null;
  created_at: string;
}

const SERVER_IP = "188.127.241.74:3109";

interface SiteSectionProps {
  serverStatus: ServerStatus | null;
  copied: boolean;
  handleCopyIp: () => void;
  currentTime: Date;
  setActiveSection: (s: Section) => void;
  news: NewsItem[];
  newsTotal: number;
  newsPage: number;
  setNewsPage: (fn: (p: number) => number) => void;
  newsLoading: boolean;
  NEWS_LIMIT: number;
  showAddNews: boolean;
  setShowAddNews: (v: boolean) => void;
  newTitle: string;
  setNewTitle: (v: string) => void;
  newText: string;
  setNewText: (v: string) => void;
  newTag: string;
  setNewTag: (v: string) => void;
  newImagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNewImage: (v: string | null) => void;
  setNewImagePreview: (v: string | null) => void;
  submitting: boolean;
  handleSubmitNews: () => void;
}

export default function SiteSection({
  serverStatus,
  copied,
  handleCopyIp,
  currentTime,
  setActiveSection,
  news,
  newsTotal,
  newsPage,
  setNewsPage,
  newsLoading,
  NEWS_LIMIT,
  showAddNews,
  setShowAddNews,
  newTitle,
  setNewTitle,
  newText,
  setNewText,
  newTag,
  setNewTag,
  newImagePreview,
  handleImageChange,
  setNewImage,
  setNewImagePreview,
  submitting,
  handleSubmitNews,
}: SiteSectionProps) {
  return (
    <div className="animate-fade-in">
      <section className="relative hero-bg min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-navy)] via-[var(--deep-navy)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-navy)] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full mb-6">
            <div className={`w-1.5 h-1.5 rounded-full ${serverStatus?.online ? "bg-green-400 online-dot" : serverStatus === null ? "bg-blue-400 animate-pulse" : "bg-red-500"}`} />
            <span className={`text-xs font-semibold uppercase tracking-widest ${serverStatus?.online ? "text-green-400" : serverStatus === null ? "text-blue-400" : "text-red-400"}`}>
              {serverStatus === null ? "Проверка сервера..." : serverStatus.online ? `Онлайн · ${serverStatus.players} игроков` : "Сервер недоступен"}
            </span>
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
            <button
              onClick={handleCopyIp}
              className="bg-[var(--neon-blue)] text-[var(--deep-navy)] font-bold px-8 py-3 rounded neon-glow hover:scale-105 transition-transform text-sm tracking-wide uppercase flex items-center gap-2"
            >
              <Icon name={copied ? "Check" : "Copy"} size={15} />
              {copied ? "IP скопирован!" : "Играть сейчас"}
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
        <div className="max-w-lg mx-auto">
          <div className="card-navy rounded-xl p-5 neon-border border animate-slide-up">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-oswald text-white font-semibold text-lg">Nebraska RP #1</div>
                <div className="text-blue-400/50 text-xs font-mono mt-0.5">{SERVER_IP}</div>
              </div>
              {serverStatus === null ? (
                <div className="flex items-center gap-1.5 bg-blue-950/50 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-400 text-xs font-semibold">Проверка...</span>
                </div>
              ) : serverStatus.online ? (
                <div className="flex items-center gap-1.5 bg-green-950/50 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 online-dot" />
                  <span className="text-green-400 text-xs font-semibold">Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-red-950/50 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-red-400 text-xs font-semibold">Offline</span>
                </div>
              )}
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-400/60">Игроков</span>
                <span className="text-white font-bold">
                  {serverStatus ? `${serverStatus.players} / ${serverStatus.maxPlayers}` : "— / —"}
                </span>
              </div>
              <div className="h-1.5 bg-[var(--navy)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: serverStatus && serverStatus.maxPlayers > 0
                      ? `${(serverStatus.players / serverStatus.maxPlayers) * 100}%`
                      : "0%",
                    background: `linear-gradient(90deg, var(--neon-blue), var(--neon-cyan))`,
                    boxShadow: `0 0 8px var(--neon-blue)`,
                  }}
                />
              </div>
            </div>
            <div className="text-blue-400/50 text-xs">Roleplay</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded bg-[var(--neon-blue)] neon-glow" />
          <h2 className="font-oswald text-2xl font-semibold text-white tracking-wide">Новости</h2>
          <div className="ml-auto flex items-center gap-2">
            <div className="glass-card px-3 py-1 rounded text-blue-400/60 text-xs font-mono">
              {currentTime.toLocaleTimeString("ru-RU")}
            </div>
            <button
              onClick={() => setShowAddNews(!showAddNews)}
              className="flex items-center gap-1.5 bg-[var(--neon-blue)]/10 border border-[var(--neon-blue)]/30 hover:bg-[var(--neon-blue)]/20 text-[var(--neon-blue)] text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            >
              <Icon name="Plus" size={13} />
              Добавить
            </button>
          </div>
        </div>

        {showAddNews && (
          <div className="card-navy rounded-xl p-5 border border-[var(--neon-blue)]/30 mb-6 animate-slide-up">
            <div className="font-oswald text-white font-semibold text-lg mb-4">Новая запись</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="bg-[var(--navy)] border border-[var(--navy-border)] rounded px-3 py-2 text-white text-sm placeholder-blue-400/40 focus:outline-none focus:border-[var(--neon-blue)]/50"
                placeholder="Заголовок"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <select
                className="bg-[var(--navy)] border border-[var(--navy-border)] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--neon-blue)]/50"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
              >
                <option value="Новость">Новость</option>
                <option value="Обновление">Обновление</option>
                <option value="Событие">Событие</option>
              </select>
            </div>
            <textarea
              className="w-full bg-[var(--navy)] border border-[var(--navy-border)] rounded px-3 py-2 text-white text-sm placeholder-blue-400/40 focus:outline-none focus:border-[var(--neon-blue)]/50 mb-4 resize-none"
              placeholder="Текст новости..."
              rows={3}
              value={newText}
              onChange={e => setNewText(e.target.value)}
            />
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer text-blue-400 hover:text-[var(--neon-blue)] text-sm transition-colors">
                <Icon name="Image" size={16} />
                <span>Прикрепить фото</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              {newImagePreview && (
                <div className="relative">
                  <img src={newImagePreview} className="w-16 h-16 object-cover rounded border border-[var(--navy-border)]" />
                  <button
                    onClick={() => { setNewImage(null); setNewImagePreview(null); }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmitNews}
                disabled={submitting || !newTitle.trim() || !newText.trim()}
                className="bg-[var(--neon-blue)] text-[var(--deep-navy)] font-bold px-6 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                {submitting ? "Публикую..." : "Опубликовать"}
              </button>
              <button
                onClick={() => setShowAddNews(false)}
                className="glass-card border border-[var(--navy-border)] text-blue-400 px-6 py-2 rounded text-sm hover:text-white transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {newsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-navy rounded-xl p-5 border border-[var(--navy-border)] animate-pulse h-32" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map((item, i) => (
              <div
                key={item.id}
                className="card-navy rounded-xl border border-[var(--navy-border)] hover:border-[var(--neon-blue)]/40 hover:shadow-[0_0_20px_rgba(0,180,255,0.08)] transition-all overflow-hidden animate-slide-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.tag === "Событие" ? "bg-cyan-500/10 text-cyan-400" : item.tag === "Обновление" ? "bg-blue-500/10 text-blue-400" : "bg-indigo-500/10 text-indigo-400"}`}>
                      {item.tag}
                    </span>
                    <span className="text-blue-400/40 text-xs">{item.created_at}</span>
                  </div>
                  <div className="text-white font-semibold text-sm mb-1 leading-snug">{item.title}</div>
                  <div className="text-blue-300/60 text-xs leading-relaxed">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {newsTotal > NEWS_LIMIT && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setNewsPage(p => Math.max(1, p - 1))}
              disabled={newsPage === 1}
              className="glass-card border border-[var(--navy-border)] text-blue-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded text-sm transition-colors flex items-center gap-1"
            >
              <Icon name="ChevronLeft" size={15} />
              Назад
            </button>
            <span className="text-blue-400/60 text-sm px-3">
              {newsPage} / {Math.ceil(newsTotal / NEWS_LIMIT)}
            </span>
            <button
              onClick={() => setNewsPage(p => p + 1)}
              disabled={newsPage >= Math.ceil(newsTotal / NEWS_LIMIT)}
              className="glass-card border border-[var(--navy-border)] text-blue-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded text-sm transition-colors flex items-center gap-1"
            >
              Вперёд
              <Icon name="ChevronRight" size={15} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
