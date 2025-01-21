"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { CheckIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Product } from "@prisma/client";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/app/_components/ui/table";
import { FormatCurrency } from "@/app/_helpers/currency";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { createSale } from "@/app/_actions/sales/create-sale";
import { useToast } from "@/app/_hooks/use-toast";

interface UpsertSheetContentProps {
  productOptions: ComboboxOption[];
  products: Product[];
  onSubmitSuccess: () => void;
}

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  productId: z.string().uuid({ message: "O produto é obrigatório!" }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "A quantidade vendida precisa ser maior que 0" }),
});

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  productOptions,
  products,
  onSubmitSuccess,
}: UpsertSheetContentProps) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([]);
  const { toast } = useToast();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProduct((currentProduct) => {
      const existingProducts = currentProduct.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProducts) {
        const productIsOutOfStock =
          existingProducts.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível no estoque.",
          });
          return currentProduct;
        }
        form.reset();
        return currentProduct.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível no estoque.",
        });
        return currentProduct;
      }
      form.reset();
      return [
        ...currentProduct,
        {
          ...selectedProduct,
          quantity: data.quantity,
          price: Number(selectedProduct.price),
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProduct]);

  const onDelete = (productId: string) => {
    const newProducts = selectedProduct.filter(
      (product) => product.id !== productId,
    );
    setSelectedProduct(newProducts);
  };

  const onSubmitSale = async () => {
    try {
      await createSale({
        products: selectedProduct.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      form.reset();
      onSubmitSuccess();
      setSelectedProduct([]);
      setIsSubmiting(false);
      return toast({ description: "Venda realizada com sucesso" });
    } catch (error) {
      console.log(error);
      return toast({
        variant: "destructive",
        description: "Ocorreu um erro ao realizar a venda.",
      });
    }
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informações abaixo.</SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto vendido</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade vendida</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"outline"} className="w-full">
            <PlusIcon />
            Adicionar venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{FormatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {FormatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <SalesTableDropdownMenu onDelete={onDelete} product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{FormatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-6">
        <Button
          className="w-full"
          disabled={selectedProduct.length === 0 || isSubmiting}
          onClick={() => {
            onSubmitSale();
            setIsSubmiting(true);
          }}
        >
          {isSubmiting ? (
            <Loader2Icon size={18} className="animate-spin" />
          ) : (
            <CheckIcon />
          )}
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
