import { useEffect, useState } from "react";
import { Bus, Building2, GraduationCap, Store, Phone } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import AdminBus from "./AdminBus";
import AdminServices from "./AdminServices";
import AdminEducation from "./AdminEducation";
import AdminCommerces from "./AdminCommerces";
import AdminNumbers from "./AdminNumbers";

// الكود السري ديال لوحة الإدارة
const ADMIN_CODE = "Khalid@2025";

const Admin = () => {
  const [tab, setTab] = useState<string>("bus");

  // حالة الكود السري
  const [code, setCode] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // إذا سبق ودخلتي الكود فهاد الجهاز، ما يعاودش يطلبو
  useEffect(() => {
    const ok = localStorage.getItem("admin_ok");
    if (ok === "true") {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setAuthorized(true);
      localStorage.setItem("admin_ok", "true");
      setCode("");
    } else {
      alert("الكود غير صحيح");
    }
  };

  // إذا مازال ما دخلناش الكود السري → نبقاو فصفحة الكود
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">
              لوحة إدارة دليل كلميم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4 text-center" dir="rtl">
              المرجو إدخال الكود السري للولوج إلى صفحة الإدارة
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                className="border rounded-md px-3 py-2 w-full"
                placeholder="الكود السري"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-2 rounded-md font-medium hover:bg-slate-800"
              >
                دخول
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // منين الكود يكون صحيح → نوري لوحة الإدارة ديالك كما كانت
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panneau d'administration</h1>
        <p className="text-muted-foreground" dir="rtl">
          من هنا تقدر تتحكم فالحافلات، الخدمات، التعليم، المحلات، والأرقام المهمة
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="bus" className="flex items-center gap-1">
            <Bus className="h-4 w-4" />
            Bus
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Éducation
          </TabsTrigger>
          <TabsTrigger value="commerces" className="flex items-center gap-1">
            <Store className="h-4 w-4" />
            Commerces
          </TabsTrigger>
          <TabsTrigger value="numbers" className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            Numéros
          </TabsTrigger>
        </TabsList>

        {/* TAB: Bus */}
        <TabsContent value="bus">
          <AdminBus />
        </TabsContent>

        {/* TAB: Services */}
        <TabsContent value="services">
          <AdminServices />
        </TabsContent>

        {/* TAB: Education */}
        <TabsContent value="education">
          <AdminEducation />
        </TabsContent>

        {/* TAB: Commerces */}
        <TabsContent value="commerces">
          <AdminCommerces />
        </TabsContent>

        {/* TAB: Numbers */}
        <TabsContent value="numbers">
          <AdminNumbers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
