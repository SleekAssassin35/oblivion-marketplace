
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface CryptoData {
  symbol: string;
  price: number;
  volume_24h: number;
  market_cap: number;
  timestamp: string;
}

const Metrics = () => {
  const navigate = useNavigate();
  const [timeRange] = useState("24h");

  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ["cryptoMetrics", timeRange],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tron,binancecoin&vs_currencies=usd&include_24hr_vol=true&include_market_cap=true"
      );
      const data = await response.json();
      
      return Object.entries(data).map(([key, value]: [string, any]) => ({
        symbol: key.toUpperCase(),
        price: value.usd,
        volume_24h: value.usd_24h_vol,
        market_cap: value.usd_market_cap,
        timestamp: new Date().toISOString(),
      }));
    },
    refetchInterval: 30000, // Her 30 saniyede bir güncelle
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="mb-8 text-white hover:text-oblivion-pink"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
          Crypto Metrics
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {cryptoData?.map((crypto: CryptoData) => (
                <motion.div
                  key={crypto.symbol}
                  className="glass-morphism p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-oblivion-pink">
                    {crypto.symbol}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      Price:{" "}
                      <span className="text-white">
                        ${crypto.price.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      24h Volume:{" "}
                      <span className="text-white">
                        ${crypto.volume_24h?.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Market Cap:{" "}
                      <span className="text-white">
                        ${crypto.market_cap?.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-morphism p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-oblivion-pink">
                Price Chart
              </h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cryptoData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="symbol" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid #666",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#FF69B4"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Metrics;
