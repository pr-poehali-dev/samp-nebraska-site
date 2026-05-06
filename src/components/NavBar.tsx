import Icon from "@/components/ui/icon";

type Section = "site" | "forum" | "donate";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "site", label: "Главная", icon: "Home" },
  { id: "forum", label: "Форум", icon: "MessageSquare" },
  { id: "donate", label: "Донат", icon: "Gem" },
];

interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  hostname: string;
}

interface NavBarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  serverStatus: ServerStatus | null;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export default function NavBar({
  activeSection,
  setActiveSection,
  serverStatus,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavBarProps) {
  return (
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
          <div className={`w-2 h-2 rounded-full ${serverStatus?.online ? "bg-green-400 online-dot" : "bg-red-500"}`} />
          {serverStatus === null ? (
            <span className="text-blue-400/60 text-xs">загрузка...</span>
          ) : serverStatus.online ? (
            <>
              <span className="text-green-400 font-bold text-sm">{serverStatus.players}</span>
              <span className="text-blue-400/60 text-xs">онлайн</span>
            </>
          ) : (
            <span className="text-red-400 text-xs font-semibold">офлайн</span>
          )}
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
  );
}
