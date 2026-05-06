import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import SiteSection from "@/components/SiteSection";
import ForumSection from "@/components/ForumSection";
import DonateSection from "@/components/DonateSection";
import Icon from "@/components/ui/icon";

type Section = "site" | "forum" | "donate";

const SERVER_IP = "188.127.241.74:3109";
const STATUS_URL = "https://functions.poehali.dev/93007f83-aeeb-45bd-b98b-030e3acfba25";
const NEWS_URL = "https://functions.poehali.dev/f8b9af13-e04a-4c51-88b5-db2fd2257a25";
const NEWS_LIMIT = 6;

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

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("site");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsTotal, setNewsTotal] = useState(0);
  const [newsPage, setNewsPage] = useState(1);
  const [newsLoading, setNewsLoading] = useState(false);

  const [showAddNews, setShowAddNews] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newTag, setNewTag] = useState("Новость");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch(STATUS_URL);
      const data = await res.json();
      setServerStatus(data);
    } catch {
      setServerStatus({ online: false, players: 0, maxPlayers: 0, hostname: "" });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNews = async (page: number) => {
    setNewsLoading(true);
    try {
      const res = await fetch(`${NEWS_URL}?page=${page}&limit=${NEWS_LIMIT}`);
      const data = await res.json();
      setNews(data.news || []);
      setNewsTotal(data.total || 0);
    } catch {
      setNews([]);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(newsPage);
  }, [newsPage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setNewImagePreview(result);
      setNewImage(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitNews = async () => {
    if (!newTitle.trim() || !newText.trim()) return;
    setSubmitting(true);
    try {
      await fetch(NEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, text: newText, tag: newTag, image: newImage }),
      });
      setShowAddNews(false);
      setNewTitle(""); setNewText(""); setNewTag("Новость"); setNewImage(null); setNewImagePreview(null);
      setNewsPage(1);
      fetchNews(1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid-lines relative font-exo">
      <div className="scanline" />

      <NavBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        serverStatus={serverStatus}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="pt-16">
        {activeSection === "site" && (
          <SiteSection
            serverStatus={serverStatus}
            copied={copied}
            handleCopyIp={handleCopyIp}
            currentTime={currentTime}
            setActiveSection={setActiveSection}
            news={news}
            newsTotal={newsTotal}
            newsPage={newsPage}
            setNewsPage={setNewsPage}
            newsLoading={newsLoading}
            NEWS_LIMIT={NEWS_LIMIT}
            showAddNews={showAddNews}
            setShowAddNews={setShowAddNews}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newText={newText}
            setNewText={setNewText}
            newTag={newTag}
            setNewTag={setNewTag}
            newImagePreview={newImagePreview}
            handleImageChange={handleImageChange}
            setNewImage={setNewImage}
            setNewImagePreview={setNewImagePreview}
            submitting={submitting}
            handleSubmitNews={handleSubmitNews}
          />
        )}

        {activeSection === "forum" && <ForumSection />}

        {activeSection === "donate" && <DonateSection />}
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
