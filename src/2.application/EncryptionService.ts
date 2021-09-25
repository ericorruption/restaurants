export interface EncryptionService {
  encrypt(data: string): Promise<string>;
}
