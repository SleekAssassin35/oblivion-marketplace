import { useState } from "react";
import CryptoTicker from "@/components/CryptoTicker";
import { Button } from "@/components/ui/button";
import {
  DiscordLogoIcon,
  TwitterLogoIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [paymentMethod, setPaymentMethod] = useState<"usdt" | "tron">("usdt");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (paymentMethod === "usdt") {
      navigate("/payment/usdt");
    } else {
      navigate("/payment/iban");
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
            Güçlü Kripto Alım-Satım İndikatörü
          </span>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink via-oblivion-purple to-oblivion-lightPink">
            Oblivion Algo
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Kripto piyasalarında profesyonel al-sat sinyalleri ile kazançlarınızı maksimize edin. 
            Yapay zeka destekli analizler ve gerçek zamanlı uyarılarla piyasanın bir adım önünde olun.
          </p>
          <Button className="bg-gradient-to-r from-oblivion-pink to-oblivion-purple hover:opacity-90 transition-all duration-300 transform hover:scale-105">
            Hemen Başla
          </Button>
        </motion.div>
      </section>

      {/* Features Section - Scrollable */}
      <section className="container mx-auto py-20">
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
          <div className="grid md:grid-cols-3 gap-8 p-4">
            {[
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
                title: "7/244 Destek",
                description: "Profesyonel destek ekibi ile kesintisiz yardım",
                icon: "🔧"
              }
            ].map((feature, i) => (
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

      {/* Payment Section */}
      <section className="container mx-auto py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto glass-morphism p-8 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Hemen Başlayın</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant="outline"
              className={`${
                paymentMethod === "usdt"
                  ? "bg-oblivion-purple text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setPaymentMethod("usdt")}
            >
              USDT
            </Button>
            <Button
              variant="outline"
              className={`${
                paymentMethod === "tron"
                  ? "bg-oblivion-purple text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setPaymentMethod("tron")}
            >
              IBAN
            </Button>
          </div>
          <div className="text-center text-gray-400 mb-6">
            {paymentMethod === "usdt" ? (
              <p>USDT ile Ödeme</p>
            ) : (
              <p>IBAN ile Ödeme</p>
            )}
          </div>
          <Button 
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-oblivion-pink to-oblivion-purple hover:opacity-90 transition-opacity"
          >
            Ödemeye Geç
          </Button>
        </motion.div>
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
        </div>
      </footer>
    </div>
  );
};

export default Index;
