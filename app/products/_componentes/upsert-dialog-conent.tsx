"use client";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { NumericFormat } from "react-number-format";

import { upsertProduct } from "@/app/_actions/product/create-product";
import {
  ProductFormSchema,
  upsertProductSchema,
} from "@/app/_actions/product/create-product/schema";
import { useToast } from "@/app/_hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";

interface UpsertDialogContentProps {
  defaultValues?: ProductFormSchema;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
}

const UpsertDialogContent = ({
  defaultValues,
  setDialogIsOpen,
}: UpsertDialogContentProps) => {
  const isEditing = !!defaultValues;
  const { toast } = useToast();
  const form = useForm<ProductFormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 1,
      stock: 0,
    },
  });

  const { execute: executeUpsertProduct } = useAction(upsertProduct, {
    onError: ({ error: { serverError } }) => {
      toast({
        description: serverError ?? "Erro ao criar produto",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setDialogIsOpen(false);
      isEditing
        ? toast({ description: "Produto editado com sucesso" })
        : toast({ description: "Produto criado com sucesso" });
    },
  });

  async function onSubmit(data: ProductFormSchema) {
    executeUpsertProduct({ ...data, id: defaultValues?.id });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle className="text-accent-foreground">
              {isEditing ? "Editar produto" : "Cadastrar produto"}
            </DialogTitle>
            <DialogDescription>
              insira as informações do produto abaixo
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$"
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Estoque do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"} type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon size={15} className="animate-spin" />
              )}
              {isEditing ? "Editar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDialogContent;
