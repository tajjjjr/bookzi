CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`filename` text NOT NULL,
	`originalName` text NOT NULL,
	`mimeType` text NOT NULL,
	`size` integer NOT NULL,
	`url` text NOT NULL,
	`path` text NOT NULL,
	`entityType` text,
	`entityId` text,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`orderNumber` text NOT NULL,
	`userId` text NOT NULL,
	`items` text NOT NULL,
	`subtotal` real NOT NULL,
	`discount` real,
	`discountCode` text,
	`tax` real NOT NULL,
	`shippingCost` real NOT NULL,
	`total` real NOT NULL,
	`currency` text NOT NULL,
	`paymentStatus` text NOT NULL,
	`paymentMethod` text,
	`paymentIntentId` text,
	`fulfillmentStatus` text NOT NULL,
	`shippingAddress` text,
	`billingAddress` text,
	`shippingMethod` text,
	`trackingNumber` text,
	`trackingUrl` text,
	`customerEmail` text NOT NULL,
	`customerPhone` text,
	`notes` text,
	`internalNotes` text,
	`status` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`paidAt` text,
	`shippedAt` text,
	`deliveredAt` text,
	`cancelledAt` text,
	`refundedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_orderNumber_unique` ON `orders` (`orderNumber`);--> statement-breakpoint
CREATE TABLE `product_images` (
	`productId` text NOT NULL,
	`attachmentId` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`isDefault` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` integer NOT NULL,
	`compareAtPrice` integer,
	`currency` text DEFAULT 'USD' NOT NULL,
	`sku` text NOT NULL,
	`barcode` text,
	`serialNumber` text,
	`stock` integer DEFAULT 0 NOT NULL,
	`lowStockThreshold` integer,
	`trackInventory` integer DEFAULT true NOT NULL,
	`allowBackorder` integer DEFAULT false NOT NULL,
	`categoryId` text,
	`tags` text DEFAULT '[]',
	`brand` text,
	`vendor` text,
	`weight` integer,
	`dimensions` text,
	`hasVariants` integer DEFAULT false NOT NULL,
	`slug` text NOT NULL,
	`metaTitle` text,
	`metaDescription` text,
	`isActive` integer DEFAULT true NOT NULL,
	`isFeatured` integer DEFAULT false,
	`isDigital` integer DEFAULT false,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`publishedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_sku_unique` ON `products` (`sku`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user',
	`isActive` integer DEFAULT true,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);