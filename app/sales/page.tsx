import { Button } from "../_components/ui/button";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/products/get-products";
import UpsertSheetContent from "./_components/upsert-sheet-content";

const Sales = async () => {
  const products = await getProducts();
  const options = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  return (
    <div className="mx-8 my-8 w-full rounded-lg bg-white">
      <div className="flex w-full justify-between px-2 py-8">
        <div className="flex flex-col">
          <span className="text-primary">Gestão de produtos</span>
          <h2 className="text-2xl font-semibold text-foreground">Produtos</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova venda</Button>
          </SheetTrigger>
          <UpsertSheetContent products={products} productOptions={options} />
        </Sheet>
      </div>
    </div>
  );
};

export default Sales;

{
  /* <DataTable
  columns={productTableColumns}
  data={JSON.parse(JSON.stringify(products))}
/> */
}
