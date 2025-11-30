import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(1000),
});

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = contactSchema.parse(formData);

      const { error } = await supabase.from("contact_messages").insert([{
        name: validated.name,
        email: validated.email,
        message: validated.message,
      }]);

      if (error) throw error;

      toast({
        title: "Message envoyé",
        description: "Merci pour votre message. Nous vous répondrons bientôt.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            À propos de Guelmim Dalel
          </h1>
          <p className="text-lg text-muted-foreground" dir="rtl">
            معلومات عن دليل كلميم
          </p>
        </div>

        {/* About Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Notre mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div dir="rtl" className="text-right space-y-3">
              <p className="text-base leading-relaxed">
                دليل كلميم هو مشروع مستقل يهدف إلى تسهيل حياة سكان وزوار مدينة كلميم من خلال توفير معلومات دقيقة ومحدثة عن:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>خطوط الحافلات ومواعيدها</li>
                <li>الخدمات الإدارية والصحية</li>
                <li>المؤسسات التعليمية ومراكز التكوين</li>
                <li>الأسواق والمحلات التجارية</li>
                <li>الأرقام المهمة للطوارئ والخدمات</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <p className="text-base leading-relaxed">
                Guelmim Dalel est un projet indépendant qui vise à faciliter la vie des résidents et visiteurs de Guelmim en fournissant des informations précises et à jour sur les transports, services administratifs, établissements d'éducation, commerces et numéros importants.
              </p>
              <p className="text-base leading-relaxed mt-3">
                Notre objectif est de créer une ressource complète et accessible pour tous, facilitant la navigation dans la ville et l'accès aux services essentiels.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Nous contacter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Votre message..."
                  rows={5}
                  required
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.message.length}/1000 caractères
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2">
                <Send className="h-4 w-4" />
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
