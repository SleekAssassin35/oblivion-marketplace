
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (profile?.is_admin) {
        navigate("/analysis");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      toast({
        title: "Hata",
        description: "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.",
        variant: "destructive",
      });
      return;
    }

    if (!session?.user) {
      toast({
        title: "Hata",
        description: "Kullanıcı bulunamadı.",
        variant: "destructive",
      });
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (profileError || !profile) {
      toast({
        title: "Hata",
        description: "Profil bilgileri alınamadı.",
        variant: "destructive",
      });
      return;
    }

    if (!profile.is_admin) {
      await supabase.auth.signOut();
      toast({
        title: "Erişim Reddedildi",
        description: "Bu alana sadece yöneticiler erişebilir.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Başarılı",
      description: "Giriş başarılı, yönlendiriliyorsunuz...",
    });
    
    navigate("/analysis");
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="glass-morphism p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-oblivion-purple text-center">
          Yönetici Girişi
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
