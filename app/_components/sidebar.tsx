import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="h-screen w-[272px] bg-white">
      <div className="py-7 pl-8">
        <h1 className="text-3xl font-bold text-primary">Stockly</h1>
      </div>

      <div className="flex flex-col gap-2">
        <SidebarButton link="/">
          <LayoutGrid />
          Dashboard
        </SidebarButton>

        <SidebarButton link="/products">
          <Package />
          Produtos
        </SidebarButton>

        <SidebarButton link="/sales">
          <ShoppingBasket />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
