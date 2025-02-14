
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
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";

interface CryptoData {
  symbol: string;
  price: number;
  volume_24h: number;
  market_cap: number;
  timestamp: string;
}

interface LiquidationData {
  timestamp: string;
  amount: number;
  type: "long" | "short";
}

interface OrderBookData {
  price: number;
  quantity: number;
  type: "buy" | "sell";
}

const Metrics = () => {
  const navigate = useNavigate();
  const [timeRange] = useState("24h");

  const { data: cryptoData, isLoading: priceLoading } = useQuery({
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
    refetchInterval: 30000,
  });

  const { data: totalMarketData } = useQuery({
    queryKey: ["totalMarket"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/global"
      );
      const data = await response.json();
      return {
        total1: data.data.total_market_cap.usd,
        total2: data.data.total_volume.usd,
        total3: data.data.market_cap_percentage.btc,
        others: 100 - data.data.market_cap_percentage.btc - data.data.market_cap_percentage.eth
      };
    },
    refetchInterval: 30000,
  });

  const { data: fearGreedIndexHistory } = useQuery({
    queryKey: ["fearGreedIndexHistory"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.alternative.me/fng/?limit=30"
      );
      const data = await response.json();
      return data.data.map((item: any) => ({
        value: parseInt(item.value),
        timestamp: new Date(item.timestamp * 1000).toLocaleDateString()
      })).reverse();
    },
    refetchInterval: 300000,
  });

  const { data: liquidations } = useQuery({
    queryKey: ["liquidations"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coinglass.com/api/futures/liquidation/detail?symbol=BTC"
      );
      const data = await response.json();
      return data.data.slice(0, 10).map((item: any) => ({
        timestamp: new Date(item.timestamp).toLocaleTimeString(),
        amount: item.amount,
        type: item.type
      }));
    },
    refetchInterval: 60000,
  });

  const { data: orderBook } = useQuery({
    queryKey: ["orderBook"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=100"
      );
      const data = await response.json();
      
      const filterLargeOrders = (orders: [string, string][]) =>
        orders
          .map(([price, qty]: [string, string]) => ({
            price: parseFloat(price),
            quantity: parseFloat(qty),
          }))
          .filter(order => order.quantity >= 10);

      return {
        bids: filterLargeOrders(data.bids).map(order => ({ ...order, type: "buy" as const })),
        asks: filterLargeOrders(data.asks).map(order => ({ ...order, type: "sell" as const })),
      };
    },
    refetchInterval: 5000,
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

        {priceLoading ? (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Fear & Greed Index with Graph */}
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-oblivion-pink">
                  Fear & Greed Index
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fearGreedIndexHistory}>
                      <defs>
                        <linearGradient id="fearGreedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#FF69B4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="timestamp" stroke="#888" />
                      <YAxis stroke="#888" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid #666",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#FF69B4"
                        fillOpacity={1}
                        fill="url(#fearGreedGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Recent Liquidations */}
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-oblivion-pink">
                  Recent Liquidations
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={liquidations}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="timestamp" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid #666",
                        }}
                      />
                      <Bar dataKey="amount" fill="#FF69B4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Market Totals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-oblivion-pink">TOTAL1</h3>
                <p className="text-2xl font-bold">${totalMarketData?.total1?.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Total Market Cap</p>
              </motion.div>

              <motion.div
                className="glass-morphism p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-oblivion-pink">TOTAL2</h3>
                <p className="text-2xl font-bold">${totalMarketData?.total2?.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Total Volume</p>
              </motion.div>

              <motion.div
                className="glass-morphism p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-oblivion-pink">TOTAL3</h3>
                <p className="text-2xl font-bold">{totalMarketData?.total3?.toFixed(2)}%</p>
                <p className="text-sm text-gray-400">BTC Dominance</p>
              </motion.div>

              <motion.div
                className="glass-morphism p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-oblivion-pink">OTHERS</h3>
                <p className="text-2xl font-bold">{totalMarketData?.others?.toFixed(2)}%</p>
                <p className="text-sm text-gray-400">Other Coins</p>
              </motion.div>
            </div>

            {/* Order Book */}
            <div className="glass-morphism p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4 text-oblivion-pink">
                BTC/USDT Order Book (>10 BTC)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-500 mb-2">Buy Orders</h4>
                  <div className="space-y-1">
                    {orderBook?.bids.map((order: OrderBookData, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-green-400">${order.price.toLocaleString()}</span>
                        <span className="text-gray-400">{order.quantity.toFixed(4)} BTC</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-red-500 mb-2">Sell Orders</h4>
                  <div className="space-y-1">
                    {orderBook?.asks.map((order: OrderBookData, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-red-400">${order.price.toLocaleString()}</span>
                        <span className="text-gray-400">{order.quantity.toFixed(4)} BTC</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Metrics;
