"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Loader2Icon, PlusIcon } from "lucide-react";
import { NumericFormat } from "react-number-format";

import { createProduct } from "@/app/_actions/product/create-product";
import { useState } from "react";
import {
  ProductFormSchema,
  createProductSchema,
} from "@/app/_actions/product/create-product/schema";

const CreateProductDialog = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<ProductFormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 1,
      stock: 0,
    },
  });

  async function onSubmit(data: ProductFormSchema) {
    try {
      await createProduct(data);
      setDialogIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="self-end">
          <PlusIcon size={20} />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="text-accent-foreground">
                Cadastrar produto
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
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
