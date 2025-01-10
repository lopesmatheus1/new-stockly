
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_componentes/table-columns";
import { getProducts } from "../_data-access/products/get-products";
import AddProductDialog from "./_componentes/add-product-dialog";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="mx-8 my-8 w-full rounded-lg bg-white">
      <div className="flex w-full justify-between px-2 py-8">
        <div className="flex flex-col">
          <span className="text-primary">Gestão de produtos</span>
          <h2 className="text-2xl font-semibold text-foreground">Produtos</h2>
        </div>

        <AddProductDialog/>
      </div>

      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default Products;
