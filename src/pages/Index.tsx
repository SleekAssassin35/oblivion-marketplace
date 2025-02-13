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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [language, setLanguage] = useState<"tr" | "en" | "es">("tr");
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLang = localStorage.getItem("language");
    if (selectedLang) {
      setLanguage(selectedLang as "tr" | "en" | "es");
      setShowLanguageModal(false);
    }
  }, []);

  const handleLanguageSelect = (lang: "tr" | "en" | "es") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setShowLanguageModal(false);
  };

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
      ],
      reviews: [
        {
          name: "Ahmet Y.",
          comment: "Bu indikatör sayesinde trading stratejimi tamamen değiştirdim. Çok daha karlı işlemler yapıyorum.",
          rating: 5,
          date: "2024-02-15"
        },
        {
          name: "Mehmet K.",
          comment: "Profesyonel destek ekibi ve doğru sinyaller ile kazançlarım arttı.",
          rating: 5,
          date: "2024-02-10"
        },
        {
          name: "Ayşe B.",
          comment: "Kullanımı çok kolay ve sinyaller oldukça doğru. Kesinlikle tavsiye ederim.",
          rating: 5,
          date: "2024-02-05"
        }
      ],
      faq: [
        {
          question: "İndikatör nasıl çalışır?",
          answer: "Yapay zeka algoritmaları kullanarak piyasa verilerini analiz eder ve alım-satım sinyalleri üretir."
        },
        {
          question: "Hangi borsalarda kullanabilirim?",
          answer: "Binance, Bybit ve diğer major kripto borsalarında kullanabilirsiniz."
        },
        {
          question: "Teknik destek alabilir miyim?",
          answer: "Evet, 7/24 teknik destek ekibimiz size yardımcı olmak için hazır."
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
      ],
      reviews: [
        {
          name: "John D.",
          comment: "This indicator completely changed my trading strategy. I'm making much more profitable trades.",
          rating: 5,
          date: "2024-02-15"
        },
        {
          name: "Mike R.",
          comment: "Professional support team and accurate signals have increased my profits.",
          rating: 5,
          date: "2024-02-10"
        },
        {
          name: "Sarah L.",
          comment: "Very easy to use and signals are quite accurate. Highly recommended.",
          rating: 5,
          date: "2024-02-05"
        }
      ],
      faq: [
        {
          question: "How does the indicator work?",
          answer: "It analyzes market data using AI algorithms and generates buy-sell signals."
        },
        {
          question: "Which exchanges can I use it with?",
          answer: "You can use it with Binance, Bybit, and other major crypto exchanges."
        },
        {
          question: "Can I get technical support?",
          answer: "Yes, our 24/7 technical support team is ready to help you."
        }
      ]
    },
    es: {
      title: "Potente Indicador de Trading de Criptomonedas",
      header: "Oblivion Algo",
      description: "Maximiza tus ganancias en los mercados de criptomonedas con señales profesionales de compra-venta. Mantente adelante del mercado con análisis impulsado por IA y alertas en tiempo real.",
      buyButton: "Comprar Ahora",
      watchLive: "Ver Trading en Vivo",
      features: [
        {
          title: "Análisis de IA",
          description: "Análisis de mercado y detección de tendencias con algoritmos avanzados de IA",
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
      ],
      reviews: [
        {
          name: "Carlos M.",
          comment: "Este indicador cambió completamente mi estrategia de trading. Estoy haciendo operaciones mucho más rentables.",
          rating: 5,
          date: "2024-02-15"
        },
        {
          name: "Ana R.",
          comment: "Equipo de soporte profesional y señales precisas han aumentado mis ganancias.",
          rating: 5,
          date: "2024-02-10"
        },
        {
          name: "Luis P.",
          comment: "Muy fácil de usar y las señales son bastante precisas. Altamente recomendado.",
          rating: 5,
          date: "2024-02-05"
        }
      ],
      faq: [
        {
          question: "¿Cómo funciona el indicador?",
          answer: "Analiza datos del mercado usando algoritmos de IA y genera señales de compra-venta."
        },
        {
          question: "¿En qué exchanges puedo usarlo?",
          answer: "Puedes usarlo en Binance, Bybit y otros exchanges importantes de criptomonedas."
        },
        {
          question: "¿Puedo obtener soporte técnico?",
          answer: "Sí, nuestro equipo de soporte técnico 24/7 está listo para ayudarte."
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
      <Dialog open={showLanguageModal} onOpenChange={setShowLanguageModal}>
        <DialogContent className="bg-black/90 border-oblivion-purple">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-white mb-4">Select Language / Idioma / Dil Seçimi</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => handleLanguageSelect("en")}
              className="bg-oblivion-purple hover:bg-oblivion-purple/80"
            >
              English
            </Button>
            <Button
              onClick={() => handleLanguageSelect("es")}
              className="bg-oblivion-purple hover:bg-oblivion-purple/80"
            >
              Español
            </Button>
            <Button
              onClick={() => handleLanguageSelect("tr")}
              className="bg-oblivion-purple hover:bg-oblivion-purple/80"
            >
              Türkçe
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
              onClick={() => window.open("https://www.youtube.com/watch?v=aAvT_4XArs8&t=2s", "_blank")}
              className="bg-gradient-to-r from-oblivion-purple to-oblivion-lightPink hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              {translations[language].watchLive}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
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

      {/* Reviews Section */}
      <section className="container mx-auto py-20">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
          User Reviews
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {translations[language].reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-morphism p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-oblivion-pink">{review.name}</h3>
                  <div className="text-yellow-400">{"★".repeat(review.rating)}</div>
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-20">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
          FAQ
        </h2>
        <div className="max-w-3xl mx-auto">
          {translations[language].faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-morphism p-6 rounded-xl mb-4"
            >
              <h3 className="text-xl font-semibold mb-2 text-oblivion-pink">{item.question}</h3>
              <p className="text-gray-300">{item.answer}</p>
            </motion.div>
          ))}
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
