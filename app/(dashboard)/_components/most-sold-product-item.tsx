import StockStatusBadge from "@/app/_components/stock-status-badge";
import { MostSoldProductsDto } from "@/app/_data-access/dashboard/get-dashboard";
import { FormatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductItemProps {
  product: MostSoldProductsDto;
}

const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-primary p-2 ease-in-out hover:bg-primary/5">
      <div className="space-y-1 text-start">
        <StockStatusBadge status={product.status} />
        <p className="text-sm font-semibold text-slate-800">{product.name}</p>
        <p>{FormatCurrency(Number(product.price))}</p>
      </div>

      <div>
        <p className="self-start text-sm font-semibold text-slate-800">
          {product.totalSold} vendidos
        </p>
      </div>
    </div>
  );
};

export default MostSoldProductItem;
