DO $$ BEGIN
 CREATE TYPE "public"."transaction_types" AS ENUM('INCOME', 'OUTCOME');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "type" "transaction_types" NOT NULL;