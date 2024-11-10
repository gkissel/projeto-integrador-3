ALTER TABLE "account" ADD COLUMN "value" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "max_value";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "actual_value";