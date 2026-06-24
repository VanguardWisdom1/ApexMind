import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Flame, 
  Languages, 
  Copy, 
  Check, 
  History, 
  Star, 
  Trash2, 
  RefreshCw, 
  Tv, 
  Twitter, 
  Instagram, 
  Smartphone, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight,
  Info,
  Calendar,
  Award,
  Layers,
  Search,
  BookOpen,
  Settings,
  X,
  Youtube,
  Facebook,
  Sun,
  Moon,
  Globe
} from "lucide-react";

interface GeneratedIdea {
  title: string;
  description: string;
  hook: string;
  hashtag: string;
}

interface HistoryItem {
  id: string;
  topic: string;
  language: string;
  timestamp: number;
  data: GeneratedIdea;
  isFavorite: boolean;
}

const TRANSLATIONS = {
  en: {
    title: "ApexMind",
    tagline: "AI Content Strategist & Viral Growth Hacker",
    strategyGuide: "Strategy Guide",
    engineLive: "Engine Live",
    draftsCreated: "Drafts Created",
    starred: "Starred",
    campaignBlueprint: "Campaign Blueprint",
    languageSelect: "Auto-detect Language",
    english: "English",
    burmese: "Burmese",
    topicLabel: "Topic or Raw Idea",
    suggestionLabel: "Or inject a high-performing hook template:",
    secretsHidden: "Secrets Hidden",
    failChecklist: "Fail Checklist",
    thirtyDayChallenge: "30-Day Challenge",
    masterShortcut: "Master Shortcut",
    ultimateRoutine: "Ultimate Routine",
    generateButton: "Generate Viral Concept",
    generatingButton: "Crafting strategy...",
    contentVault: "Your Content Vault",
    clearAll: "Clear All",
    allDrafts: "All Drafts",
    favorites: "Favorites",
    noContentTitle: "No content in vault yet",
    noContentText: "Your generated campaigns will save automatically for quick offline retrieval.",
    growthEngine: "Growth Hacker Engine Running",
    growthText: "Formatting virality vectors and optimizing headline-to-hook click psychology...",
    progressStage: "Campaign Phase",
    blueprintWorkspace: "Live Blueprint Workspace",
    creativeSuite: "Viral Creative Suite",
    previewTitle: "Live Platform Mockup",
    previewSubtitle: "(Interactive Preview)",
    optimizedTitle: "Optimized Title",
    hashtags: "Hashtags",
    twoSecHook: "2-Second Hook",
    strategicSummary: "Strategic Summary",
    copyPacket: "Copy Full Blueprint Packet",
    packetCopied: "Blueprint Packet Copied!",
    emptyWorkspaceTitle: "Your Creative Workspace is Ready",
    emptyWorkspaceText: "Input a topic, title, or click one of our popular growth formulas to watch the strategist compile your hooks and tags.",
    outputWireframe: "Output Wireframe",
    ctrTitle: "CTR Title",
    twoSHook: "2s Hook",
    summary: "Summary",
    strategyGuideTitle: "Growth Hacker Strategy & Virality Guide",
    twoSecRuleTitle: "The 2-Second Hook Rule",
    twoSecRuleDesc: "The human attention span on vertical video feeds is shorter than ever. Your hook must present an open loop (a question unanswered), a highly relatable problem, or high-authority statistics immediately. Don't waste time on introductions.",
    ctrTitleOptimization: "Optimizing Titles for CTR",
    ctrTitleDesc: "A high click-through rate (CTR) is driven by emotional curiosity. Pair rational concepts with high-impact words like 'Secrets', 'Shortcut', or 'Mistakes'. Always keep titles under 60 characters to prevent truncation on mobile screens.",
    hashtagDensityTitle: "Hashtag Density & SEO",
    hashtagDensityDesc: "Use 1-2 broad category hashtags (e.g., #productivity) and 2-3 super-targeted keywords (e.g., #focusroutine). Too many hashtags dilutes the platform indexing algorithm. Our generator automatically provides the optimal 4-5 high-density tags.",
    langOptimizationTitle: "Language Specific Optimization",
    langOptimizationDesc: "Our system auto-adjusts tone to the requested language. English uses high-energy Western startup colloquialisms, while Burmese script utilizes native conversational growth triggers suitable for popular Myanmar channels and feeds.",
    poweredBy: "Viral Content Idea Generator uses deep learning systems powered by",
    version: "Version",
    settingsTitle: "Strategic Settings",
    themeLabel: "Visual Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    langLabel: "App Language",
    closeBtn: "Close",
    confirmClearHistory: "Are you sure you want to clear your entire content history?",
    clearAllDone: "Cleared",
    allDraftsWithCount: (count: number) => `All Drafts (${count})`,
    favoritesWithCount: (count: number) => `Favorites (${count})`,
    draftsCount: (count: number) => `${count}`,
    starredCount: (count: number) => `${count}`,
  },
  mm: {
    title: "ApexMind",
    tagline: "AI Content မဟာဗျူဟာနှင့် ဗိုင်းရပ်စ်ဆန်ဆန် တိုးတက်မှု ရှာဖွေသူ",
    strategyGuide: "မဟာဗျူဟာ လမ်းညွှန်ချက်",
    engineLive: "အင်ဂျင်လည်ပတ်နေသည်",
    draftsCreated: "မူကြမ်းများ",
    starred: "ကြယ်ပွင့်ပြထားသော",
    campaignBlueprint: "ကမ်ပိန်း အစီအစဉ် ရေးဆွဲရာနေရာ",
    languageSelect: "ဘာသာစကား အလိုအလျောက် သိရှိရန်",
    english: "အင်္ဂလိပ်ဘာသာ",
    burmese: "မြန်မာဘာသာ",
    topicLabel: "ခေါင်းစဉ် သို့မဟုတ် အိုင်ဒီယာအကြမ်း",
    suggestionLabel: "သို့မဟုတ် စွမ်းဆောင်ရည်မြင့် Hook တမ်းပလိတ်တစ်ခု ထည့်သွင်းပါ -",
    secretsHidden: "လျှို့ဝှက်ချက်များ",
    failChecklist: "ကျရှုံးရသည့်အကြောင်း",
    thirtyDayChallenge: "ရက် ၃၀ စိန်ခေါ်မှု",
    masterShortcut: "ဖြတ်လမ်းနည်းများ",
    ultimateRoutine: "အလေ့အကျင့်ကောင်းများ",
    generateButton: "ဗိုင်းရပ်စ် Content စိတ်ကူး ဖန်တီးရန်",
    generatingButton: "မဟာဗျူဟာ ဖန်တီးနေသည်...",
    contentVault: "သင်၏ Content သိုလှောင်ခန်း",
    clearAll: "အားလုံးဖျက်ရန်",
    allDrafts: "မူကြမ်းအားလုံး",
    favorites: "စိတ်ကြိုက်များ",
    noContentTitle: "သိုလှောင်ခန်းထဲတွင် ဘာမျှမရှိသေးပါ",
    noContentText: "သင်ဖန်တီးထားသော ကမ်ပိန်းများကို အော့ဖ်လိုင်းအလွယ်တကူ ပြန်ကြည့်နိုင်ရန် အလိုအလျောက် သိမ်းဆည်းပေးပါမည်။",
    growthEngine: "ဗိုင်းရပ်စ်ပျံ့နှံ့မှု အင်ဂျင် စတင်လည်ပတ်နေသည်",
    growthText: "ဗိုင်းရပ်စ်ဖြစ်စေမည့် လမ်းကြောင်းများကို ပုံဖော်ပြီး ခေါင်းစဉ်နှင့် Hook နှိပ်ချင်စရာ စိတ်ပညာကို အကောင်းဆုံးဖြစ်အောင် လုပ်ဆောင်နေသည်...",
    progressStage: "ကမ်ပိန်း အဆင့်",
    blueprintWorkspace: "တိုက်ရိုက် အစီအစဉ် ရေးဆွဲရာနေရာ",
    creativeSuite: "ဗိုင်းရပ်စ် ဖန်တီးမှု ကိရိယာစု",
    previewTitle: "ပလက်ဖောင်းများတွင် ပြသပေးမည့် ပုံစံ",
    previewSubtitle: "(အပြန်အလှန်တုံ့ပြန်နိုင်သော အစမ်းကြည့်ရှုမှု)",
    optimizedTitle: "အကောင်းဆုံးဖြစ်အောင် ပြင်ဆင်ထားသော ခေါင်းစဉ်",
    hashtags: "Hashtag များ",
    twoSecHook: "၂ စက္ကန့်အတွင်း ဆွဲဆောင်မှု (Hook)",
    strategicSummary: "မဟာဗျူဟာမြောက် အနှစ်ချုပ်",
    copyPacket: "Blueprint တစ်ခုလုံးကို ကူးယူပါ",
    packetCopied: "Blueprint အချက်အလက်များ ကူးယူပြီးပါပြီ!",
    emptyWorkspaceTitle: "သင်၏ ဖန်တီးမှု လုပ်ငန်းခွင် အဆင်သင့်ဖြစ်ပါပြီ",
    emptyWorkspaceText: "ခေါင်းစဉ်၊ အိုင်ဒီယာတစ်ခုခု ထည့်ပါ သို့မဟုတ် ကျွန်ုပ်တို့၏ လူကြိုက်များသော ကြီးထွားမှုပုံသေနည်းများထဲမှ တစ်ခုကို နှိပ်ပြီး မဟာဗျူဟာရှင်၏ ဆွဲဆောင်မှုများနှင့် Tag များကို ဖန်တီးပေးမှုကို ကြည့်ရှုလိုက်ပါ။",
    outputWireframe: "ရလဒ် ပုံကြမ်း",
    ctrTitle: "ခေါင်းစဉ်",
    twoSHook: "၂ စက္ကန့် Hook",
    summary: "အနှစ်ချုပ်",
    strategyGuideTitle: "ဗိုင်းရပ်စ်ပျံ့နှံ့မှုနှင့် တိုးတက်မှုဆိုင်ရာ မဟာဗျူဟာ လမ်းညွှန်ချက်",
    twoSecRuleTitle: "၂ စက္ကန့်အတွင်း ဆွဲဆောင်နိုင်မှု စည်းမျဉ်း",
    twoSecRuleDesc: "ဗီဒီယိုအတိုများ ကြည့်ရှုသူတို့၏ အာရုံစိုက်မှုအချိန်သည် အလွန်တိုတောင်းပါသည်။ ထို့ကြောင့် သင်၏ဆွဲဆောင်မှု (Hook) သည် စိတ်ဝင်စားစရာ မေးခွန်းတစ်ခု၊ အများစုကြုံတွေ့ရတတ်သော ပြဿနာ သို့မဟုတ် အချက်အလက်အထောက်အထား ခိုင်မာစွာဖြင့် ချက်ချင်းအစပျိုးရပါမည်။ မိတ်ဆက်စကားများဖြင့် အချိန်မဖြုန်းပါနှင့်။",
    ctrTitleOptimization: "CTR ခေါင်းစဉ်ကို အကောင်းဆုံးဖြစ်အောင် ပြင်ဆင်ခြင်း",
    ctrTitleDesc: "ဝင်ရောက်ကြည့်ရှုနှုန်း (CTR) မြင့်မားစေရန် စိတ်ဝင်စားမှုကို လှုံ့ဆော်ပေးရပါမည်။ သာမန်အယူအဆများကို 'လျှို့ဝှက်ချက်များ'၊ 'ဖြတ်လမ်း' သို့မဟုတ် 'အမှားများ' ကဲ့သို့သော စကားလုံးဆန်းများဖြင့် တွဲဖက်ပါ။ ဖုန်းမျက်နှာပြင်တွင် စာသားများ မပြတ်တောက်စေရန် ခေါင်းစဉ်ကို စာလုံးရေ ၆၀ အောက်သာ ထားပါ။",
    hashtagDensityTitle: "Hashtag သိပ်သည်းဆနှင့် SEO ကောင်းမွန်ခြင်း",
    hashtagDensityDesc: "ယေဘုယျ Hashtag ၁-၂ ခု (ဥပမာ- #productivity) နှင့် တိကျသော သက်ဆိုင်ရာစကားလုံး ၂-၃ ခု (ဥပမာ- #focusroutine) တို့ကို ရောစပ်သုံးပါ။ Hashtag များလွန်းပါက အယ်လ်ဂိုရီသမ်၏ ညွှန်းဆိုမှုကို ထိခိုက်စေနိုင်သည်။ ကျွန်ုပ်တို့ စက်သည် အကောင်းဆုံးဖြစ်မည့် Hashtag ၄-၅ ခုကို အလိုအလျောက် ရွေးချယ်ပေးပါသည်။",
    langOptimizationTitle: "ဘာသာစကားအလိုက် အကောင်းဆုံးဖြစ်အောင် ပြင်ဆင်ခြင်း",
    langOptimizationDesc: "ကျွန်ုပ်တို့စနစ်သည် ရွေးချယ်ထားသော ဘာသာစကားအလိုက် သင့်လျော်သော အသံအသုံးအနှုန်းကို ညှိယူပေးပါသည်။ အင်္ဂလိပ်စာအတွက် ခေတ်မီစကားလုံးများကို အသုံးပြုပြီး မြန်မာစာအတွက် ဒေသတွင်း ပရိသတ်စိတ်ဝင်စားမည့် စကားလုံးအသုံးအနှုန်းများဖြင့် ပုံဖော်ပေးပါသည်။",
    poweredBy: "ဗိုင်းရပ်စ် Content အိုင်ဒီယာ ဖန်တီးပေးစက်ကို Gemini 3.5 Flash ဖြင့် မောင်းနှင်ထားပါသည်။",
    version: "ဗားရှင်း",
    settingsTitle: "မဟာဗျူဟာ ဆက်တင်များ",
    themeLabel: "မျက်နှာပြင် အပြင်အဆင်",
    lightMode: "လင်းသောနောက်ခံ",
    darkMode: "မှောင်သောနောက်ခံ",
    langLabel: "အက်ပ် ဘာသာစကား",
    closeBtn: "ပိတ်ရန်",
    confirmClearHistory: "သင်ဖန်တီးထားသော Content ရာဇဝင်အားလုံးကို ဖျက်ပစ်ရန် သေချာပါသလား။",
    clearAllDone: "ဖျက်ပြီးပါပြီ",
    allDraftsWithCount: (count: number) => `မူကြမ်းအားလုံး (${count})`,
    favoritesWithCount: (count: number) => `စိတ်ကြိုက်များ (${count})`,
    draftsCount: (count: number) => `${count}`,
    starredCount: (count: number) => `${count}`,
  }
};

