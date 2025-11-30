import { useState, useEffect, FormEvent } from "react";
import { Building2, PlusCircle, Trash2, MapPin, Clock } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { ServiceItem } from "../data/services";

const STORAGE_KEY = "guelmim_custom_services";

const AdminServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    opening_hours: "",
    near_bus_lines: "",
    google_maps_url: "",
    notes: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ServiceItem[];
        setServices(parsed);
      }
    } catch (err) {
      console.error("Erreur services localStorage", err);
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

    const newService: ServiceItem = {
      id: `svc-${Date.now()}`,
      name: form.name,
      category: form.category,
      address: form.address,
      opening_hours: form.opening_hours,
      near_bus_lines: form.near_bus_lines,
      google_maps_url: form.google_maps_url,
      notes: form.notes,
    };

    const updated = [...services, newService];
    setServices(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setForm({
      name: "",
      category: "",
      address: "",
      opening_hours: "",
      near_bus_lines: "",
      google_maps_url: "",
      notes: "",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("بغيت فعلاً تحيدي هاد الخدمة؟")) return;

    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            إضافة خدمة إدارية جديدة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>اسم المرفق / الإدارة</Label>
              <Input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="مثال: جماعة كلميم"
              />
            </div>

            <div className="space-y-2">
              <Label>الفئة</Label>
              <Input
                value={form.category}
                onChange={handleChange("category")}
                placeholder="مثال: إدارة جماعية، صحة، ولاية..."
              />
            </div>

            <div className="space-y-2">
              <Label>العنوان</Label>
              <Input
                value={form.address}
                onChange={handleChange("address")}
                placeholder="الشارع، الحي، نقطة مرجعية..."
              />
            </div>

            <div className="space-y-2">
              <Label>ساعات العمل</Label>
              <Input
                value={form.opening_hours}
                onChange={handleChange("opening_hours")}
                placeholder="08:30 - 16:30 (الإثنين - الجمعة)"
              />
            </div>

            <div className="space-y-2">
              <Label>خطوط الحافلات القريبة</Label>
              <Input
                value={form.near_bus_lines}
                onChange={handleChange("near_bus_lines")}
                placeholder="L1, L3..."
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
                placeholder="أي معلومات إضافية تفيد الساكنة..."
              />
            </div>

            <Button type="submit" className="w-full">
              حفظ الخدمة
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            الخدمات المضافة من طرفك
          </CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-sm text-muted-foreground" dir="rtl">
            </p>
          ) : (
            <div className="space-y-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.category}</p>
                    {s.address && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {s.address}
                      </p>
                    )}
                    {s.opening_hours && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {s.opening_hours}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(s.id)}
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

export default AdminServices;
