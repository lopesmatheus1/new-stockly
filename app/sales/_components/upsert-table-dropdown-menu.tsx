import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { Product } from "@prisma/client";

import { ClipboardCopy, MoreHorizontalIcon, TrashIcon } from "lucide-react";

interface UpsertSalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const UpsertSalesTableDropdownMenu = ({
  product,
  onDelete,
}: UpsertSalesTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="h-6 w-6">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <ClipboardCopy /> Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(product.id)}>
          <TrashIcon /> Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpsertSalesTableDropdownMenu;
