import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const PRACTITIONER_ONLY_KEY = 'practitioner_only';
export const PractitionerOnly = () => SetMetadata(PRACTITIONER_ONLY_KEY, true);
