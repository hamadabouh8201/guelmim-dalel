import { useState, useEffect, FormEvent } from "react";
import { Bus, PlusCircle, Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { BusLine } from "../data/busLines";

const STORAGE_KEY = "guelmim_custom_bus_lines";

const AdminBus = () => {
  const [lines, setLines] = useState<BusLine[]>([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    neighborhoods: "",
    main_stops: "",
    schedule_morning: "",
    schedule_afternoon: "",
    schedule_evening: "",
    notes: "",
  });

  // نحمّلو الخطوط المخزّنة من قبل من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BusLine[];
        setLines(parsed);
      }
    } catch (err) {
      console.error("Erreur de lecture localStorage", err);
    }
  }, []);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.code) {
      alert("الاسم والكود ضروريين");
      return;
    }

    const newLine: BusLine = {
      id: `custom-${Date.now()}`,
      name: form.name,
      code: form.code,
      description: form.description,
      neighborhoods: form.neighborhoods,
      main_stops: form.main_stops,
      schedule_morning: form.schedule_morning,
      schedule_afternoon: form.schedule_afternoon,
      schedule_evening: form.schedule_evening,
      notes: form.notes,
    };

    const updated = [...lines, newLine];
    setLines(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // إعادة تعمير الفورم
    setForm({
      name: "",
      code: "",
      description: "",
      neighborhoods: "",
      main_stops: "",
      schedule_morning: "",
      schedule_afternoon: "",
      schedule_evening: "",
      notes: "",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("بغيت فعلاً تحيدي هاد الخط؟")) return;

    const updated = lines.filter((l) => l.id !== id);
    setLines(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Administration — Lignes de bus
        </h1>
        <p className="text-muted-foreground" dir="rtl">
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire d'ajout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              إضافة خط جديد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>اسم الخط</Label>
                <Input
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="مثال: الخط 4 — الحي الصناعي"
                />
              </div>

              <div className="space-y-2">
                <Label>Code</Label>
                <Input
                  value={form.code}
                  onChange={handleChange("code")}
                  placeholder="L4"
                />
              </div>

              <div className="space-y-2">
                <Label>وصف مختصر</Label>
                <Textarea
                  value={form.description}
                  onChange={handleChange("description")}
                  placeholder="خط يربط بين ... ويخدم التلاميذ والعمال..."
                />
              </div>

              <div className="space-y-2">
                <Label>الأحياء التي يخدمها</Label>
                <Textarea
                  value={form.neighborhoods}
                  onChange={handleChange("neighborhoods")}
                  placeholder="حي الرحمة – حي الأمل – شارع محمد السادس..."
                />
              </div>

              <div className="space-y-2">
                <Label>المحطات الرئيسية</Label>
                <Textarea
                  value={form.main_stops}
                  onChange={handleChange("main_stops")}
                  placeholder="المستشفى الجهوي – السوق – المحطة الطرقية..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>الصباح</Label>
                  <Input
                    value={form.schedule_morning}
                    onChange={handleChange("schedule_morning")}
                    placeholder="06:00 - 12:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>بعد الزوال</Label>
                  <Input
                    value={form.schedule_afternoon}
                    onChange={handleChange("schedule_afternoon")}
                    placeholder="12:00 - 18:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>المساء</Label>
                  <Input
                    value={form.schedule_evening}
                    onChange={handleChange("schedule_evening")}
                    placeholder="18:00 - 23:00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>ملاحظات</Label>
                <Textarea
                  value={form.notes}
                  onChange={handleChange("notes")}
                  placeholder="مثال: يكون مزدحم في أوقات الذروة..."
                />
              </div>

              <Button type="submit" className="w-full">
                <Bus className="h-4 w-4 mr-2" />
                حفظ الخط الجديد
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Liste des lignes personnalisées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              الخطوط المضافة من طرفك
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lines.length === 0 ? (
              <p className="text-sm text-muted-foreground">
               
              </p>
            ) : (
              <div className="space-y-3">
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className="flex items-start justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {line.name}{" "}
                        <span className="text-xs text-muted-foreground">
                          ({line.code})
                        </span>
                      </p>
                      {line.neighborhoods && (
                        <p className="text-xs text-muted-foreground">
                          {line.neighborhoods}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(line.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBus;
