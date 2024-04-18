import { Test, TestingModule } from '@nestjs/testing';
import { PatientVitalSignService } from './patient-vital-sign.service';

describe('PatientVitalSignService', () => {
  let service: PatientVitalSignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientVitalSignService],
    }).compile();

    service = module.get<PatientVitalSignService>(PatientVitalSignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
