import { useState, useEffect, FormEvent } from "react";
import { GraduationCap, PlusCircle, Trash2, MapPin, Phone } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { EducationPlace } from "../data/education";

const STORAGE_KEY = "guelmim_custom_education";

const AdminEducation = () => {
  const [places, setPlaces] = useState<EducationPlace[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    levels: "",
    opening_hours: "",
    phone: "",
    near_bus_lines: "",
    google_maps_url: "",
    notes: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as EducationPlace[];
        setPlaces(parsed);
      }
    } catch (err) {
      console.error("Erreur éducation localStorage", err);
    }
  }, []);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.address) {
      alert("الاسم، الفئة، والعنوان ضروريين");
      return;
    }

    const newPlace: EducationPlace = {
      id: `edu-${Date.now()}`,
      name: form.name,
      category: form.category,
      address: form.address,
      levels: form.levels,
      opening_hours: form.opening_hours,
      phone: form.phone,
      near_bus_lines: form.near_bus_lines,
      google_maps_url: form.google_maps_url,
      notes: form.notes,
    };

    const updated = [...places, newPlace];
    setPlaces(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setForm({
      name: "",
      category: "",
      address: "",
      levels: "",
      opening_hours: "",
      phone: "",
      near_bus_lines: "",
      google_maps_url: "",
      notes: "",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("بغيت فعلاً تحيدي هاد المؤسسة؟")) return;

    const updated = places.filter((p) => p.id !== id);
    setPlaces(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            إضافة مؤسسة تعليمية جديدة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>اسم المؤسسة</Label>
              <Input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="مثال: ثانوية باب الصحراء"
              />
            </div>

            <div className="space-y-2">
              <Label>الفئة</Label>
              <Input
                value={form.category}
                onChange={handleChange("category")}
                placeholder="Lycée, Collège, École primaire, Centre de formation..."
              />
            </div>

            <div className="space-y-2">
              <Label>العنوان</Label>
              <Input
                value={form.address}
                onChange={handleChange("address")}
                placeholder="الحي، الشارع، نقطة مرجعية..."
              />
            </div>

            <div className="space-y-2">
              <Label>المستويات / التكوينات</Label>
              <Textarea
                value={form.levels}
                onChange={handleChange("levels")}
                placeholder="مثال: الجذع المشترك، الأولى باك، الثانية باك..."
              />
            </div>

            <div className="space-y-2">
              <Label>ساعات العمل (اختياري)</Label>
              <Input
                value={form.opening_hours}
                onChange={handleChange("opening_hours")}
                placeholder="08:00 - 17:00"
              />
            </div>

            <div className="space-y-2">
              <Label>الهاتف (اختياري)</Label>
              <Input
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="05 XX XX XX XX"
              />
            </div>

            <div className="space-y-2">
              <Label>خطوط الحافلات القريبة (اختياري)</Label>
              <Input
                value={form.near_bus_lines}
                onChange={handleChange("near_bus_lines")}
                placeholder="L1, L2..."
              />
            </div>

            <div className="space-y-2">
              <Label>رابط Google Maps (اختياري)</Label>
              <Input
                value={form.google_maps_url}
                onChange={handleChange("google_maps_url")}
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label>ملاحظات إضافية</Label>
              <Textarea
                value={form.notes}
                onChange={handleChange("notes")}
                placeholder="أي معلومات إضافية تفيد التلاميذ أو الآباء..."
              />
            </div>

            <Button type="submit" className="w-full">
              حفظ المؤسسة
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            المؤسسات المضافة من طرفك
          </CardTitle>
        </CardHeader>
        <CardContent>
          {places.length === 0 ? (
            <p className="text-sm text-muted-foreground" dir="rtl">
            </p>
          ) : (
            <div className="space-y-3">
              {places.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {p.address}
                    </p>
                    {p.phone && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {p.phone}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(p.id)}
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
  );
};

export default AdminEducation;
