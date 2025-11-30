import { useState } from "react";
import { Store, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const businessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  email: z
    .string()
    .trim()
    .email("Email invalide")
    .max(255),
  phone: z.string().trim().optional(),
  businessName: z
    .string()
    .trim()
    .min(2, "Le nom de l'activité doit contenir au moins 2 caractères")
    .max(100),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000),
});

// مفتاح التخزين فـ localStorage
const STORAGE_KEY = "guelmim_contact_messages";

const SubmitBusiness = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ التحقق من المعطيات بـ Zod
      const validated = businessSchema.parse(formData);

      const messageWithPrefix = `[AJOUT ACTIVITÉ]\nActivité: ${validated.businessName}\n\n${validated.message}`;

      // ✅ جلب الرسائل القديمة من localStorage
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];

      const newEntry = {
        id: Date.now(),
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        business_name: validated.businessName,
        message: messageWithPrefix,
        created_at: new Date().toISOString(),
        status: "new",
      };

      const updated = [...existing, newEntry];

      // ✅ حفظ فـ localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      toast({
        title: "Demande enregistrée",
        description:
          "Merci ! Votre demande a été enregistrée sur cet appareil. (Version sans serveur)",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        message: "",
      });
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
          description: "Impossible d'enregistrer la demande",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Ajoutez votre activité
          </h1>
          <p className="text-lg text-muted-foreground" dir="rtl">
            أضف نشاطك التجاري إلى دليل كلميم
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulaire de demande</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour ajouter votre commerce, service ou
              établissement au guide de Guelmim.
              <br />
              <span className="font-medium">
                (حالياً يتم حفظ الطلبات محلياً في هذا الجهاز فقط)
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Votre nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nom et prénom"
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Votre email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="votre@email.com"
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone / WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+212 6XX XXX XXX"
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">
                  Nom de votre activité *
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="Ex: Pharmacie Al Amal, Restaurant Le Palais..."
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Description de votre activité *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Type d'activité, adresse, horaires, services proposés..."
                  rows={6}
                  required
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.message.length}/1000 caractères
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="font-medium mb-1">
                  Informations utiles à inclure :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Type d'activité (commerce, service, restaurant...)</li>
                  <li>Adresse complète</li>
                  <li>Horaires d'ouverture</li>
                  <li>Services ou produits proposés</li>
                  <li>Lignes de bus à proximité (si connues)</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2"
                size="lg"
              >
                <Send className="h-4 w-4" />
                {loading ? "Envoi en cours..." : "Envoyer la demande"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitBusiness;
