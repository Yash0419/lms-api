-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "tittle" TEXT NOT NULL,
    "isbn" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "availabel_copies" INTEGER NOT NULL DEFAULT 1,
    "total_copies" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
