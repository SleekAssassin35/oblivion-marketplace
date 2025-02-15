
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CryptoData {
  total: number;
  total1: number;
  total2: number;
  total3: number;
  others: number;
  coins: {
    [key: string]: number;
  };
}

interface Analysis {
  id: string;
  date: string;
  content: string;
  imageUrl: string;
}

const Analysis = () => {
  const { toast } = useToast();
  const [isAdmin] = useState(true); // This should be replaced with actual auth
  const [newAnalysis, setNewAnalysis] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    total: 100000,
    total1: 75000,
    total2: 50000,
    total3: 25000,
    others: 10000,
    coins: {
      BTC: 52000,
      ETH: 3200,
      SOL: 110,
      BNB: 380,
      BGB: 12,
      SUI: 1.5,
    },
  });
  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmitAnalysis = () => {
    if (!newAnalysis.trim()) {
      toast({
        title: "Error",
        description: "Analysis content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newEntry: Analysis = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      content: newAnalysis,
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : "",
    };

    setAnalyses([newEntry, ...analyses]);
    setNewAnalysis("");
    setSelectedImage(null);

    toast({
      title: "Success",
      description: "Analysis added successfully",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-oblivion-purple">Crypto Analysis Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="glass-morphism p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-oblivion-pink">Totals Overview</h2>
          <div className="space-y-2">
            <p>Total: ${cryptoData.total.toLocaleString()}</p>
            <p>Total 1: ${cryptoData.total1.toLocaleString()}</p>
            <p>Total 2: ${cryptoData.total2.toLocaleString()}</p>
            <p>Total 3: ${cryptoData.total3.toLocaleString()}</p>
            <p>Others: ${cryptoData.others.toLocaleString()}</p>
          </div>
        </div>

        <div className="glass-morphism p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-oblivion-purple">Coin Prices</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(cryptoData.coins).map(([coin, price]) => (
                <TableRow key={coin}>
                  <TableCell>{coin}</TableCell>
                  <TableCell>${price.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {isAdmin && (
        <div className="glass-morphism p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-oblivion-lightPink">Add New Analysis</h2>
          <div className="space-y-4">
            <Textarea
              value={newAnalysis}
              onChange={(e) => setNewAnalysis(e.target.value)}
              placeholder="Enter your analysis here..."
              className="min-h-[150px]"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <Button onClick={handleSubmitAnalysis} className="w-full">
              Submit Analysis
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-oblivion-purple">Daily Analyses</h2>
        {analyses.map((analysis) => (
          <div key={analysis.id} className="glass-morphism p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-oblivion-pink">
                Analysis for {analysis.date}
              </h3>
            </div>
            <p className="mb-4 whitespace-pre-wrap">{analysis.content}</p>
            {analysis.imageUrl && (
              <img
                src={analysis.imageUrl}
                alt="Analysis visualization"
                className="max-w-full h-auto rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
