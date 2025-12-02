import { useState } from "react";
import { Landmark } from "lucide-react";

const AdminAuthorities = () => {
  // نحفظو اللائحة فـ localStorage بنفس الكي المستعمل فـ صفحة العرض
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("guelmim_authorities");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const save = (newData: any[]) => {
    setData(newData);
    localStorage.setItem("guelmim_authorities", JSON.stringify(newData));
  };

  const addAuthority = () => {
    const newItem = {
      id: String(Date.now()) + Math.random().toString(16).slice(2),
      name: "",
      name_fr: "",
      type: "",
      address: "",
      phone: "",
    };
    save([...data, newItem]);
  };

  const updateField = (index: number, field: string, value: string) => {
    const copy = [...data];
    copy[index] = { ...copy[index], [field]: value };
    save(copy);
  };

  const deleteAuthority = (index: number) => {
    const copy = [...data];
    copy.splice(index, 1);
    save(copy);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">إدارة السلطات الترابية</h2>
      <p className="text-sm text-muted-foreground mb-4" dir="rtl">
        من هنا يمكنك إضافة الولاية، الباشوية، القيادات والمراكز الإدارية
      </p>

      <button
        onClick={addAuthority}
        className="px-4 py-2 bg-primary text-white rounded mb-4"
      >
        + إضافة إدارة ترابية جديدة
      </button>

      <div className="space-y-6">
        {data.map((item: any, index: number) => (
          <div
            key={item.id}
            className="border rounded p-4 space-y-3 bg-card shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="h-5 w-5 text-secondary" />
              <h3 className="font-semibold">إدارة رقم {index + 1}</h3>
            </div>

            <input
              className="w-full border p-2 rounded"
              placeholder="الاسم بالعربية (مثال: ولاية جهة كلميم واد نون)"
              value={item.name}
              onChange={(e) => updateField(index, "name", e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Nom en français (ex: Wilaya de la Région Guelmim-Oued Noun)"
              value={item.name_fr}
              onChange={(e) => updateField(index, "name_fr", e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="النوع (ولاية / باشوية / قيادة / ملحقة...)"
              value={item.type}
              onChange={(e) => updateField(index, "type", e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="العنوان"
              value={item.address}
              onChange={(e) => updateField(index, "address", e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="رقم الهاتف (اختياري)"
              value={item.phone}
              onChange={(e) => updateField(index, "phone", e.target.value)}
            />

            <button
              onClick={() => deleteAuthority(index)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAuthorities;
