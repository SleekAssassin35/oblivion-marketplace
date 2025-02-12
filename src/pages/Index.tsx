
import { useState } from "react";
import CryptoTicker from "@/components/CryptoTicker";
import { Button } from "@/components/ui/button";
import {
  DiscordLogoIcon,
  TwitterLogoIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const Index = () => {
  const [paymentMethod, setPaymentMethod] = useState<"usdt" | "tron">("usdt");

  return (
    <div className="min-h-screen bg-gradient-to-br from-oblivion-black via-oblivion-purple/20 to-oblivion-black text-white">
      <CryptoTicker />
      
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1 bg-oblivion-purple/20 text-oblivion-pink rounded-full text-sm mb-4 inline-block">
            Güçlü Kripto Alım-Satım İndikatörü
          </span>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
            Oblivion Algo
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Kripto piyasalarında profesyonel al-sat sinyalleri ile kazançlarınızı maksimize edin
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-oblivion-black/40 backdrop-blur-sm p-6 rounded-xl border border-oblivion-purple/20 hover:border-oblivion-pink/40 transition-all duration-300"
            >
              <div className="w-full h-48 bg-gradient-to-br from-oblivion-purple/20 to-oblivion-pink/20 rounded-lg mb-4">
                {/* Buraya indikatör görselleri eklenecek */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Özellik {i}</h3>
              <p className="text-gray-400">
                İndikatörün önemli özelliklerini açıklayan metin buraya gelecek.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Payment Section */}
      <section className="container mx-auto py-20">
        <div className="max-w-md mx-auto bg-oblivion-black/40 backdrop-blur-sm p-8 rounded-xl border border-oblivion-purple/20">
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
              TRON
            </Button>
          </div>
          <div className="text-center text-gray-400 mb-6">
            {paymentMethod === "usdt" ? (
              <p>USDT Ödeme Adresi</p>
            ) : (
              <p>TRON Ödeme Adresi</p>
            )}
          </div>
          <Button className="w-full bg-gradient-to-r from-oblivion-pink to-oblivion-purple hover:opacity-90 transition-opacity">
            Satın Al
          </Button>
        </div>
      </section>

      {/* Social Links */}
      <footer className="container mx-auto py-10 text-center">
        <div className="flex justify-center space-x-6">
          <a
            href="#discord"
            className="text-gray-400 hover:text-oblivion-pink transition-colors"
          >
            <DiscordLogoIcon className="w-6 h-6" />
          </a>
          <a
            href="#twitter"
            className="text-gray-400 hover:text-oblivion-purple transition-colors"
          >
            <TwitterLogoIcon className="w-6 h-6" />
          </a>
          <a
            href="#telegram"
            className="text-gray-400 hover:text-oblivion-lightPink transition-colors"
          >
            <ChatBubbleIcon className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
