import { Link, useNavigate } from "react-router-dom";
import { Bus, Building2, GraduationCap, Store, Phone, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickLinks = [
    {
      to: "/buses",
      icon: Bus,
      title: "خطوط الحافلات",
      titleFr: "Lignes de bus",
      description: "Trouvez votre ligne",
      bgColor: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
    {
      to: "/services",
      icon: Building2,
      title: "الخدمات الإدارية",
      titleFr: "Services administratifs",
      description: "Mairies, hôpitaux...",
      bgColor: "from-secondary/10 to-secondary/5",
      iconColor: "text-secondary",
    },
    {
      to: "/education",
      icon: GraduationCap,
      title: "التعليم والتكوين",
      titleFr: "Éducation & Formation",
      description: "Écoles, instituts...",
      bgColor: "from-accent/10 to-accent/5",
      iconColor: "text-accent-foreground",
    },
    {
      to: "/places",
      icon: Store,
      title: "الأسواق والمحلات",
      titleFr: "Commerces & Marchés",
      description: "Magasins, pharmacies...",
      bgColor: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
    {
      to: "/numbers",
      icon: Phone,
      title: "الأرقام المهمة",
      titleFr: "Numéros importants",
      description: "Urgences, contacts",
      bgColor: "from-destructive/10 to-destructive/5",
      iconColor: "text-destructive",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* ---------------------------------- */}
      {/* HERO SECTION WITH IMAGE BACKGROUND */}
      {/* ---------------------------------- */}

      <section
        className="relative overflow-hidden py-28 px-4 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/guelmim-city.jpg')",
        }}
      >
        {/* Layer to darken the image for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Guelmim Dalel
            </h1>

            <p
              className="text-2xl md:text-3xl text-white/90 mb-2 font-semibold animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100"
              dir="rtl"
            >
              دليلك داخل مدينة كلميم
            </p>

            <p className="text-lg text-white/80 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Votre guide complet pour la ville de Guelmim
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300"
            >
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Rechercher un lieu, un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/95 border-white/20 h-12 text-base"
                />

                <Button type="submit" size="lg" className="h-12 px-6 bg-secondary hover:bg-secondary/90">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className="group animate-in fade-in slide-in-from-bottom-8 duration-500"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <Card className="h-full border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${link.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <link.icon className={`h-8 w-8 ${link.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {link.titleFr}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2" dir="rtl">
                    {link.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Add Business CTA */}
          <Link
            to="/submit-business"
            className="group animate-in fade-in slide-in-from-bottom-8 duration-500"
            style={{ animationDelay: "900ms" }}
          >
            <Card className="h-full border-2 border-dashed border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary bg-primary/5">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Ajoutez votre activité</h3>
                <p className="text-sm text-muted-foreground" dir="rtl">
                  أضف نشاطك التجاري إلى الدليل
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="bg-muted/50 border-y border-border py-12 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">À propos de Guelmim Dalel</h2>

          <p className="text-muted-foreground mb-4" dir="rtl">
            دليل كلميم هو دليل مستقل يهدف إلى مساعدة سكان وزوار مدينة كلميم على إيجاد
            معلومات عن النقل والخدمات الإدارية والتعليمية والتجارية
          </p>

          <p className="text-muted-foreground">
            Guelmim Dalel est un guide indépendant pour aider les résidents et visiteurs de
            Guelmim à trouver des informations sur les transports, services administratifs,
            éducation et commerces.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