const TEMPLATE_SUGGESTIONS = [
  { label: "Secrets Hidden", template: "Secrets about [Topic] they don't want you to know" },
  { label: "Fail Checklist", template: "Why 99% of people fail at [Topic]" },
  { label: "30-Day Challenge", template: "I tried [Topic] for 30 days and this happened..." },
  { label: "Master Shortcut", template: "How to get 10x better at [Topic] in 5 minutes" },
  { label: "Ultimate Routine", template: "My secret daily routine for absolute mastery of [Topic]" },
];

export default function App() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("Auto");
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedIdea, setGeneratedIdea] = useState<GeneratedIdea | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [previewPlatform, setPreviewPlatform] = useState<"tiktok" | "twitter" | "instagram" | "youtube" | "facebook">("tiktok");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistoryOnly, setShowHistoryOnly] = useState(false);

  // Settings states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [uiLang, setUiLang] = useState<"en" | "mm">("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedUiLang = localStorage.getItem("viral_ui_lang");
      if (savedUiLang === "en" || savedUiLang === "mm") {
        setUiLang(savedUiLang);
      }
      const savedTheme = localStorage.getItem("viral_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  }, []);

  // Sync dark class on document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const saveUiLang = (lang: "en" | "mm") => {
    setUiLang(lang);
    try {
      localStorage.setItem("viral_ui_lang", lang);
    } catch (e) {
      console.error(e);
    }
  };

  const saveTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    try {
      localStorage.setItem("viral_theme", newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("viral_content_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("viral_content_history", JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  // Loading phase rotations for a nice conversational status
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase((prev) => (prev < 3 ? prev + 1 : 0));
      }, 1500);
    } else {
      setLoadingPhase(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedIdea(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate viral content idea.");
      }

      setGeneratedIdea(data);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        topic: topic.trim(),
        language,
        timestamp: Date.now(),
        data,
        isFavorite: false,
      };
      saveHistory([newHistoryItem, ...history]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const selectTemplate = (template: string) => {
    if (topic) {
      // Replace or append
      setTopic(template.replace("[Topic]", topic));
    } else {
      setTopic(template.replace("[Topic]", ""));
    }
  };

  const toggleFavorite = (id: string) => {
    const updated = history.map((item) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    saveHistory(updated);
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  const clearHistory = () => {
    if (window.confirm(TRANSLATIONS[uiLang].confirmClearHistory)) {
      saveHistory([]);
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setTopic(item.topic);
    setLanguage(item.language);
    setGeneratedIdea(item.data);
    setShowHistoryOnly(false);
  };

  const activeHistory = showHistoryOnly ? history.filter(h => h.isFavorite) : history;

  const loadingPhasesText = uiLang === "mm" ? [
    "ဗိုင်းရပ်စ်ဖြစ်စေမည့် အချက်များနှင့် ခေတ်ရေစီးကြောင်း စိတ်ပညာကို ဆန်းစစ်နေသည်...",
    "လူကြည့်များမည့် ဆွဲဆောင်မှုရှိသော ခေါင်းစဉ်များကို ရေးဆွဲနေသည်...",
    "ပထမ ၂ စက္ကန့်အတွင်း အကြည့်ဖမ်းစားမည့် Hook များကို ပြင်ဆင်နေသည်...",
    "လူသုံးအများဆုံးနှင့် သက်ဆိုင်ရာ Hashtag များကို ရှာဖွေနေသည်..."
  ] : [
    "Analyzing viral triggers & trend psychology...",
    "Drafting high-CTR Display Headlines...",
    "Refining scroll-stopping 2-second hook loops...",
    "Mapping high-density social media hashtags..."
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      theme === "dark" 
        ? "bg-slate-950 text-slate-100" 
        : "bg-[#fafafc] text-[#1e1e24]"
    }`}>
      {/* Top Banner Navigation */}
      <header id="app-header" className={`sticky top-0 z-50 transition-colors duration-200 backdrop-blur-md border-b ${
        theme === "dark" 
          ? "bg-slate-900/80 border-slate-800 text-white" 
          : "bg-white/80 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl text-white shadow-sm shadow-indigo-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                const element = document.getElementById("strategy-guide");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                theme === "dark" ? "text-slate-300 hover:text-indigo-400" : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{TRANSLATIONS[uiLang].strategyGuide}</span>
            </button>
            <span className={`h-4 w-[1px] ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}></span>
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${
              theme === "dark" ? "bg-slate-800 border-slate-700/80" : "bg-slate-100 border-slate-200/60"
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className={`text-[10px] font-mono font-medium uppercase tracking-wider ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}>{TRANSLATIONS[uiLang].engineLive}</span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-center relative z-40 ${
                theme === "dark" 
                  ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" 
                  : "bg-slate-100 hover:bg-slate-200 border-slate-200/60 text-slate-600"
              }`}
              title={TRANSLATIONS[uiLang].settingsTitle}
            >
              <Settings className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Hub */}
        <div className={`mb-8 p-6 rounded-2xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 shadow-slate-950/40 border border-slate-800"
            : "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-slate-950/10"
        }`}>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{uiLang === "mm" ? "Hook ဖန်တီးမှုနှင့် စာသားရေးသားခြင်း" : "Hook Crafting & Copywriting"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
              {uiLang === "mm" ? "ဖန်သားပြင်ကို ရပ်တန့်သွားစေမည့် Content စိတ်ကူးများကို ချက်ချင်းဖန်တီးပါ" : "Create Scroll-Stopping Content Ideas Instantly"}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {uiLang === "mm" 
                ? "ပုံမှန် ကော်ပီ တမ်းပလိတ်များကို သုံးပါ သို့မဟုတ် သင့်ကိုယ်ပိုင် ခေါင်းစဉ်ကို ရေးပါ။ ကျွန်ုပ်တို့၏ Gemini AI အင်ဂျင်သည် လူကြည့်အများဆုံးဖြစ်စေမည့် ခေါင်းစဉ်များ၊ ဆွဲဆောင်မှုရှိသော အနှစ်ချုပ်များ၊ လျှစ်တပြိုက်အတွင်း အကြည့်ဖမ်းစားမည့် ၂ စက္ကန့် Hook များနှင့် သင်၏ဗိုင်းရပ်စ်ပျံ့နှံ့မှုကို မြှင့်တင်ရန် သက်ဆိုင်ရာ Tag များကို ပုံဖော်ပေးပါမည်။"
                : "Use standard copy templates or write a custom topic. Our Gemini AI engine designs high-converting titles, compelling summaries, irresistible 2-second hooks, and relevant tags to scale your viral reach."}
            </p>
          </div>

          <div className={`flex items-center space-x-3 shrink-0 relative z-10 p-4 rounded-xl border backdrop-blur-sm ${
            theme === "dark" ? "bg-slate-800/40 border-slate-700/50" : "bg-white/5 border-white/10"
          }`}>
            <div className="text-center px-4">
              <div className="text-xl sm:text-2xl font-bold font-display text-indigo-400">{history.length}</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-300">
                {TRANSLATIONS[uiLang].draftsCreated}
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="text-center px-4">
              <div className="text-xl sm:text-2xl font-bold font-display text-amber-400">
                {history.filter(h => h.isFavorite).length}
              </div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-300">
                {TRANSLATIONS[uiLang].starred}
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs & Templates (5 Cols) */}
          <section id="inputs-panel" className="lg:col-span-5 space-y-6">
            <div className={`rounded-2xl border shadow-sm p-6 space-y-6 transition-colors duration-200 ${
              theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
            }`}>
              <div className={`flex items-center justify-between border-b pb-4 ${
                theme === "dark" ? "border-slate-800" : "border-slate-100"
              }`}>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-display font-bold text-base">{TRANSLATIONS[uiLang].campaignBlueprint}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Languages className="w-3.5 h-3.5 text-slate-400" />
                  <label htmlFor="lang-select" className="sr-only">Select Language</label>
                  <select
                    id="lang-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none cursor-pointer border ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-slate-200 focus:ring-1 focus:ring-indigo-500"
                        : "bg-slate-50 border-slate-200 text-slate-700 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  >
                    <option value="Auto">🌐 {TRANSLATIONS[uiLang].languageSelect}</option>
                    <option value="English">🇺🇸 {TRANSLATIONS[uiLang].english}</option>
                    <option value="Burmese">🇲🇲 {TRANSLATIONS[uiLang].burmese}</option>
                  </select>
                </div>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="topic-input" className={`text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}>
                      {TRANSLATIONS[uiLang].topicLabel}
                    </label>
                    <span className="text-xs text-slate-400 font-mono">{topic.length}/150</span>
                  </div>
                  <textarea
                    id="topic-input"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value.slice(0, 150))}
                    placeholder={uiLang === "mm" ? "ဥပမာ - အာရုံစူးစိုက်မှုအတွက် မနက်ခင်း အလေ့အကျင့် ၅ ခု၊ စာမေးပွဲ အောင်မြင်ရန် လျှို့ဝှက်ချက်..." : "e.g. 5 hidden morning routines for extreme focus, why most developers fail at coding interviews..."}
                    rows={3}
                    required
                    className={`w-full text-sm rounded-xl p-3.5 placeholder-slate-400 outline-none transition resize-none leading-relaxed ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:bg-slate-800/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-950"
                        : "bg-slate-50/50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                </div>

                {/* Suggestions Templates */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}>
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{TRANSLATIONS[uiLang].suggestionLabel}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TEMPLATE_SUGGESTIONS.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectTemplate(item.template)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                          theme === "dark"
                            ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                            : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600"
                        }`}
                      >
                        {uiLang === "mm" 
                          ? (item.label === "Secrets Hidden" ? "လျှို့ဝှက်ချက်များ" : item.label === "Fail Checklist" ? "ကျရှုံးရသည့်အကြောင်း" : item.label === "30-Day Challenge" ? "ရက် ၃၀ စိန်ခေါ်မှု" : item.label === "Master Shortcut" ? "ဖြတ်လမ်းနည်းများ" : "အလေ့အကျင့်ကောင်းများ") 
                          : item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !topic.trim()}
                    className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 shadow-sm transition duration-200 select-none cursor-pointer ${
                      loading || !topic.trim()
                        ? theme === "dark" ? "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed" : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-md hover:shadow-indigo-300"
                    }`}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                        <span>{TRANSLATIONS[uiLang].generatingButton}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>{TRANSLATIONS[uiLang].generateButton}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Local History Workspace */}
            <div className={`rounded-2xl border shadow-sm p-6 space-y-4 transition-colors duration-200 ${
              theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${
                theme === "dark" ? "border-slate-800" : "border-slate-100"
              }`}>
                <div className="flex items-center space-x-2">
                  <History className="w-4 h-4 text-slate-500" />
                  <h3 className="font-display font-bold text-base">{TRANSLATIONS[uiLang].contentVault}</h3>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className={`text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                      theme === "dark" ? "text-slate-400 hover:text-red-400" : "text-slate-400 hover:text-red-500"
                    }`}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{TRANSLATIONS[uiLang].clearAll}</span>
                  </button>
                )}
              </div>

              {history.length > 0 ? (
                <div className="space-y-3">
                  <div className={`flex items-center space-x-2 p-1 rounded-lg border ${
                    theme === "dark" ? "bg-slate-850 border-slate-800" : "bg-slate-50 border-slate-200/60"
                  }`}>
                    <button
                      onClick={() => setShowHistoryOnly(false)}
                      className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                        !showHistoryOnly 
                          ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-800 shadow-sm"
                          : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {TRANSLATIONS[uiLang].allDraftsWithCount(history.length)}
                    </button>
                    <button
                      onClick={() => setShowHistoryOnly(true)}
                      className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                        showHistoryOnly 
                          ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-800 shadow-sm"
                          : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {TRANSLATIONS[uiLang].favoritesWithCount(history.filter(h => h.isFavorite).length)}
                    </button>
                  </div>

                  <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1">
                    <AnimatePresence initial={false}>
                      {activeHistory.length > 0 ? (
                        activeHistory.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`p-3 rounded-xl flex items-start justify-between gap-3 group transition cursor-pointer border ${
                              theme === "dark"
                                ? "bg-slate-800/40 hover:bg-slate-800/80 border-slate-800/80 text-white"
                                : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/60 text-slate-800"
                            }`}
                            onClick={() => loadFromHistory(item)}
                          >
                            <div className="space-y-1 min-w-0 flex-1">
                              <p className={`text-xs font-semibold truncate leading-snug transition ${
                                theme === "dark" ? "text-slate-200 group-hover:text-indigo-400" : "text-slate-800 group-hover:text-indigo-600"
                              }`}>
                                {item.topic}
                              </p>
                              <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                                <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                <span>•</span>
                                <span className={`px-1 rounded ${
                                  theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-200/60 text-slate-500"
                                }`}>
                                  {item.language === "Auto" ? "Auto" : item.language}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => toggleFavorite(item.id)}
                                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                  item.isFavorite
                                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                    : theme === "dark"
                                      ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-500 hover:bg-slate-750"
                                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500"
                                }`}
                              >
                                <Star className="w-3.5 h-3.5 fill-current" />
                              </button>
                              <button
                                onClick={() => deleteHistoryItem(item.id)}
                                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                  theme === "dark"
                                    ? "bg-slate-800 border-slate-700 hover:border-red-500/30 text-slate-400 hover:bg-red-950/30 hover:text-red-400"
                                    : "bg-white border-slate-200 hover:border-red-200 text-slate-400 hover:bg-red-50 hover:text-red-500"
                                }`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-400 text-xs">
                          {showHistoryOnly 
                            ? (uiLang === "mm" ? "စိတ်ကြိုက်သိမ်းထားသော Content မရှိသေးပါ။" : "No favorited content yet.") 
                            : (uiLang === "mm" ? "သိမ်းဆည်းထားသော အိုင်ဒီယာ မရှိသေးပါ။" : "No saved concepts yet.")
                          }
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className={`text-center py-10 rounded-xl border border-dashed ${
                  theme === "dark" ? "bg-slate-800/20 border-slate-700" : "bg-slate-50/50 border-slate-200"
                }`}>
                  <History className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-500"}`}>
                    {uiLang === "mm" ? "ရာဇဝင်မရှိသေးပါ" : "No content in vault yet"}
                  </p>
                  <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto mt-0.5">
                    {uiLang === "mm"
                      ? "သင်ဖန်တီးလိုက်သော Content များသည် ဤနေရာတွင် အလိုအလျောက် သိမ်းဆည်းပေးမည် ဖြစ်ပါသည်။"
                      : "Your generated campaigns will save automatically for quick offline retrieval."}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right Column: Interactive Workspace Results (7 Cols) */}
          <section id="outputs-panel" className="lg:col-span-7 space-y-6">
            
            {/* Generating State */}
            {loading && (
              <div className={`rounded-2xl border p-8 min-h-[480px] flex flex-col items-center justify-center text-center space-y-6 shadow-sm transition-colors duration-200 ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
              }`}>
                <div className="relative">
                  <div className={`w-20 h-20 border-4 rounded-full animate-spin ${
                    theme === "dark" ? "border-slate-800 border-t-indigo-500" : "border-indigo-100 border-t-indigo-600"
                  }`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm">
                  <h4 className="font-display font-bold text-lg">{TRANSLATIONS[uiLang].engineRunning}</h4>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    {TRANSLATIONS[uiLang].formattingVectors}
                  </p>
                </div>

                {/* Horizontal Progress Stages */}
                <div className={`w-full max-w-md p-4 rounded-xl space-y-3 border ${
                  theme === "dark" ? "bg-slate-850 border-slate-800" : "bg-slate-50 border-slate-100"
                }`}>
                  <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>{TRANSLATIONS[uiLang].campaignPhase}</span>
                    <span className="text-indigo-500 font-mono">{(loadingPhase + 1) * 25}% {TRANSLATIONS[uiLang].complete}</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                    theme === "dark" ? "bg-slate-800" : "bg-slate-200"
                  }`}>
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-500" 
                      style={{ width: `${(loadingPhase + 1) * 25}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-indigo-500 font-medium animate-pulse font-mono">
                    ➜ {loadingPhasesText[loadingPhase]}
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className={`border rounded-2xl p-6 flex items-start space-x-4 ${
                theme === "dark" ? "bg-red-950/20 border-red-900/50 text-red-200" : "bg-red-50 border-red-200 text-slate-800"
              }`}>
                <div className="p-2 bg-red-100 dark:bg-red-950 rounded-xl text-red-600 dark:text-red-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className={`font-semibold text-sm ${theme === "dark" ? "text-red-400" : "text-red-900"}`}>{TRANSLATIONS[uiLang].generationFailed}</h4>
                  <p className="text-xs text-red-700 leading-relaxed">{error}</p>
                  <p className="text-xs text-red-500 mt-2 font-mono">
                    Please ensure your Gemini API key is active and correctly added to the Secrets Panel.
                  </p>
                </div>
              </div>
            )}

            {/* Output Panel Layout */}
            {!loading && !error && (
              <div className="space-y-6">
                {generatedIdea ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Workspace Header Tabs */}
                    <div className={`rounded-2xl border shadow-sm p-6 space-y-6 transition-colors duration-200 ${
                      theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
                    }`}>
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-3 ${
                        theme === "dark" ? "border-slate-800" : "border-slate-100"
                      }`}>
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border font-mono ${
                            theme === "dark" ? "bg-indigo-950/40 border-indigo-900/50 text-indigo-300" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                          }`}>
                            {TRANSLATIONS[uiLang].blueprintWorkspace}
                          </span>
                          <h4 className="font-display font-bold text-lg mt-1">{TRANSLATIONS[uiLang].creativeSuite}</h4>
                        </div>

                        {/* Platform Mockup Toggle */}
                        <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border shrink-0 self-start sm:self-auto ${
                          theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200/50"
                        }`}>
                          <button
                            onClick={() => setPreviewPlatform("tiktok")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              previewPlatform === "tiktok"
                                ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm"
                                : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Tv className="w-3.5 h-3.5 text-[#FE2C55]" />
                            <span>{TRANSLATIONS[uiLang].tiktokReels}</span>
                          </button>
                          <button
                            onClick={() => setPreviewPlatform("twitter")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              previewPlatform === "twitter"
                                ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm"
                                : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
                            <span>{TRANSLATIONS[uiLang].twitterX}</span>
                          </button>
                          <button
                            onClick={() => setPreviewPlatform("instagram")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              previewPlatform === "instagram"
                                ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm"
                                : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                            <span>{TRANSLATIONS[uiLang].instagram}</span>
                          </button>
                          <button
                            onClick={() => setPreviewPlatform("youtube")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              previewPlatform === "youtube"
                                ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm"
                                : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                            <span>{TRANSLATIONS[uiLang].youtube}</span>
                          </button>
                          <button
                            onClick={() => setPreviewPlatform("facebook")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              previewPlatform === "facebook"
                                ? theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm"
                                : theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                            <span>{TRANSLATIONS[uiLang].facebook}</span>
                          </button>
                        </div>
                      </div>

                      {/* Display Outputs - Bento-style Blocks */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Title Display */}
                        <div className={`p-4 rounded-xl border transition relative group ${
                          theme === "dark" ? "border-slate-800 bg-slate-900/40 hover:bg-slate-900/60" : "border-slate-200 bg-slate-50/40 hover:bg-slate-50"
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                              theme === "dark" ? "text-indigo-400 bg-indigo-950/40" : "text-indigo-600 bg-indigo-50"
                            }`}>
                              {TRANSLATIONS[uiLang].optimizedTitle}
                            </span>
                            <button
                              onClick={() => copyToClipboard(generatedIdea.title, "title")}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-indigo-400 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                              }`}
                              title="Copy Title"
                            >
                              {copiedField === "title" ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className={`text-sm font-display font-bold leading-snug ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}>
                            {generatedIdea.title}
                          </p>
                        </div>

                        {/* Hashtag Display */}
                        <div className={`p-4 rounded-xl border transition relative group ${
                          theme === "dark" ? "border-slate-800 bg-slate-900/40 hover:bg-slate-900/60" : "border-slate-200 bg-slate-50/40 hover:bg-slate-50"
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                              theme === "dark" ? "text-emerald-400 bg-emerald-950/40" : "text-emerald-600 bg-emerald-50"
                            }`}>
                              {TRANSLATIONS[uiLang].hashtags}
                            </span>
                            <button
                              onClick={() => copyToClipboard(generatedIdea.hashtag, "hashtag")}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-indigo-400 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                              }`}
                              title="Copy Hashtags"
                            >
                              {copiedField === "hashtag" ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs font-mono font-medium text-emerald-500 leading-normal tracking-wide">
                            {generatedIdea.hashtag}
                          </p>
                        </div>

                        {/* Hook Display - Span 2 Columns */}
                        <div className={`md:col-span-2 p-4 rounded-xl border transition relative group ${
                          theme === "dark" ? "border-amber-900/40 bg-amber-950/10 hover:bg-amber-950/20" : "border-amber-200 bg-amber-50/10 hover:bg-amber-50/20"
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded flex items-center gap-1 ${
                              theme === "dark" ? "text-amber-400 bg-amber-950/40" : "text-amber-600 bg-amber-50"
                            }`}>
                              <Flame className="w-3 h-3 fill-current animate-pulse text-amber-500" />
                              <span>{TRANSLATIONS[uiLang].twoSecHook}</span>
                            </span>
                            <button
                              onClick={() => copyToClipboard(generatedIdea.hook, "hook")}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                theme === "dark" ? "bg-slate-800 border-amber-900/50 text-amber-400 hover:bg-slate-700" : "bg-white border-amber-200 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                              }`}
                              title="Copy Hook"
                            >
                              {copiedField === "hook" ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className={`text-sm font-semibold border-l-2 border-amber-400 pl-3 leading-relaxed italic ${
                            theme === "dark" ? "text-slate-100" : "text-slate-900"
                          }`}>
                            "{generatedIdea.hook}"
                          </p>
                        </div>

                        {/* Description Display - Span 2 Columns */}
                        <div className={`md:col-span-2 p-4 rounded-xl border transition relative group ${
                          theme === "dark" ? "border-slate-800 bg-slate-900/40 hover:bg-slate-900/60" : "border-slate-200 bg-slate-50/40 hover:bg-slate-50"
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                              theme === "dark" ? "text-indigo-400 bg-indigo-950/40" : "text-indigo-600 bg-indigo-50"
                            }`}>
                              {TRANSLATIONS[uiLang].strategicSummary}
                            </span>
                            <button
                              onClick={() => copyToClipboard(generatedIdea.description, "description")}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-indigo-400 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                              }`}
                              title="Copy Summary"
                            >
                              {copiedField === "description" ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className={`text-xs leading-relaxed ${
                            theme === "dark" ? "text-slate-300" : "text-slate-600"
                          }`}>
                            {generatedIdea.description}
                          </p>
                        </div>

                      </div>

                      {/* Quick copy full packet */}
                      <div className={`pt-2 border-t flex justify-end ${
                        theme === "dark" ? "border-slate-800" : "border-slate-100"
                      }`}>
                        <button
                          onClick={() => {
                            const fullText = `TITLE: ${generatedIdea.title}\n\nHOOK: ${generatedIdea.hook}\n\nDESCRIPTION: ${generatedIdea.description}\n\nHASHTAGS: ${generatedIdea.hashtag}`;
                            copyToClipboard(fullText, "all");
                          }}
                          className={`px-4 py-2 font-medium text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-sm hover:shadow ${
                            theme === "dark" 
                              ? "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700" 
                              : "bg-slate-900 hover:bg-slate-800 text-white"
                          }`}
                        >
                          {copiedField === "all" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{TRANSLATIONS[uiLang].packetCopied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{TRANSLATIONS[uiLang].copyFullPacket}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Interactive Live Mockup Displays */}
                    <div className={`rounded-2xl border shadow-sm p-6 space-y-4 transition-colors duration-200 ${
                      theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
                    }`}>
                      <div className={`flex items-center space-x-2 border-b pb-3 ${
                        theme === "dark" ? "border-slate-800" : "border-slate-100"
                      }`}>
                        <Smartphone className="w-4 h-4 text-slate-500" />
                        <h4 className="font-display font-bold text-sm uppercase tracking-wide">
                          {TRANSLATIONS[uiLang].livePlatformMockup}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">({uiLang === "mm" ? "အပြန်အလှန် စမ်းသပ်ကြည့်နိုင်သော ပုံစံ" : "Interactive Preview"})</span>
                      </div>

                      <div className={`flex justify-center p-4 rounded-xl relative overflow-hidden min-h-[380px] items-center transition-colors ${
                        theme === "dark" ? "bg-slate-950" : "bg-slate-100"
                      }`}>
                        <div className="absolute inset-0 bg-radial-gradient from-slate-200/50 to-slate-100 pointer-events-none opacity-10"></div>

                        {/* TikTok Preview Card */}
                        {previewPlatform === "tiktok" && (
                          <div className="relative w-64 h-[400px] bg-[#0c0d14] rounded-[28px] border-[6px] border-slate-900 shadow-xl overflow-hidden text-white flex flex-col justify-between p-4 font-sans select-none">
                            {/* Smartphone notch */}
                            <div className="absolute top-0 inset-x-0 h-4 flex justify-center z-10">
                              <div className="w-24 h-4 bg-slate-900 rounded-b-xl"></div>
                            </div>

                            {/* Top header tabs */}
                            <div className="flex items-center justify-between text-[10px] font-bold text-white/60 pt-2 z-10 px-2">
                              <span>{uiLang === "mm" ? "ဖော်လိုဝါ" : "Following"}</span>
                              <span className="text-white border-b-2 border-white pb-0.5">{uiLang === "mm" ? "သင့်အတွက်" : "For You"}</span>
                              <Search className="w-3 h-3" />
                            </div>

                            {/* Center Caption text representing the Hook overlay */}
                            <div className="my-auto flex flex-col items-center justify-center text-center px-2 z-10">
                              <div className="bg-black/45 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg max-w-[210px] animate-pulse">
                                <p className="text-xs font-bold text-amber-300 leading-relaxed font-display text-shadow">
                                  {generatedIdea.hook}
                                </p>
                              </div>
                              <span className="text-[8px] text-white/50 bg-black/30 px-2 py-0.5 rounded-full mt-2 inline-block font-mono">
                                🔊 {uiLang === "mm" ? "[Scroll-stopping အသံ]" : "[Scroll-stopper Audio]"}
                              </span>
                            </div>

                            {/* Bottom profile and description panel */}
                            <div className="space-y-1.5 z-10 text-xs text-left">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-[8px] text-white">
                                  VS
                                </div>
                                <span className="font-bold">@viral_strategist</span>
                                <span className="text-[8px] bg-[#FE2C55] px-1 py-0.2 rounded font-mono">LIVE</span>
                              </div>
                              <p className="text-[10px] text-white/90 line-clamp-2 leading-relaxed">
                                {generatedIdea.description}
                              </p>
                              <p className="text-[9px] text-indigo-300 font-mono font-medium truncate">
                                {generatedIdea.hashtag}
                              </p>
                            </div>

                            {/* Right action bar */}
                            <div className="absolute right-2.5 bottom-16 flex flex-col items-center space-y-4 text-white z-10 text-[9px] font-bold">
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition">
                                  ❤️
                                </div>
                                <span>241K</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition">
                                  💬
                                </div>
                                <span>1.8K</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition">
                                  🔖
                                </div>
                                <span>42K</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Twitter Preview Card */}
                        {previewPlatform === "twitter" && (
                          <div className={`w-full max-w-sm border rounded-xl shadow-lg p-4 text-left font-sans text-xs transition-colors duration-200 ${
                            theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
                          }`}>
                            {/* Profile Info */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center font-bold text-[10px] text-white uppercase font-display">
                                  VS
                                </div>
                                <div>
                                  <div className="flex items-center space-x-1 font-bold">
                                    <span className={theme === "dark" ? "text-white" : "text-slate-950"}>Viral Strategist</span>
                                    <span className="text-[#1DA1F2]" title="Verified Creator">🛡️</span>
                                  </div>
                                  <div className="text-[10px] text-slate-500">@viral_growth • 2h</div>
                                </div>
                              </div>
                              <span className="text-slate-400 font-bold hover:text-indigo-600 transition">•••</span>
                            </div>

                            {/* Tweet Content */}
                            <div className="space-y-2 leading-relaxed text-xs">
                              <p className={`font-bold text-sm ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                                {generatedIdea.title}
                              </p>
                              <p className={`border-l-2 border-[#1DA1F2] pl-2 py-0.5 italic ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>
                                "{generatedIdea.hook}"
                              </p>
                              <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>{generatedIdea.description}</p>
                              <p className="text-[#1DA1F2] font-semibold font-mono tracking-wide">
                                {generatedIdea.hashtag}
                              </p>
                            </div>

                            {/* Twitter Interaction Stats */}
                            <div className={`border-t border-b py-2.5 my-3 flex space-x-4 text-[10px] font-mono ${
                              theme === "dark" ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"
                            }`}>
                              <span><strong>42.1K</strong> Views</span>
                              <span><strong>1,248</strong> Retweets</span>
                              <span><strong>6,824</strong> Likes</span>
                            </div>

                            {/* Action icons bar */}
                            <div className="flex items-center justify-between text-slate-400 px-1 py-0.5 text-[11px]">
                              <span className="hover:text-[#1DA1F2] cursor-pointer">💬 248</span>
                              <span className="hover:text-emerald-500 cursor-pointer">🔁 1.2K</span>
                              <span className="hover:text-rose-500 cursor-pointer">❤️ 6.8K</span>
                              <span className="hover:text-[#1DA1F2] cursor-pointer">🔖 421</span>
                              <span className="hover:text-indigo-600 cursor-pointer">📤 Share</span>
                            </div>
                          </div>
                        )}

                        {/* Instagram Carousel Post Mockup */}
                        {previewPlatform === "instagram" && (
                          <div className={`w-64 h-[320px] rounded-2xl border shadow-xl overflow-hidden flex flex-col font-sans select-none text-xs transition-colors duration-200 ${
                            theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
                          }`}>
                            {/* Top header */}
                            <div className={`flex items-center justify-between p-3 border-b text-[10px] ${
                              theme === "dark" ? "border-slate-800" : "border-slate-100"
                            }`}>
                              <div className="flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-[1px]">
                                  <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-[8px] ${
                                    theme === "dark" ? "bg-slate-900" : "bg-white"
                                  }`}>
                                    V
                                  </div>
                                </div>
                                <span className={`font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>viral_strategist</span>
                              </div>
                              <span className="font-bold text-slate-600 cursor-pointer">•••</span>
                            </div>

                            {/* Square Post Display - Gradient Cover */}
                            <div className="flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white flex flex-col justify-between text-left relative">
                              <span className="absolute top-2 right-2 text-[8px] bg-black/30 backdrop-blur px-1.5 py-0.5 rounded-full font-semibold">
                                1 / 2
                              </span>
                              
                              <div className="space-y-1 mt-3">
                                <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-300">
                                  Viral Strategy Alert
                                </p>
                                <h5 className="font-display font-extrabold text-sm tracking-tight leading-snug line-clamp-3">
                                  {generatedIdea.title}
                                </h5>
                              </div>

                              <div className="space-y-1.5 border-t border-white/20 pt-2.5">
                                <p className="text-[10px] font-semibold leading-relaxed line-clamp-3 italic">
                                  "{generatedIdea.hook}"
                                </p>
                                <div className="flex items-center justify-between text-[8px] text-white/80 font-bold">
                                  <span>{uiLang === "mm" ? "ဘယ်သို့ဆွဲပါ ➜" : "SWIPE LEFT ➜"}</span>
                                  <span>{uiLang === "mm" ? "နောက်မှဖတ်ရန်သိမ်းပါ" : "SAVE FOR LATER"}</span>
                                </div>
                              </div>
                            </div>

                            {/* Interaction actions */}
                            <div className={`p-2.5 border-t flex items-center justify-between text-slate-700 ${
                              theme === "dark" ? "border-slate-800 text-slate-300" : "border-slate-100 text-slate-700"
                            }`}>
                              <div className="flex items-center space-x-3">
                                <span className="hover:scale-110 transition cursor-pointer" title="Like">❤️</span>
                                <span className="hover:scale-110 transition cursor-pointer" title="Comment">💬</span>
                                <span className="hover:scale-110 transition cursor-pointer" title="Share">📤</span>
                              </div>
                              <span className="hover:scale-110 transition cursor-pointer" title="Bookmark">🔖</span>
                            </div>
                          </div>
                        )}

                        {/* YouTube Shorts Preview Card */}
                        {previewPlatform === "youtube" && (
                          <div className="relative w-64 h-[400px] bg-[#0c0d14] rounded-[28px] border-[6px] border-slate-900 shadow-xl overflow-hidden text-white flex flex-col justify-between p-4 font-sans select-none">
                            {/* Smartphone notch */}
                            <div className="absolute top-0 inset-x-0 h-4 flex justify-center z-10">
                              <div className="w-24 h-4 bg-slate-900 rounded-b-xl"></div>
                            </div>

                            {/* Top Header */}
                            <div className="flex items-center justify-between text-[10px] font-bold text-white/60 pt-2 z-10 px-2">
                              <span className="text-white border-b-2 border-red-600 pb-0.5">{uiLang === "mm" ? "Shorts ဗီဒီယိုတို" : "Shorts"}</span>
                              <Search className="w-3 h-3 text-white" />
                            </div>

                            {/* Center Caption text representing the Hook overlay */}
                            <div className="my-auto flex flex-col items-center justify-center text-center px-2 z-10">
                              <div className="bg-red-600/25 backdrop-blur-md border border-red-500/20 rounded-xl p-3 shadow-lg max-w-[210px] animate-pulse">
                                <p className="text-xs font-bold text-white leading-relaxed font-display text-shadow">
                                  {generatedIdea.hook}
                                </p>
                              </div>
                              <span className="text-[8px] text-white/50 bg-black/30 px-2 py-0.5 rounded-full mt-2 inline-block font-mono">
                                🔴 {uiLang === "mm" ? "[YouTube ပလေယာ အဆင်သင့်ဖြစ်သည်]" : "[YouTube Player Active]"}
                              </span>
                            </div>

                            {/* Bottom Profile and video description */}
                            <div className="space-y-1.5 z-10 text-xs text-left">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center font-bold text-[8px] text-white">
                                  YT
                                </div>
                                <span className="font-bold">@creator_channel</span>
                                <span className="text-[7px] bg-red-600 text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                                  {uiLang === "mm" ? "ဖော်လိုလုပ်ရန်" : "Subscribe"}
                                </span>
                              </div>
                              <p className="text-[10px] font-bold text-white/95 line-clamp-1">
                                {generatedIdea.title}
                              </p>
                              <p className="text-[10px] text-white/80 line-clamp-2 leading-snug">
                                {generatedIdea.description}
                              </p>
                              <p className="text-[9px] text-red-300 font-mono font-medium truncate">
                                {generatedIdea.hashtag}
                              </p>
                            </div>

                            {/* Right action bar */}
                            <div className="absolute right-2.5 bottom-16 flex flex-col items-center space-y-4 text-white z-10 text-[9px] font-bold">
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition">
                                  👍
                                </div>
                                <span>1.2M</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition">
                                  👎
                                </div>
                                <span>{uiLang === "mm" ? "မကြိုက်ပါ" : "Dislike"}</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition">
                                  💬
                                </div>
                                <span>45K</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Facebook Post Preview Card */}
                        {previewPlatform === "facebook" && (
                          <div className={`w-full max-w-sm border rounded-xl shadow-lg p-4 text-left font-sans text-xs transition-colors duration-200 ${
                            theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
                          }`}>
                            {/* Profile Info */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white font-display">
                                  FB
                                </div>
                                <div>
                                  <div className="flex items-center space-x-1 font-bold">
                                    <span className={theme === "dark" ? "text-white" : "text-slate-900"}>Viral Growth Hacker</span>
                                    <span className="text-[#1877F2]">✓</span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <span>{uiLang === "mm" ? "ခုလေးတင်" : "Just now"}</span>
                                    <span>•</span>
                                    <span>🌎</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-slate-400 font-bold hover:text-indigo-600 transition">•••</span>
                            </div>

                            {/* Content */}
                            <div className="space-y-2 leading-relaxed text-xs">
                              <p className={`font-bold text-sm ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                                {generatedIdea.title}
                              </p>
                              <div className={`p-2.5 rounded-lg border-l-4 italic ${
                                theme === "dark" ? "bg-slate-850 border-blue-500 text-slate-200" : "bg-slate-50 border-blue-600 text-slate-800"
                              }`}>
                                "{generatedIdea.hook}"
                              </div>
                              <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>{generatedIdea.description}</p>
                              <p className="text-[#1877F2] font-semibold font-mono tracking-wide">
                                {generatedIdea.hashtag}
                              </p>
                            </div>

                            {/* Interactions Stats */}
                            <div className={`border-t border-b py-2.5 my-3 flex items-center justify-between text-[10px] font-mono ${
                              theme === "dark" ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"
                            }`}>
                              <div className="flex items-center space-x-1">
                                <span>👍❤️😮 32.5K</span>
                              </div>
                              <div className="space-x-2">
                                <span>4.2K Comments</span>
                                <span>1.8K Shares</span>
                              </div>
                            </div>

                            {/* Action icons bar */}
                            <div className="flex items-center justify-between text-slate-500 px-1 py-0.5 text-[11px] font-bold">
                              <span className="hover:text-[#1877F2] cursor-pointer flex items-center gap-1">👍 {uiLang === "mm" ? "သဘောကျသည်" : "Like"}</span>
                              <span className="hover:text-blue-600 cursor-pointer flex items-center gap-1">💬 {uiLang === "mm" ? "မှတ်ချက်ပေးရန်" : "Comment"}</span>
                              <span className="hover:text-blue-600 cursor-pointer flex items-center gap-1">📤 {uiLang === "mm" ? "မျှဝေရန်" : "Share"}</span>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Empty state placeholder / illustration */
                  <div className={`rounded-2xl border shadow-sm p-8 min-h-[480px] flex flex-col items-center justify-center text-center space-y-6 transition-colors duration-200 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200"
                  }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-slate-400 border ${
                      theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                    }`}>
                      <Sparkles className="w-7 h-7" />
                    </div>

                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-display font-bold text-base">{TRANSLATIONS[uiLang].emptyWorkspaceTitle}</h4>
                      <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        {TRANSLATIONS[uiLang].emptyWorkspaceText}
                      </p>
                    </div>

                    {/* Miniature template structure diagram to illustrate output */}
                    <div className={`w-full max-w-sm border p-4 rounded-xl text-left space-y-2 text-[10px] font-mono select-none ${
                      theme === "dark" ? "bg-slate-850 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200/60 text-slate-400"
                    }`}>
                      <div className={`flex justify-between items-center text-[8px] font-bold uppercase border-b pb-1.5 mb-1 ${
                        theme === "dark" ? "border-slate-800 text-slate-500" : "border-slate-200/60 text-slate-400"
                      }`}>
                        <span>Output Wireframe</span>
                        <span>Pre-flight checks</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        <span className={`flex-1 h-2.5 rounded-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}></span>
                        <span className="text-[8px]">CTR Title</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400/70"></span>
                        <span className={`flex-1 h-2.5 rounded-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}></span>
                        <span className="text-[8px] text-amber-500">2s Hook</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        <span className={`flex-1 h-2.5 rounded-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}></span>
                        <span className="text-[8px]">Summary</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400/70"></span>
                        <span className={`flex-1 h-2.5 rounded-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}></span>
                        <span className="text-[8px] text-emerald-500">Hashtags</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </section>

        </div>

        {/* Strategy Guide & Best Practices */}
        <footer id="strategy-guide" className={`mt-16 border-t pt-10 pb-16 ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <div className={`flex items-center space-x-2 font-display ${
              theme === "dark" ? "text-indigo-400" : "text-indigo-600"
            }`}>
              <Award className="w-5 h-5" />
              <h4 className="font-bold text-base">{TRANSLATIONS[uiLang].strategyGuideTitle}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className={`p-5 rounded-xl border space-y-2 transition-colors duration-200 ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200/80 text-slate-600"
              }`}>
                <h5 className={`font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  {TRANSLATIONS[uiLang].twoSecRuleTitle}
                </h5>
                <p className="leading-relaxed">
                  {TRANSLATIONS[uiLang].twoSecRuleDesc}
                </p>
              </div>

              <div className={`p-5 rounded-xl border space-y-2 transition-colors duration-200 ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200/80 text-slate-600"
              }`}>
                <h5 className={`font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  {TRANSLATIONS[uiLang].ctrTitleOptimization}
                </h5>
                <p className="leading-relaxed">
                  {TRANSLATIONS[uiLang].ctrTitleDesc}
                </p>
              </div>

              <div className={`p-5 rounded-xl border space-y-2 transition-colors duration-200 ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200/80 text-slate-600"
              }`}>
                <h5 className={`font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  {TRANSLATIONS[uiLang].hashtagDensityTitle}
                </h5>
                <p className="leading-relaxed">
                  {TRANSLATIONS[uiLang].hashtagDensityDesc}
                </p>
              </div>

              <div className={`p-5 rounded-xl border space-y-2 transition-colors duration-200 ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200/80 text-slate-600"
              }`}>
                <h5 className={`font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  <Languages className="w-3.5 h-3.5 text-purple-500" />
                  {TRANSLATIONS[uiLang].langOptimizationTitle}
                </h5>
                <p className="leading-relaxed">
                  {TRANSLATIONS[uiLang].langOptimizationDesc}
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between text-xs transition-colors duration-200 gap-2 ${
              theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-500"
            }`}>
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {TRANSLATIONS[uiLang].poweredBy} <strong>Gemini 2.5 Flash</strong>.
                </span>
              </div>
              <span className="font-mono text-[10px] shrink-0">
                {TRANSLATIONS[uiLang].version} 1.2.0
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* Settings Modal with Backdrop Blur */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div id="settings-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl transition-colors duration-200 z-10 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 text-white shadow-indigo-950/20"
                  : "bg-white border-slate-200 text-slate-800 shadow-slate-200"
              }`}
            >
              {/* Header with ApexMind Title */}
              <div className="flex items-center justify-between border-b pb-4 mb-5 border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-lg text-white">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-lg leading-none bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                      ApexMind
                    </h2>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider block mt-0.5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      {TRANSLATIONS[uiLang].settingsTitle}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className={`p-1.5 rounded-lg border transition cursor-pointer ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400 hover:text-slate-100"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Settings Controls */}
              <div className="space-y-6">
                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {TRANSLATIONS[uiLang].themeLabel}
                  </label>
                  <div className={`grid grid-cols-2 gap-2 p-1 rounded-xl border ${
                    theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200/60"
                  }`}>
                    <button
                      onClick={() => saveTheme("light")}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        theme === "light"
                          ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>{TRANSLATIONS[uiLang].lightMode}</span>
                    </button>
                    <button
                      onClick={() => saveTheme("dark")}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        theme === "dark"
                          ? "bg-slate-800 text-indigo-400 shadow-sm border border-slate-700"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>{TRANSLATIONS[uiLang].darkMode}</span>
                    </button>
                  </div>
                </div>

                {/* Language Selector */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {TRANSLATIONS[uiLang].langLabel}
                  </label>
                  <div className={`grid grid-cols-2 gap-2 p-1 rounded-xl border ${
                    theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200/60"
                  }`}>
                    <button
                      onClick={() => saveUiLang("en")}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        uiLang === "en"
                          ? theme === "dark"
                            ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                            : "bg-white text-indigo-600 shadow-sm border border-slate-200/50"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                    >
                      <Globe className="w-4 h-4 text-indigo-500" />
                      <span>{TRANSLATIONS[uiLang].english}</span>
                    </button>
                    <button
                      onClick={() => saveUiLang("mm")}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        uiLang === "mm"
                          ? theme === "dark"
                            ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                            : "bg-white text-indigo-600 shadow-sm border border-slate-200/50"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                    >
                      <Globe className="w-4 h-4 text-emerald-500" />
                      <span>{TRANSLATIONS[uiLang].burmese}</span>
                    </button>
                  </div>
                </div>

                {/* Owner & Project Information Card */}
                <div className={`mt-6 pt-4 border-t flex flex-col items-center justify-center text-center space-y-2 ${
                  theme === "dark" ? "border-slate-800" : "border-slate-100"
                }`}>
                  <div className={`px-4 py-1.5 rounded-xl text-xs font-medium font-mono border tracking-wider transition-colors duration-200 ${
                    theme === "dark" 
                      ? "bg-slate-950/50 border-indigo-900/40 text-indigo-300" 
                      : "bg-indigo-50/50 border-indigo-100 text-indigo-600"
                  }`}>
                    Owner = Hein Khant
                  </div>
                  <div className={`text-[11px] font-mono leading-normal text-slate-500 dark:text-slate-400 space-y-0.5`}>
                    <div>Jun/24/26</div>
                    <div>Version 1.0</div>
                    <div>Make in Gemini Ai</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
