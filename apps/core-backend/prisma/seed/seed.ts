import { PrismaClient, Role } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    const sqlFiles = ['ICD10.sql', 'ICD9CM.sql'];

    for (const file of sqlFiles) {
      const sqlFilePath = path.join(__dirname, file);
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
      await prisma.$executeRawUnsafe(sqlContent);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.SATUKLINIK_ADMIN_PASSWORD,
      10,
    );

    await prisma.users.create({
      data: {
        email: process.env.SATUKLINIK_ADMIN_EMAIL,
        password: hashedPassword,
        roles: Role.SATUKLINIKADMIN,
      },
    });

    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
