import { Link } from "react-router-dom";
import { Bus, Building2, GraduationCap, Store, Phone, Info, PlusCircle, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Header = () => {
  const navItems = [
    { to: "/buses", icon: Bus, label: "خطوط الحافلات", labelFr: "Bus" },
    { to: "/services", icon: Building2, label: "الخدمات", labelFr: "Services" },
    { to: "/education", icon: GraduationCap, label: "التعليم", labelFr: "Éducation" },
    { to: "/places", icon: Store, label: "الأسواق", labelFr: "Commerces" },
    { to: "/numbers", icon: Phone, label: "الأرقام", labelFr: "Numéros" },
    { to: "/about", icon: Info, label: "معلومات", labelFr: "À propos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* ------------------------------ */}
          {/* LOGO + TITLES */}
          {/* ------------------------------ */}

          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">

            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo-guelmim.png"
                alt="Logo Guelmim"
                className="h-10 w-10 object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col leading-tight">

              {/* العنوان بالعربية — كبير وبولد */}
              <span
                className="text-xl md:text-2xl font-extrabold text-foreground"
                dir="rtl"
              >
                دليل كلميم
              </span>

              {/* العنوان بالفرنسية/الإنجليزية — صغير */}
              <span className="text-xs md:text-sm text-muted-foreground">
                Guelmim Dalel
              </span>
            </div>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button variant="ghost" className="gap-2">
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.labelFr}</span>
                </Button>
              </Link>
            ))}
            <Link to="/submit-business">
              <Button className="ml-2 gap-2">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden lg:inline">Ajouter</span>
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 text-lg hover:text-primary transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <Link
                  to="/submit-business"
                  className="flex items-center gap-3 text-lg text-primary hover:text-primary-light transition-colors mt-4 pt-4 border-t border-border"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="font-medium">أضف نشاطك</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
};

export default Header;
