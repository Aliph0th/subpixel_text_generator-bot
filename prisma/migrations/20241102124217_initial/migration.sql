-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramID" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "config_hash" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramID_key" ON "User"("telegramID");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
