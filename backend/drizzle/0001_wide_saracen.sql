CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`productId` text NOT NULL,
	`userId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`reviewerName` text NOT NULL,
	`reviewerEmail` text,
	`isVerified` integer DEFAULT false,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `products` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `author` text;--> statement-breakpoint
ALTER TABLE `products` ADD `category` text;--> statement-breakpoint
ALTER TABLE `products` ADD `image` text;--> statement-breakpoint
ALTER TABLE `products` ADD `rating` real DEFAULT 0;--> statement-breakpoint
ALTER TABLE `products` ADD `reviews` integer DEFAULT 0;