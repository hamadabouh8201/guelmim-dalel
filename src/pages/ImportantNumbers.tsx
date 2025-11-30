import { useState, useEffect } from "react";
import { Phone, Search, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { importantNumbers, type ImportantNumber } from "../data/numbers";

const STORAGE_KEY = "guelmim_custom_numbers";

const ImportantNumbersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [customNumbers, setCustomNumbers] = useState<ImportantNumber[]>([]);

  // نحمّلو الأرقام المضافة من طرفك من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ImportantNumber[];
        setCustomNumbers(parsed);
      }
    } catch (err) {
      console.error("Erreur localStorage numéros", err);
    }
  }, []);

  const allNumbers: ImportantNumber[] = [...importantNumbers, ...customNumbers];

  const categories = Array.from(
    new Set(allNumbers.map((n) => n.category))
  ).filter(Boolean);

  const filteredNumbers = allNumbers.filter((n: ImportantNumber) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      n.title.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      n.phone.includes(searchQuery);

    const matchesCategory =
      categoryFilter === "all" || n.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Numéros Importants</h1>
        <p className="text-lg text-muted-foreground" dir="rtl">
          الأرقام المهمة والجهات الأساسية في كلميم
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un numéro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category Select */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {filteredNumbers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun numéro trouvé</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNumbers.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1">
                      {item.title}
                    </CardTitle>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Phone */}
                <div className="flex gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm font-medium">{item.phone}</p>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-muted-foreground bg-muted/40 p-2 rounded">
                    {item.description}
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

export default ImportantNumbersPage;
