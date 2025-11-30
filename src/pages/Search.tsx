import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, Building2, GraduationCap, Store, Phone, Search } from "lucide-react";

interface BusLine {
  id?: string | number;
  name?: string;
  code?: string;
  neighborhoods?: string;
  main_stops?: string;
}

interface Service {
  id?: string | number;
  name?: string;
  category?: string;
  address?: string;
}

interface Education {
  id?: string | number;
  name?: string;
  level?: string;
  address?: string;
}

interface Place {
  id?: string | number;
  name?: string;
  category?: string;
  address?: string;
}

interface ImportantNumber {
  id?: string | number;
  name?: string;
  category?: string;
  phone?: string;
}

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [numbers, setNumbers] = useState<ImportantNumber[]>([]);

  // تحميل البيانات من localStorage (أو تبقى فارغة إذا ما كايناش)
  useEffect(() => {
    try {
      const busData = localStorage.getItem("guelmim_bus_lines");
      if (busData) setBusLines(JSON.parse(busData));

      const servicesData = localStorage.getItem("guelmim_services");
      if (servicesData) setServices(JSON.parse(servicesData));

      const eduData = localStorage.getItem("guelmim_education");
      if (eduData) setEducations(JSON.parse(eduData));

      const placesData = localStorage.getItem("guelmim_places");
      if (placesData) setPlaces(JSON.parse(placesData));

      const numbersData = localStorage.getItem("guelmim_numbers");
      if (numbersData) setNumbers(JSON.parse(numbersData));
    } catch (error) {
      console.error("Erreur chargement données recherche", error);
    }
  }, []);

  // كل مرة query تتبدل، نحدّث الـ URL باش يبقى منسّق
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [query, navigate, location.search]);

  const normalizedQuery = query.trim().toLowerCase();

  const hasQuery = normalizedQuery.length > 0;

  const busResults = useMemo(
    () =>
      !hasQuery
        ? []
        : busLines.filter((line) => {
            const text = [
              line.name,
              line.code,
              line.neighborhoods,
              line.main_stops,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return text.includes(normalizedQuery);
          }),
    [busLines, hasQuery, normalizedQuery]
  );

  const serviceResults = useMemo(
    () =>
      !hasQuery
        ? []
        : services.filter((s) => {
            const text = [s.name, s.category, s.address]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return text.includes(normalizedQuery);
          }),
    [services, hasQuery, normalizedQuery]
  );

  const educationResults = useMemo(
    () =>
      !hasQuery
        ? []
        : educations.filter((e) => {
            const text = [e.name, e.level, e.address]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return text.includes(normalizedQuery);
          }),
    [educations, hasQuery, normalizedQuery]
  );

  const placeResults = useMemo(
    () =>
      !hasQuery
        ? []
        : places.filter((p) => {
            const text = [p.name, p.category, p.address]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return text.includes(normalizedQuery);
          }),
    [places, hasQuery, normalizedQuery]
  );

  const numbersResults = useMemo(
    () =>
      !hasQuery
        ? []
        : numbers.filter((n) => {
            const text = [n.name, n.category, n.phone]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return text.includes(normalizedQuery);
          }),
    [numbers, hasQuery, normalizedQuery]
  );

  const totalResults =
    busResults.length +
    serviceResults.length +
    educationResults.length +
    placeResults.length +
    numbersResults.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ما كندير والو غير كيحبس الفورم من الريلود
  };

  return (
    <div className="container mx-auto px-4 py-8">

      {/* عنوان محرك البحث */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          محرك البحث في دليل كلميم
        </h1>
        <p className="text-muted-foreground" dir="rtl">
          بحث في خطوط الحافلات، الخدمات الإدارية، التعليم، المحلات والأرقام المهمة
        </p>
      </div>

      {/* خانة البحث */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mb-8"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="اكتب اسم حي، إدارة، مؤسسة، محل، أو رقم..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 text-base"
          />
          <Button type="submit" className="h-12 px-4">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>

      {/* حالة: لا توجد كلمة بحث */}
      {!hasQuery && (
        <div className="text-center text-muted-foreground">
          <p dir="rtl">
            اكتب كلمة في خانة البحث أعلاه لعرض النتائج من كل أقسام الدليل.
          </p>
        </div>
      )}

      {/* حالة: توجد كلمة بحث */}
      {hasQuery && (
        <>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            {totalResults > 0
              ? `${totalResults} résultat(s) trouvé(s) pour : "${query}"`
              : `Aucun résultat trouvé pour : "${query}"`}
          </p>

          <div className="space-y-8">

            {/* نتائج الحافلات */}
            {busResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Bus className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    Lignes de bus
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {busResults.map((line, index) => (
                    <Card key={(line.id ?? index) as string}>
                      <CardHeader>
                        <CardTitle>
                          {line.name || "Ligne de bus"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        {line.code && (
                          <p className="font-medium">
                            Code : {line.code}
                          </p>
                        )}
                        {line.neighborhoods && (
                          <p dir="rtl">
                            الأحياء: {line.neighborhoods}
                          </p>
                        )}
                        {line.main_stops && (
                          <p>
                            Arrêts principaux : {line.main_stops}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* نتائج الخدمات الإدارية */}
            {serviceResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    Services administratifs
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceResults.map((s, index) => (
                    <Card key={(s.id ?? index) as string}>
                      <CardHeader>
                        <CardTitle>{s.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        {s.category && (
                          <p className="font-medium">
                            Catégorie : {s.category}
                          </p>
                        )}
                        {s.address && (
                          <p dir="rtl">
                            العنوان: {s.address}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* نتائج التعليم */}
            {educationResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    Éducation & Formation
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {educationResults.map((e, index) => (
                    <Card key={(e.id ?? index) as string}>
                      <CardHeader>
                        <CardTitle>{e.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        {e.level && (
                          <p className="font-medium">
                            Niveau : {e.level}
                          </p>
                        )}
                        {e.address && (
                          <p dir="rtl">
                            العنوان: {e.address}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* نتائج المحلات */}
            {placeResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Store className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    Commerces & lieux
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {placeResults.map((p, index) => (
                    <Card key={(p.id ?? index) as string}>
                      <CardHeader>
                        <CardTitle>{p.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        {p.category && (
                          <p className="font-medium">
                            Catégorie : {p.category}
                          </p>
                        )}
                        {p.address && (
                          <p dir="rtl">
                            العنوان: {p.address}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* نتائج الأرقام المهمة */}
            {numbersResults.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    Numéros importants
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {numbersResults.map((n, index) => (
                    <Card key={(n.id ?? index) as string}>
                      <CardHeader>
                        <CardTitle>{n.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        {n.category && (
                          <p className="font-medium">
                            Catégorie : {n.category}
                          </p>
                        )}
                        {n.phone && (
                          <p dir="rtl">
                            رقم الهاتف: {n.phone}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* لا نتائج في أي قسم */}
            {hasQuery && totalResults === 0 && (
              <div className="text-center text-muted-foreground mt-8">
                <p dir="rtl">
                  ما لقينا حتى نتيجة للكلمة: "{query}". جرب كلمة أخرى أو صيغة مختلفة.
                </p>
                <p className="text-sm mt-2">
                  يمكنك أيضًا تصفح الأقسام مباشرة من الصفحة الرئيسية.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
