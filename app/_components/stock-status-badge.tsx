import { Badge } from "@/app/_components/ui/badge";
import { Circle } from "lucide-react";

const getStatusLabel = (status: string) => {
  if ((status = "IN_STOCK")) {
    return "Em estoque";
  }
  return "Fora de estoque";
};

interface StockStatusBadgeProps {
  status?: "IN_STOCK" | "OUT_OF_STOCK";
}

const StockStatusBadge = ({ status }: StockStatusBadgeProps) => {
  if (!status) return;
  const label = getStatusLabel(status);
  return (
    <Badge
      variant={`${label === "Fora de estoque" ? "destructive" : "outline"}`}
      className={`${label === "Fora de estoque" ? "bg-destructive/30 text-destructive hover:bg-destructive/10" : "bg-primary/30 text-primary hover:bg-primary/10"} gap-1`}
    >
      <Circle
        size={12}
        className={`${label === "Fora de estoque" ? "fill-destructive" : "fill-primary"}`}
        stroke="none"
      />
      {label}
    </Badge>
  );
};

export default StockStatusBadge;
