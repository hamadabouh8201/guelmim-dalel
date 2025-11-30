import { useState, useEffect } from "react";
import {
  Store,
  MapPin,
  Clock,
  ExternalLink,
  Search,
  Phone,
} from "lucide-react";

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

import { commerces } from "../data/commerce";
import type { CommerceItem } from "../data/commerce";

const STORAGE_KEY = "guelmim_custom_commerces";

const Places = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [customCommerces, setCustomCommerces] = useState<CommerceItem[]>([]);

  // نحمّلو المحلات المضافة من طرفك من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CommerceItem[];
        setCustomCommerces(parsed);
      }
    } catch (err) {
      console.error("Erreur localStorage commerces", err);
    }
  }, []);

  const allCommerces: CommerceItem[] = [...commerces, ...customCommerces];

  const categories = Array.from(
    new Set(allCommerces.map((c) => c.category))
  ).filter(Boolean);

  const filteredCommerces = allCommerces.filter((item: CommerceItem) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Commerces & Marchés
        </h1>
        <p className="text-lg text-muted-foreground" dir="rtl">
          المحلات التجارية والأسواق في كلميم
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un commerce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category */}
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
      {filteredCommerces.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || categoryFilter !== "all"
                ? "Aucun commerce trouvé"
                : "Aucun commerce disponible"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommerces.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Store className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {item.name}
                    </CardTitle>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Address */}
                <div className="flex gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {item.address}
                  </p>
                </div>

                {/* Phone */}
                {item.phone && (
                  <div className="flex gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {item.phone}
                    </p>
                  </div>
                )}

                {/* Schedule */}
                {item.schedule && (
                  <div className="flex gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {item.schedule}
                    </p>
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* Maps */}
                {item.google_maps_url && (
                  <a
                    href={item.google_maps_url}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-primary mt-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Voir sur Maps
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
