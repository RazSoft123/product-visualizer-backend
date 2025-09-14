import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const sampleData = [
        {
            name: "product 1",
            image: "product1/image/im1.jpg",
            category: "table",
            price: 10.2
        },
        {
            name: "product 2",
            image: "product2/image/im1.jpg",
            category: "chair",
            price: 8.2
        },
        {
            name: "product 3",
            image: "product1/image/im1.jpg",
            category: "chair",
            price: 9
        },
        {
            name: "product 4",
            image: "product1/image/im1.jpg",
            category: "table",
            price: 9.2
        },
        {
            name: "product 5",
            image: "product1/image/im1.jpg",
            category: "cahir",
            price: 100.2
        }
    ]
    console.log("Seeding database...");

    for (const data of sampleData) {
        const product = await prisma.product.create({
            data
        });
        console.log(`Created product with id: ${product.id}`);
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => prisma.$disconnect());