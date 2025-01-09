import { db } from "@/app/_lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const productId = params.id;
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await db.product.delete({
    where: {
      id: params.id,
    },
  });
  return Response.json({ message: "Produtc deleted" }, { status: 200 });
}
