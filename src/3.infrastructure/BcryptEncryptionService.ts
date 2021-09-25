import bcrypt from "bcryptjs";

import type { EncryptionService } from "../2.application/EncryptionService";

export class BcryptEncryptionService implements EncryptionService {
  public async encrypt(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
