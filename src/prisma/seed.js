import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const sampleData = [
        {
            name: "Chair 1",
            image: "chair_1.jpg",
            category: "chair",
            price: 1000,
            desc: "Very good and comfy chair"
        },
        {
            name: "Chair 2",
            image: "chair_2.jpg",
            category: "chair",
            price: 1000,
            desc: "Very good and comfy chair"
        },
        {
            name: "Sofa",
            image: "sofa.png",
            category: "sofa",
            price: 1000,
            desc: "Royal size sofa with best fit"
        },
        {
            name: "Table 1",
            image: "table_1.png",
            category: "table",
            price: 1000,
            desc: "Very good table for study and do work"
        },
        {
            name: "Table 2",
            image: "table_2.png",
            category: "table",
            price: 1000,
            desc: "Very good table for study"
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