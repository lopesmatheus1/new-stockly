import { getProducts } from "../_data-access/products/get-products";
import SheetSaleButton from "./_components/create-sale-button";

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

        <SheetSaleButton products={products} productOptions={options} />
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
