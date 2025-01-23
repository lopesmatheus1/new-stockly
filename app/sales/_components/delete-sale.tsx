import { deleteSale } from "@/app/_actions/sales/delete-sale";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { useToast } from "@/app/_hooks/use-toast";
import { Sale } from "@prisma/client";
import { flattenValidationErrors } from "next-safe-action";

import { useAction } from "next-safe-action/hooks";

interface DeleteSaleAlertProps {
  sale: Pick<Sale, "id">;
}

const DeleteSaleAlert = ({ sale }: DeleteSaleAlertProps) => {
  const { toast } = useToast();

  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onError: ({ error: { serverError, validationErrors } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast({
        variant: "destructive",
        description: serverError ?? flattenedErrors.formErrors[0],
      });
    },
    onSuccess: () => {
      toast({ description: "Venda deletada com sucesso" });
    },
  });

  const onDeleteClick = () => {
    executeDeleteSale({ id: sale.id });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a deletar esse produto. Esta ação não pode ser
          desfeita, deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onDeleteClick}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteSaleAlert;
