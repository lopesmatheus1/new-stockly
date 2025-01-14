"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import UpsertDialogContent from "./upsert-dialog-conent";

const CreateProductDialog = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="self-end">
          <PlusIcon size={20} />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <UpsertDialogContent updateDialog={() => setDialogIsOpen(false)} />
    </Dialog>
  );
};

export default CreateProductDialog;
