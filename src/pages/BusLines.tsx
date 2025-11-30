import { useState, useEffect } from "react";
import { Bus, MapPin, Clock, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { busLines } from "../data/busLines";
import type { BusLine } from "../data/busLines";

const STORAGE_KEY = "guelmim_custom_bus_lines";

const BusLines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customLines, setCustomLines] = useState<BusLine[]>([]);

  // نحمّلو الخطوط الإضافية من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BusLine[];
        setCustomLines(parsed);
      }
    } catch (err) {
      console.error("Erreur de lecture localStorage", err);
    }
  }, []);

  // نجمعو الخطوط الثابتة + الإضافية
  const allBusLines: BusLine[] = [...busLines, ...customLines];

  const filteredBusLines = allBusLines.filter((line: BusLine) =>
    line.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.neighborhoods?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Lignes de bus
        </h1>
        <p className="text-lg text-muted-foreground" dir="rtl">
          خطوط الحافلات في كلميم
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une ligne..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filteredBusLines.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? "Aucune ligne trouvée" : "Aucune ligne de bus disponible"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBusLines.map((line: BusLine) => (
            <Card key={line.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Bus className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{line.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {line.code}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {line.description && (
                  <p className="text-sm text-muted-foreground">
                    {line.description}
                  </p>
                )}

                {line.neighborhoods && (
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Quartiers desservis</p>
                      <p className="text-sm text-muted-foreground">
                        {line.neighborhoods}
                      </p>
                    </div>
                  </div>
                )}

                {line.main_stops && (
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Principaux arrêts</p>
                      <p className="text-sm text-muted-foreground">
                        {line.main_stops}
                      </p>
                    </div>
                  </div>
                )}

                {(line.schedule_morning ||
                  line.schedule_afternoon ||
                  line.schedule_evening) && (
                  <div className="border-t pt-4">
                    <div className="flex gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm font-medium">Horaires</p>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground ml-6">
                      {line.schedule_morning && (
                        <p>Matin: {line.schedule_morning}</p>
                      )}
                      {line.schedule_afternoon && (
                        <p>Après-midi: {line.schedule_afternoon}</p>
                      )}
                      {line.schedule_evening && (
                        <p>Soir: {line.schedule_evening}</p>
                      )}
                    </div>
                  </div>
                )}

                {line.notes && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">
                      {line.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusLines;
