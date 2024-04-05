import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(input: string): Promise<string> {
    const hashedInput = await bcrypt.hash(input, 10);
    return hashedInput;
  }

  async verify(hashedInput: string, rawInput: string): Promise<boolean> {
    const isVerified = await bcrypt.compare(rawInput, hashedInput);
    return isVerified;
  }
}
