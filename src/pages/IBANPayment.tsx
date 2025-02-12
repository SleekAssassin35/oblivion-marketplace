
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyIcon, ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const IBANPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopyalandı!",
      description: "IBAN bilgisi panoya kopyalandı.",
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white p-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <Button 
        variant="ghost" 
        className="mb-6 text-white hover:text-oblivion-pink"
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
          <Card className="glass-morphism text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
                IBAN Ödeme Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">IBAN:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-oblivion-pink hover:text-oblivion-purple"
                      onClick={() => handleCopy("YOUR_IBAN_NUMBER")}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm font-mono">YOUR_IBAN_NUMBER</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
                Ödeme Sonrası Adımlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Ödemenizi yukarıdaki IBAN'a gönderin</li>
                <li>Dekont/EFT makbuzunu kaydedin</li>
                <li>Ödeme onayı için Telegram kanalımıza katılın</li>
                <li>Ödeme dekontunu destek ekibimize iletin</li>
                <li>Ürün erişimi 24 saat içinde sağlanacaktır</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default IBANPayment;
