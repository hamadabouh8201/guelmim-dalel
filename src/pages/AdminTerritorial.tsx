import { useState } from "react";

const AdminTerritorial = () => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("guelmim_territorial");
    return stored ? JSON.parse(stored) : [];
  });

  const save = (newData: any) => {
    setData(newData);
    localStorage.setItem("guelmim_territorial", JSON.stringify(newData));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">إدارة السلطات الترابية</h2>
      <p className="text-sm text-muted-foreground mb-4">
        هنا يمكنك إضافة الولاية – الباشوية – القيادات – الملحقات الإدارية
      </p>

      <button
        onClick={() => {
          const newItem = {
            id: crypto.randomUUID(),
            name: "",
            name_fr: "",
            category: "خدمات إدارية",
            subcategory: "السلطات الترابية",
            address: "",
            phone: ""
          };
          save([...data, newItem]);
        }}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        + إضافة إدارة جديدة
      </button>

      {data.map((item: any, i: number) => (
        <div key={item.id} className="border p-4 rounded mt-4 space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="الاسم بالعربية"
            value={item.name}
            onChange={(e) => {
              item.name = e.target.value;
              save([...data]);
            }}
          />

          <input
            className="border p-2 w-full"
            placeholder="الاسم بالفرنسية"
            value={item.name_fr}
            onChange={(e) => {
              item.name_fr = e.target.value;
              save([...data]);
            }}
          />

          <input
            className="border p-2 w-full"
            placeholder="العنوان"
            value={item.address}
            onChange={(e) => {
              item.address = e.target.value;
              save([...data]);
            }}
          />

          <input
            className="border p-2 w-full"
            placeholder="رقم الهاتف"
            value={item.phone}
            onChange={(e) => {
              item.phone = e.target.value;
              save([...data]);
            }}
          />

          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => {
              data.splice(i, 1);
              save([...data]);
            }}
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminTerritorial;
