import { useState } from "react";
import { Bus, Building2, GraduationCap, Store, Phone } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import AdminBus from "./AdminBus";
import AdminServices from "./AdminServices";
import AdminEducation from "./AdminEducation";
import AdminCommerces from "./AdminCommerces";
import AdminNumbers from "./AdminNumbers";

const Admin = () => {
  const [tab, setTab] = useState<string>("bus");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panneau d'administration</h1>
        <p className="text-muted-foreground" dir="rtl">
          
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
