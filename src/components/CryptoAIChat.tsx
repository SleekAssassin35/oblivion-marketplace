
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CryptoAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Sen kripto para ve trading konusunda uzman bir asistansın. Sorulara kısa ve öz cevaplar ver."
            },
            ...messages,
            userMessage
          ]
        })
      });

      const data = await response.json();
      const aiResponse: Message = { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-black/90 border-oblivion-pink/10 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-oblivion-pink to-oblivion-purple">
          Kripto AI Asistan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] mb-4 p-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-oblivion-purple/20 ml-auto max-w-[80%]'
                  : 'bg-black/40 mr-auto max-w-[80%]'
              }`}
            >
              {message.content}
            </motion.div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Kripto hakkında bir soru sorun..."
            className="flex-1 bg-black/40 border-oblivion-pink/10 text-white"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-oblivion-pink to-oblivion-purple hover:opacity-90"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CryptoAIChat;
