import { deleteProduct } from "@/app/_actions/product/delete-product";
import { IdProductSchema } from "@/app/_actions/product/delete-product/schema";
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

interface DeleteDialogProps {
  productId: IdProductSchema;
}

const DeleteProductAlert = ({ productId }: DeleteDialogProps) => {
  const { toast } = useToast();
  const handleDeleteClick = async () => {
    try {
      deleteProduct(productId);

      toast({
        description: "Tarefa deletada com sucesso!",
      });
    } catch (error) {
      console.error(error);
    }
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
        <AlertDialogAction onClick={handleDeleteClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductAlert;
