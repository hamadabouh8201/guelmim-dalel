import { useState, useEffect, FormEvent } from "react";
import { Phone, PlusCircle, Trash2, Info } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { ImportantNumber } from "../data/numbers";

const STORAGE_KEY = "guelmim_custom_numbers";

const AdminNumbers = () => {
  const [numbers, setNumbers] = useState<ImportantNumber[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ImportantNumber[];
        setNumbers(parsed);
      }
    } catch (err) {
      console.error("Erreur numéros localStorage", err);
    }
  }, []);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.phone) {
      alert("الاسم، الفئة، ورقم الهاتف ضرورية");
      return;
    }

    const newNumber: ImportantNumber = {
      id: `num-${Date.now()}`,
      title: form.title,
      category: form.category,
      phone: form.phone,
      description: form.description || undefined,
    };

    const updated = [...numbers, newNumber];
    setNumbers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setForm({
      title: "",
      category: "",
      phone: "",
      description: "",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("بغيت فعلاً تحيدي هاد الرقم؟")) return;

    const updated = numbers.filter((n) => n.id !== id);
    setNumbers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            إضافة رقم مهم جديد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>اسم الجهة</Label>
              <Input
                value={form.title}
                onChange={handleChange("title")}
                placeholder="مثال: الوقاية المدنية، شرطة النجدة..."
              />
            </div>

            <div className="space-y-2">
              <Label>الفئة</Label>
              <Input
                value={form.category}
                onChange={handleChange("category")}
                placeholder="إسعاف، أمن، صحة، إدارة..."
              />
            </div>

            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="150, 19, 05 XX XX XX XX..."
              />
            </div>

            <div className="space-y-2">
              <Label>وصف مختصر (اختياري)</Label>
              <Textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="مثال: للاستفسار عن..., خط للطوارئ..., إلخ"
              />
            </div>

            <Button type="submit" className="w-full">
              حفظ الرقم
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            الأرقام المضافة من طرفك
          </CardTitle>
        </CardHeader>
        <CardContent>
          {numbers.length === 0 ? (
            <p className="text-sm text-muted-foreground" dir="rtl">      </p>
          ) : (
            <div className="space-y-3">
              {numbers.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.category}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {n.phone}
                    </p>
                    {n.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {n.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(n.id)}
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

export default AdminNumbers;
