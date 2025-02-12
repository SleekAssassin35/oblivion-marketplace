
import { useQuery } from "@tanstack/react-query";

const CryptoTicker = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tron&vs_currencies=usd"
      );
      return response.json();
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-oblivion-black/80 text-white py-2 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-8 animate-pulse">
            <div className="h-6 w-32 bg-gray-600 rounded"></div>
            <div className="h-6 w-32 bg-gray-600 rounded"></div>
            <div className="h-6 w-32 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-oblivion-black/80 text-white py-2 overflow-hidden backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-8">
          {data && (
            <>
              <div className="flex items-center space-x-2">
                <span className="font-medium">BTC:</span>
                <span className="text-oblivion-pink">
                  ${data.bitcoin?.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">ETH:</span>
                <span className="text-oblivion-purple">
                  ${data.ethereum?.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">TRX:</span>
                <span className="text-oblivion-lightPink">
                  ${data.tron?.usd.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
