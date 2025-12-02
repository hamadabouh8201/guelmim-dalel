import { useEffect, useState } from "react";
import { Landmark, MapPin, Phone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Authority {
  id: string;
  name: string;      // الاسم بالعربية
  name_fr: string;   // الاسم بالفرنسية
  type: string;      // النوع: ولاية، باشوية، قيادة...
  address: string;
  phone?: string;
}

// داتا افتراضية باش ما يبقاش السكشن خاوي
const defaultAuthorities: Authority[] = [
  {
    id: "wilaya-guelmim",
    name: "ولاية جهة كلميم واد نون",
    name_fr: "Wilaya de la Région Guelmim-Oued Noun",
    type: "ولاية",
    address: "شارع الحسن الثاني، كلميم",
    phone: "0528 XX XX XX",
  },
  {
    id: "pachalik-guelmim",
    name: "باشوية كلميم",
    name_fr: "Pachalik de Guelmim",
    type: "باشوية",
    address: "قرب ساحة بئرانزران، كلميم",
    phone: "0528 XX XX XX",
  },
  {
    id: "caidat-tighmert",
    name: "قيادة تيغمرت",
    name_fr: "Caïdat Tighmert",
    type: "قيادة",
    address: "مركز تيغمرت، إقليم كلميم",
    phone: "0528 XX XX XX",
  },
];

const AuthoritiesPage = () => {
  const [authorities, setAuthorities] = useState<Authority[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("guelmim_authorities");
      if (stored) {
        setAuthorities(JSON.parse(stored));
      } else {
        setAuthorities(defaultAuthorities);
      }
    } catch (e) {
      console.error("Erreur chargement autorités", e);
      setAuthorities(defaultAuthorities);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* العنوان */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Autorités territoriales
        </h1>
        <p className="text-muted-foreground mb-1">
          Wilaya, pachalik, caïdats...
        </p>
        <p className="text-muted-foreground" dir="rtl">
          الولاية، الباشوية، القيادات، والمراكز الإدارية بجهة كلميم واد نون
        </p>
      </div>

      {authorities.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p dir="rtl">
            لا توجد سلطات ترابية مسجلة حالياً. يمكنك إضافتها لاحقاً من لوحة
            الإدارة.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authorities.map((a) => (
            <Card key={a.id} className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Landmark className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg" dir="rtl">
                    {a.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {a.name_fr}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-medium" dir="rtl">
                  النوع: {a.type}
                </p>
                <p className="flex items-start gap-2" dir="rtl">
                  <MapPin className="h-4 w-4 mt-[2px]" />
                  <span>{a.address}</span>
                </p>
                {a.phone && (
                  <p className="flex items-center gap-2" dir="rtl">
                    <Phone className="h-4 w-4" />
                    <span>{a.phone}</span>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthoritiesPage;
