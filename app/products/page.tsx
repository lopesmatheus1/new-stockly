import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_componentes/table-columns";

const Products = async () => {
  const products = await db.product.findMany();
  return (
    <div className="mx-8 my-8 w-full rounded-lg bg-white">
      <div className="flex w-full justify-between px-2 py-8">
        <div className="flex flex-col">
          <span className="text-primary">Gestão de produtos</span>
          <h2 className="text-2xl font-semibold text-foreground">Produtos</h2>
        </div>
        <Button className="self-end">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </div>

      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default Products;
