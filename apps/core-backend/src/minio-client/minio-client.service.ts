import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import { BufferedFile } from './model/file.model';
import { ConfigService } from '@nestjs/config';
import { FileLargerThan4MBException } from 'src/exceptions/bad-request/file-larger-than-4mb-exception';

@Injectable()
export class MinioClientService {
  private logger: Logger = new Logger(MinioClientService.name);
  private baseBucket: string;

  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService,
  ) {
    this.baseBucket = this.configService.get<string>('minio.bucket');
  }

  public get client() {
    return this.minio.client;
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    if (!file.mimetype.startsWith('image')) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      throw new FileLargerThan4MBException();
    }

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const filename = hashedFileName + ext;
    const fileBuffer = file.buffer;

    try {
      await this.client.putObject(
        baseBucket,
        filename,
        fileBuffer,
        fileBuffer.length,
        metaData,
      );
      return {
        url: `${this.configService.get(
          'minio.public_endpoint',
        )}/${baseBucket}/${filename}`,
      };
    } catch (err) {
      this.logger.error('Error uploading file', err);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
  }

  public async delete(
    objectName: string,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      await this.client.removeObject(baseBucket, objectName);
    } catch (err) {
      this.logger.error('Error deleting file', err);
      throw new HttpException(
        'Oops, something wrong happened',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
