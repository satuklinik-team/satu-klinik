import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function seed() {
  try {
    const sqlFiles = ['ICD10.sql', 'ICD10CM.sql'];

    for (const file of sqlFiles) {
      const sqlFilePath = path.join(__dirname, file);
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
      await prisma.$executeRawUnsafe(sqlContent);
    }

    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
