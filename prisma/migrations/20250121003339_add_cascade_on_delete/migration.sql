-- DropForeignKey
ALTER TABLE "saleProduct" DROP CONSTRAINT "saleProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "saleProduct" DROP CONSTRAINT "saleProduct_saleId_fkey";

-- AddForeignKey
ALTER TABLE "saleProduct" ADD CONSTRAINT "saleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleProduct" ADD CONSTRAINT "saleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
