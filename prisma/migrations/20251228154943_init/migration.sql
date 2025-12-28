/*
  Warnings:

  - You are about to drop the column `inStock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "inStock",
DROP COLUMN "price",
DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_email_key" ON "newsletters"("email");
