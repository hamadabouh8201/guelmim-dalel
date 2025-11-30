import { useState, useEffect, FormEvent } from "react";
import { Store, PlusCircle, Trash2, MapPin, Phone, Clock } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { CommerceItem } from "../data/commerce";

const STORAGE_KEY = "guelmim_custom_commerces";

const AdminCommerces = () => {
  const [commercesList, setCommercesList] = useState<CommerceItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    schedule: "",
    description: "",
    google_maps_url: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CommerceItem[];
        setCommercesList(parsed);
      }
    } catch (err) {
      console.error("Erreur commerces localStorage", err);
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

    const newCommerce: CommerceItem = {
      id: `com-${Date.now()}`,
      name: form.name,
      category: form.category,
      address: form.address,
      phone: form.phone || undefined,
      schedule: form.schedule || undefined,
      description: form.description || undefined,
      google_maps_url: form.google_maps_url || undefined,
    };

    const updated = [...commercesList, newCommerce];
    setCommercesList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setForm({
      name: "",
      category: "",
      address: "",
      phone: "",
      schedule: "",
      description: "",
      google_maps_url: "",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("بغيت فعلاً تحيدي هاد المحل؟")) return;

    const updated = commercesList.filter((c) => c.id !== id);
    setCommercesList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            إضافة محل / سوق جديد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>اسم المحل / السوق</Label>
              <Input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="مثال: صيدلية القدس، سوق الأسبوعي..."
              />
            </div>

            <div className="space-y-2">
              <Label>الفئة</Label>
              <Input
                value={form.category}
                onChange={handleChange("category")}
                placeholder="مخبزة، صيدلية، مواد غذائية، سوق..."
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
              <Label>الهاتف (اختياري)</Label>
              <Input
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="05 XX XX XX XX"
              />
            </div>

            <div className="space-y-2">
              <Label>ساعات العمل (اختياري)</Label>
              <Input
                value={form.schedule}
                onChange={handleChange("schedule")}
                placeholder="08:00 - 20:00"
              />
            </div>

            <div className="space-y-2">
              <Label>وصف مختصر (اختياري)</Label>
              <Textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="مثال: مخبزة تقليدية، منتجات محلية، خضر وفواكه..."
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

            <Button type="submit" className="w-full">
              حفظ المحل
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            المحلات المضافة من طرفك
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commercesList.length === 0 ? (
            <p className="text-sm text-muted-foreground" dir="rtl">
            </p>
          ) : (
            <div className="space-y-3">
              {commercesList.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.category}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {c.address}
                    </p>
                    {c.phone && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {c.phone}
                      </p>
                    )}
                    {c.schedule && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {c.schedule}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(c.id)}
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

export default AdminCommerces;
