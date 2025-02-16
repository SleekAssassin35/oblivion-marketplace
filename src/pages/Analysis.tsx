
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  imageUrl: string | null;
  coinType: string;
}

const Analysis = () => {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newAnalysis, setNewAnalysis] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCoinType, setSelectedCoinType] = useState<string>("");
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
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

  useEffect(() => {
    fetchAnalyses();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      setIsAdmin(profile?.is_admin || false);
    }
  };

  const fetchAnalyses = async () => {
    const { data, error } = await supabase
      .from('crypto_analyses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analyses",
        variant: "destructive",
      });
      return;
    }

    const formattedAnalyses = data.map(analysis => ({
      id: analysis.id,
      date: new Date(analysis.created_at).toISOString().split('T')[0],
      content: analysis.content,
      imageUrl: analysis.image_url,
      coinType: analysis.coin_type,
    }));

    setAnalyses(formattedAnalyses);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmitAnalysis = async () => {
    if (!newAnalysis.trim() || !selectedCoinType) {
      toast({
        title: "Error",
        description: "Analysis content and coin type cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to submit an analysis",
        variant: "destructive",
      });
      return;
    }

    let imageUrl = null;
    if (selectedImage) {
      const fileExt = selectedImage.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('analysis-images')
        .upload(filePath, selectedImage);

      if (uploadError) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('analysis-images')
          .getPublicUrl(filePath);
        imageUrl = publicUrl;
      }
    }

    const { error } = await supabase
      .from('crypto_analyses')
      .insert({
        content: newAnalysis,
        coin_type: selectedCoinType,
        image_url: imageUrl,
        author_id: session.user.id,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit analysis",
        variant: "destructive",
      });
      return;
    }

    setNewAnalysis("");
    setSelectedImage(null);
    setSelectedCoinType("");
    fetchAnalyses();

    toast({
      title: "Success",
      description: "Analysis added successfully",
    });
  };

  const handleDeleteAnalysis = async (id: string) => {
    const { error } = await supabase
      .from('crypto_analyses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete analysis",
        variant: "destructive",
      });
      return;
    }

    fetchAnalyses();
    toast({
      title: "Success",
      description: "Analysis deleted successfully",
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
            <Select value={selectedCoinType} onValueChange={setSelectedCoinType}>
              <SelectTrigger>
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total">Total</SelectItem>
                <SelectItem value="total1">Total 1</SelectItem>
                <SelectItem value="total2">Total 2</SelectItem>
                <SelectItem value="total3">Total 3</SelectItem>
                <SelectItem value="others">Others</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="BNB">BNB</SelectItem>
                <SelectItem value="BGB">BGB</SelectItem>
                <SelectItem value="SUI">SUI</SelectItem>
              </SelectContent>
            </Select>
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
              <div>
                <h3 className="text-lg font-medium text-oblivion-pink">
                  Analysis for {analysis.date}
                </h3>
                <p className="text-sm text-gray-500">Metric: {analysis.coinType}</p>
              </div>
              {isAdmin && (
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteAnalysis(analysis.id)}
                >
                  Delete
                </Button>
              )}
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
