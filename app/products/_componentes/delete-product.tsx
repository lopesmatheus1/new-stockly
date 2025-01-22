import { deleteProduct } from "@/app/_actions/product/delete-product";
import { DeleteProductSchema } from "@/app/_actions/product/delete-product/schema";
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
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";

interface DeleteDialogProps {
  productId: string;
}

const DeleteProductAlert = ({ productId }: DeleteDialogProps) => {
  const { toast } = useToast();

  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onError: ({ error: { serverError, validationErrors } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast({
        variant: "destructive",
        description: serverError ?? flattenedErrors.formErrors[0],
      });
    },
    onSuccess: () => {
      toast({
        description: "Produto deletada com sucesso!",
      });
    },
  });

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
        <AlertDialogAction
          onClick={() => executeDeleteProduct({ id: productId })}
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductAlert;
