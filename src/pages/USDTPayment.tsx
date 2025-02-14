
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyIcon, ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const USDTPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopyalandı!",
      description: "Cüzdan adresi panoya kopyalandı.",
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white p-6"
      style={{
        backgroundImage: "url('/Ekran görüntüsü 2025-02-13 003044.png')",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }}
    >
      <Button 
        variant="ghost" 
        className="mb-6 text-oblivion-pink hover:text-oblivion-purple"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Geri Dön
      </Button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="bg-black/90 border-oblivion-pink/10 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
                USDT Ödeme Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="p-4 rounded-lg bg-black border border-oblivion-pink/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">USDT Wallet Address:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-oblivion-pink hover:text-oblivion-purple"
                      onClick={() => handleCopy("YOUR_USDT_WALLET_ADDRESS")}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm font-mono">YOUR_USDT_WALLET_ADDRESS</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-oblivion-pink/10 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
                Ödeme Sonrası Adımlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Ödemenizi yukarıdaki USDT adresine gönderin</li>
                <li>İşlem hash'ini kaydedin</li>
                <li>Ödeme onayı için Telegram kanalımıza katılın</li>
                <li>Hash bilgisini destek ekibimize iletin</li>
                <li>Ürün erişimi 24 saat içinde sağlanacaktır</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-oblivion-pink/10 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
                İletişim Kanalları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-black border border-oblivion-pink/10">
                  <h3 className="font-semibold mb-2 text-oblivion-pink">Telegram</h3>
                  <p className="text-sm text-gray-300">@your_telegram</p>
                </div>
                <div className="p-4 rounded-lg bg-black border border-oblivion-pink/10">
                  <h3 className="font-semibold mb-2 text-oblivion-pink">Discord</h3>
                  <p className="text-sm text-gray-300">your_discord</p>
                </div>
                <div className="p-4 rounded-lg bg-black border border-oblivion-pink/10">
                  <h3 className="font-semibold mb-2 text-oblivion-pink">Skype</h3>
                  <p className="text-sm text-gray-300">your_skype</p>
                </div>
                <div className="p-4 rounded-lg bg-black border border-oblivion-pink/10">
                  <h3 className="font-semibold mb-2 text-oblivion-pink">YouTube</h3>
                  <p className="text-sm text-gray-300">your_youtube</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default USDTPayment;
