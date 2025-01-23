import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  ClipboardPen,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import DeleteSaleAlert from "./delete-sale";
import { Sale } from "@prisma/client";

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="h-6 w-6">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(sale.id)}
          >
            <ClipboardCopy /> Copiar ID
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ClipboardPen /> Editar
          </DropdownMenuItem>

          <AlertDialogTrigger>
            <DropdownMenuItem>
              <TrashIcon /> Deletar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <DeleteSaleAlert sale={sale} />
      </DropdownMenu>
    </AlertDialog>
  );
};

export default SalesTableDropdownMenu;
