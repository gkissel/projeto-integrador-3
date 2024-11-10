ALTER TABLE "account" ADD COLUMN "image_binary" "bytea" NOT NULL;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "image_blob";