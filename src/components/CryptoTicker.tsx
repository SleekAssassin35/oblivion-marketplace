
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const fallbackData = {
  bitcoin: { usd: 52000 },
  ethereum: { usd: 3200 },
  tron: { usd: 0.13 }
};

const CryptoTicker = () => {
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tron&vs_currencies=usd",
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('API response was not ok');
        }
        
        return response.json();
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
        toast({
          title: "API Error",
          description: "Using fallback data due to API limitations. Please try again later.",
          variant: "destructive",
        });
        return fallbackData;
      }
    },
    refetchInterval: 30000,
    staleTime: 10000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    initialData: fallbackData,
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
