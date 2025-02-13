import { useState, useEffect } from "react";
import CryptoTicker from "@/components/CryptoTicker";
import { Button } from "@/components/ui/button";
import {
  DiscordLogoIcon,
  TwitterLogoIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { MessageCircle, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLang = localStorage.getItem("language");
    if (!selectedLang) {
      const userChoice = window.confirm("Choose language:\nTürkçe için 'OK'\nFor English 'Cancel'");
      const lang = userChoice ? "tr" : "en";
      localStorage.setItem("language", lang);
      setLanguage(lang);
    } else {
      setLanguage(selectedLang as "tr" | "en");
    }
  }, []);

  const translations = {
    tr: {
      title: "Güçlü Kripto Alım-Satım İndikatörü",
      header: "Oblivion Algo",
      description: "Kripto piyasalarında profesyonel al-sat sinyalleri ile kazançlarınızı maksimize edin. Yapay zeka destekli analizler ve gerçek zamanlı uyarılarla piyasanın bir adım önünde olun.",
      buyButton: "Satın Al",
      watchLive: "Canlı Al Satı İzle",
      features: [
        {
          title: "Yapay Zeka Analizi",
          description: "Gelişmiş yapay zeka algoritmaları ile piyasa analizi ve trend tespiti",
          icon: "🤖"
        },
        {
          title: "Gerçek Zamanlı Sinyaller",
          description: "Anlık fiyat hareketlerine göre otomatik alım-satım sinyalleri",
          icon: "⚡"
        },
        {
          title: "Risk Yönetimi",
          description: "Akıllı stop-loss ve take-profit önerileri ile risk kontrolü",
          icon: "🛡️"
        },
        {
          title: "Portföy Takibi",
          description: "Tüm kripto varlıklarınızı tek noktadan takip edin",
          icon: "📊"
        },
        {
          title: "Teknik Analiz",
          description: "Otomatik teknik analiz ve gösterge hesaplamaları",
          icon: "📈"
        },
        {
          title: "7/24 Destek",
          description: "Profesyonel destek ekibi ile kesintisiz yardım",
          icon: "🔧"
        }
      ]
    },
    en: {
      title: "Powerful Crypto Trading Indicator",
      header: "Oblivion Algo",
      description: "Maximize your profits in crypto markets with professional buy-sell signals. Stay ahead of the market with AI-powered analysis and real-time alerts.",
      buyButton: "Buy Now",
      watchLive: "Watch Live Trading",
      features: [
        {
          title: "AI Analysis",
          description: "Market analysis and trend detection with advanced AI algorithms",
          icon: "🤖"
        },
        {
          title: "Real-time Signals",
          description: "Automatic buy-sell signals based on instant price movements",
          icon: "⚡"
        },
        {
          title: "Risk Management",
          description: "Smart stop-loss and take-profit suggestions for risk control",
          icon: "🛡️"
        },
        {
          title: "Portfolio Tracking",
          description: "Track all your crypto assets from a single point",
          icon: "📊"
        },
        {
          title: "Technical Analysis",
          description: "Automatic technical analysis and indicator calculations",
          icon: "📈"
        },
        {
          title: "24/7 Support",
          description: "Uninterrupted help with professional support team",
          icon: "🔧"
        }
      ]
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          onClick={() => {
            const newLang = language === "tr" ? "en" : "tr";
            setLanguage(newLang);
            localStorage.setItem("language", newLang);
          }}
          className="bg-oblivion-purple/20 hover:bg-oblivion-purple/40 text-white"
        >
          {language === "tr" ? "English" : "Türkçe"}
        </Button>
      </div>

      <CryptoTicker />
      
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-morphism p-8 rounded-2xl"
        >
          <span className="px-4 py-1 bg-oblivion-purple/20 text-oblivion-pink rounded-full text-sm mb-4 inline-block">
            {translations[language].title}
          </span>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink via-oblivion-purple to-oblivion-lightPink">
            {translations[language].header}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {translations[language].description}
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate("/payment/usdt")}
              className="bg-gradient-to-r from-oblivion-pink to-oblivion-purple hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              {translations[language].buyButton}
            </Button>
            <Button 
              onClick={() => window.open("https://www.youtube.com/watch?v=_-em-MKfx70&ab_channel=YorumlarlaT%C3%BCrkiye", "_blank")}
              className="bg-gradient-to-r from-oblivion-purple to-oblivion-lightPink hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              {translations[language].watchLive}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="container mx-auto py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="aspect-video w-full max-w-4xl mx-auto glass-morphism p-4 rounded-xl"
        >
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/live/aAvT_4XArs8"
            title="Oblivion Algo Trading"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </section>

      {/* Features Section - Scrollable */}
      <section className="container mx-auto py-20">
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
          <div className="grid md:grid-cols-3 gap-8 p-4">
            {translations[language].features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-morphism p-6 rounded-xl hover:border-oblivion-pink/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <footer className="container mx-auto py-10 text-center">
        <div className="flex justify-center space-x-6">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#discord"
            className="text-gray-400 hover:text-oblivion-pink transition-colors"
          >
            <DiscordLogoIcon className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#twitter"
            className="text-gray-400 hover:text-oblivion-purple transition-colors"
          >
            <TwitterLogoIcon className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#telegram"
            className="text-gray-400 hover:text-oblivion-lightPink transition-colors"
          >
            <ChatBubbleIcon className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#support"
            className="text-gray-400 hover:text-oblivion-purple transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://www.youtube.com/live/aAvT_4XArs8"
            className="text-gray-400 hover:text-oblivion-pink transition-colors"
          >
            <Youtube className="w-6 h-6" />
          </motion.a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
