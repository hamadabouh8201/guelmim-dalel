import { useState, useEffect } from "react";
import { Building2, MapPin, Clock, ExternalLink, Bus, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { baseServices, type ServiceItem } from "../data/services";

const STORAGE_KEY = "guelmim_custom_services";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [customServices, setCustomServices] = useState<ServiceItem[]>([]);

  // نحمّلو الخدمات المضافة من طرفك من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ServiceItem[];
        setCustomServices(parsed);
      }
    } catch (err) {
      console.error("Erreur localStorage services", err);
    }
  }, []);

  const allServices: ServiceItem[] = [...baseServices, ...customServices];

  const categories = Array.from(new Set(allServices.map((s) => s.category))).filter(
    Boolean
  );

  const filteredServices = allServices.filter((service) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      service.name.toLowerCase().includes(q) ||
      service.category?.toLowerCase().includes(q) ||
      service.address?.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Services administratifs
        </h1>
        <p className="text-lg text-muted-foreground" dir="rtl">
          الخدمات الإدارية في كلميم
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
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

      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || categoryFilter !== "all"
                ? "Aucun service trouvé"
                : "Aucun service disponible"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                    <Building2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2">{service.name}</CardTitle>
                    {service.category && (
                      <Badge variant="outline">{service.category}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {service.address && (
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{service.address}</p>
                  </div>
                )}

                {service.opening_hours && (
                  <div className="flex gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {service.opening_hours}
                    </p>
                  </div>
                )}

                {service.near_bus_lines && (
                  <div className="flex gap-2">
                    <Bus className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Lignes proches
                      </p>
                      <p className="text-sm text-foreground">
                        {service.near_bus_lines}
                      </p>
                    </div>
                  </div>
                )}

                {service.notes && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">{service.notes}</p>
                  </div>
                )}

                {service.google_maps_url && (
                  <a
                    href={service.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-primary mt-2"
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

export default Services;
