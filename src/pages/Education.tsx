import { useState, useEffect } from "react";
import {
  GraduationCap,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Search,
  Bus,
} from "lucide-react";

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

import { baseEducation, type EducationPlace } from "../data/education";

const STORAGE_KEY = "guelmim_custom_education";

const Education = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [customPlaces, setCustomPlaces] = useState<EducationPlace[]>([]);

  // نحمّلو المؤسسات المضافة من طرفك من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as EducationPlace[];
        setCustomPlaces(parsed);
      }
    } catch (err) {
      console.error("Erreur localStorage éducation", err);
    }
  }, []);

  const allPlaces: EducationPlace[] = [...baseEducation, ...customPlaces];

  const categories = Array.from(
    new Set(allPlaces.map((p) => p.category))
  ).filter(Boolean);

  const filteredPlaces = allPlaces.filter((place) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      place.name.toLowerCase().includes(q) ||
      place.category.toLowerCase().includes(q) ||
      place.address.toLowerCase().includes(q) ||
      (place.levels ?? "").toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" || place.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Éducation & Formation
        </h1>
        <p className="text-lg text-muted-foreground" dir="rtl">
          المؤسسات التعليمية ومراكز التكوين في كلميم
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un établissement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Type d'établissement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous types</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {filteredPlaces.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || categoryFilter !== "all"
                ? "Aucun établissement trouvé"
                : "Aucun établissement disponible"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2">
                      {place.name}
                    </CardTitle>
                    <Badge variant="outline">{place.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Adresse */}
                <div className="flex gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {place.address}
                  </p>
                </div>

                {/* Niveaux / filières */}
                {place.levels && (
                  <p className="text-sm text-muted-foreground">
                    {place.levels}
                  </p>
                )}

                {/* Horaires */}
                {place.opening_hours && (
                  <div className="flex gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {place.opening_hours}
                    </p>
                  </div>
                )}

                {/* Téléphone */}
                {place.phone && (
                  <div className="flex gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{place.phone}</p>
                  </div>
                )}

                {/* Bus proches */}
                {place.near_bus_lines && (
                  <div className="flex gap-2">
                    <Bus className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Lignes proches: {place.near_bus_lines}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {place.notes && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">
                      {place.notes}
                    </p>
                  </div>
                )}

                {/* Lien Maps */}
                {place.google_maps_url && (
                  <a
                    href={place.google_maps_url}
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

export default Education;
