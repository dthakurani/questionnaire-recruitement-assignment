import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto-js';
import { TAllConfigType } from '../config/config.type';

@Injectable()
export class CryptoService {
  private readonly cryptKey: string;

  constructor(private readonly configService: ConfigService<TAllConfigType>) {
    this.cryptKey = this.configService.getOrThrow('auth.cryptKey', {
      infer: true,
    });
  }

  encrypt(text: string): string {
    const encrypted = crypto.AES.encrypt(text, this.cryptKey).toString();
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    const decrypted = crypto.AES.decrypt(encryptedText, this.cryptKey).toString(
      crypto.enc.Utf8,
    );
    return decrypted;
  }
}
