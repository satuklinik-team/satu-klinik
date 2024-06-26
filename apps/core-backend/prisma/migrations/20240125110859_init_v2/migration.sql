-- CreateEnum
CREATE TYPE "transactions_status" AS ENUM ('PENDING_PAYMENT', 'PAID', 'CANCELED') ;

-- CreateEnum
CREATE TYPE "TASK_STATUS" AS ENUM ('TODO', 'INPROGRESS', 'PENDING', 'CANCELED', 'REMOVED') ;

-- CreateEnum
CREATE TYPE "CLINICSPECIALIST" AS ENUM ('DENTAL', 'INTERNAL', 'OTHER') ;

-- CreateEnum
CREATE TYPE "CLINICTYPE" AS ENUM ('PRIMARY', 'SPECIALIST', 'MULTI', 'PET') ;

-- CreateEnum
CREATE TYPE "INTERVALUNIT" AS ENUM ('MONTH', 'YEAR') ;

-- CreateTable
CREATE TABLE "Patient" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "norm" TEXT NOT NULL,
    "nik" TEXT,
    "fullname" TEXT NOT NULL,
    "parentname" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "age" INTEGER,
    "sex" TEXT NOT NULL DEFAULT 'L',
    "type" TEXT DEFAULT 'human',
    "blood" TEXT,
    "birthAt" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "clinicsId" TEXT,
    "parentId" UUID,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient_medical_records" (
    "id" TEXT NOT NULL,
    "norm" TEXT NOT NULL,
    "visitAt" TIMESTAMP(3) NOT NULL,
    "visitLabel" TEXT,
    "queue" TEXT,
    "doctor" TEXT NOT NULL,
    "status" TEXT DEFAULT 'e1',
    "patientId" UUID,
    "poliId" TEXT,

    CONSTRAINT "Patient_medical_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient_vital_sign" (
    "id" SERIAL NOT NULL,
    "height" DECIMAL(65,30),
    "weight" DECIMAL(65,30),
    "temperature" DECIMAL(65,30) NOT NULL,
    "systole" INTEGER,
    "diastole" INTEGER,
    "pulse" INTEGER,
    "respiration" INTEGER,
    "saturation" INTEGER,
    "sugar" DECIMAL(65,30),
    "cholesterol" DECIMAL(65,30),
    "pain" TEXT,
    "allergic" TEXT,
    "visitAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "patient_medical_recordsId" TEXT,

    CONSTRAINT "Patient_vital_sign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient_assessment" (
    "id" SERIAL NOT NULL,
    "subjective" TEXT NOT NULL DEFAULT 'none',
    "objective" TEXT NOT NULL DEFAULT 'none',
    "assessment" TEXT NOT NULL DEFAULT 'none',
    "plan" TEXT NOT NULL DEFAULT 'none',
    "diagnose" TEXT NOT NULL DEFAULT 'none',
    "deletedAt" TIMESTAMP(3),
    "patient_medical_recordsId" TEXT,

    CONSTRAINT "Patient_assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient_assessment_on_anathomy" (
    "id" SERIAL NOT NULL,
    "part" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "patient_assessmentId" INTEGER,

    CONSTRAINT "Patient_assessment_on_anathomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient_prescription" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3),
    "medicine" TEXT NOT NULL,
    "type" TEXT,
    "usage" TEXT,
    "dosage" TEXT,
    "interval" TEXT,
    "quantity" DECIMAL(65,30) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "patient_medical_recordsId" TEXT,

    CONSTRAINT "Patient_prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor_Task" (
    "id" SERIAL NOT NULL,
    "doctorId" TEXT,
    "status" "TASK_STATUS" NOT NULL DEFAULT 'TODO',
    "url" TEXT,
    "lastViewAt" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doctor_Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pharmacy_Task" (
    "id" SERIAL NOT NULL,
    "norm" TEXT NOT NULL,
    "assessmentReffId" TEXT,
    "status" TEXT,
    "pharmacist" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "clinicsId" TEXT,

    CONSTRAINT "Pharmacy_Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poli" (
    "id" TEXT NOT NULL,
    "color" TEXT DEFAULT '#87CEEB',
    "counter" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL,
    "alias" TEXT DEFAULT 'A',
    "doctor" TEXT NOT NULL DEFAULT 'dr whoisname',
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "clinicsId" TEXT,

    CONSTRAINT "Poli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL,
    "color" TEXT DEFAULT '#87CEEB',
    "counter" INTEGER DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT 'A',
    "alias" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "usersId" UUID,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue_history" (
    "id" SERIAL NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "patientNik" TEXT,
    "patientName" TEXT,
    "queueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ticket" TEXT,
    "Clinic" TEXT,
    "Poli" TEXT,

    CONSTRAINT "Queue_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roles" TEXT NOT NULL DEFAULT 'ROLE_USER',
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT DEFAULT '/images/user.png',
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "token" TEXT,
    "email_verification_token" TEXT,
    "reset_password_token" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "clinicsId" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "authToken" TEXT NOT NULL,
    "usersId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "when" TIMESTAMP(3) NOT NULL,
    "forwhom" TEXT,
    "isRead" TEXT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "description" TEXT,
    "sourceType" TEXT,
    "source" TEXT,
    "clinicsId" TEXT,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT,
    "headerId" TEXT,
    "clinicsId" TEXT,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CLINICTYPE" NOT NULL DEFAULT 'PRIMARY',
    "specialist" "CLINICSPECIALIST" NOT NULL DEFAULT 'OTHER',
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "taxId" TEXT,
    "license" TEXT,
    "dueTo" TIMESTAMP(3),
    "photo" TEXT NOT NULL DEFAULT '/images/clinic.png',
    "accountsMemberId" UUID,

    CONSTRAINT "Clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memberships" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'IDR',
    "activeTo" TIMESTAMP(3) DEFAULT NOW() + interval '1 year',
    "days" INTEGER NOT NULL,

    CONSTRAINT "Memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MAPNotifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "body" JSONB,

    CONSTRAINT "MAPNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionSchedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interval" INTEGER NOT NULL DEFAULT 1,
    "interval_unit" TEXT NOT NULL DEFAULT 'month',
    "max_interval" INTEGER NOT NULL DEFAULT 12,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 day',
    "retry_interval" INTEGER NOT NULL DEFAULT 1,
    "retry_interval_unit" TEXT NOT NULL DEFAULT 'day',
    "retry_max_interval" INTEGER NOT NULL DEFAULT 3,
    "membershipsId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "payAt" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "startAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "interval_unit" "INTERVALUNIT" NOT NULL DEFAULT 'MONTH',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isSuspend" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'init',
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "accountsId" UUID,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usersId" UUID,
    "taxId" TEXT,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "verification" TEXT NOT NULL DEFAULT 'na',
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "membershipsId" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountsMember" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountsId" UUID NOT NULL,

    CONSTRAINT "AccountsMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "type" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "customerId" UUID,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "payment" INTEGER DEFAULT 0,
    "paymentType" TEXT NOT NULL DEFAULT 'cash',
    "changes" INTEGER DEFAULT 0,
    "discount" INTEGER DEFAULT 0,
    "total" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "clinicId" UUID,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL DEFAULT 0,
    "discount" INTEGER DEFAULT 0,
    "afterDiscount" INTEGER DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "ordersId" UUID NOT NULL,
    "productsId" UUID NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "clinicsId" TEXT NOT NULL,

    CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "photo1" TEXT,
    "photo2" TEXT,
    "photo3" TEXT,
    "photo4" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "suppliersId" UUID,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company" TEXT,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "clinicsId" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_medical_records" ADD CONSTRAINT "Patient_medical_records_poliId_fkey" FOREIGN KEY ("poliId") REFERENCES "Poli"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_medical_records" ADD CONSTRAINT "Patient_medical_records_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_vital_sign" ADD CONSTRAINT "Patient_vital_sign_patient_medical_recordsId_fkey" FOREIGN KEY ("patient_medical_recordsId") REFERENCES "Patient_medical_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_assessment" ADD CONSTRAINT "Patient_assessment_patient_medical_recordsId_fkey" FOREIGN KEY ("patient_medical_recordsId") REFERENCES "Patient_medical_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_assessment_on_anathomy" ADD CONSTRAINT "Patient_assessment_on_anathomy_patient_assessmentId_fkey" FOREIGN KEY ("patient_assessmentId") REFERENCES "Patient_assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_prescription" ADD CONSTRAINT "Patient_prescription_patient_medical_recordsId_fkey" FOREIGN KEY ("patient_medical_recordsId") REFERENCES "Patient_medical_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pharmacy_Task" ADD CONSTRAINT "Pharmacy_Task_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poli" ADD CONSTRAINT "Poli_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinics" ADD CONSTRAINT "Clinics_accountsMemberId_fkey" FOREIGN KEY ("accountsMemberId") REFERENCES "AccountsMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_membershipsId_fkey" FOREIGN KEY ("membershipsId") REFERENCES "Memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountsMember" ADD CONSTRAINT "AccountsMember_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_suppliersId_fkey" FOREIGN KEY ("suppliersId") REFERENCES "Suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
