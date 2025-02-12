import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

async function main() {
    // Optional: Clear out existing data (order matters because of foreign key constraints)
    console.log("Clearing existing data...");
    await prisma.transaction.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});

    // Create dummy categories
    const categoriesData = [
        { name: "Electronics" },
        { name: "Furniture" },
        { name: "Home appliances" },
        { name: "Sporting goods" },
        { name: "Outdoor" },
        { name: "Toys" },
    ];

    console.log("Creating dummy categories...");
    const categories = await Promise.all(
        categoriesData.map((data) => prisma.category.create({ data }))
    );

    console.log(`Created ${categories.length} categories.`);

    // Create a dummy user (this user will be the owner of the product)
    console.log("Creating dummy user...");
    const user = await prisma.user.create({
        data: {
            email: "test@example.com",
            password: "password", // In production, hash the password!
            name: "Test User",
        },
    });

    console.log(`Created user: ${user.email}`);

    // Create a dummy product associated with the dummy user and some categories.
    console.log("Creating dummy product...");
    const product = await prisma.product.create({
        data: {
            title: "Sample Product",
            description: "This is a sample product seeded for testing.",
            price: 99.99,
            rentPrice: 9.99,
            rentOption: "daily",
            ownerId: user.id,
            categories: {
                connect: categories.slice(0, 3).map((category) => ({ id: category.id })),
            },
        },
        include: {
            categories: true,
        },
    });

    console.log(
        `Created product: ${product.title} with categories: ${product.categories
            .map((c) => c.name)
            .join(", ")}`
    );
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
