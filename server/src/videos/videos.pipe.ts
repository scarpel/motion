import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export function getThumbnailPipeBuilder({
  maxSize = 1000 * 1000 * 10,
  fileType = /(png|jpg|jpeg)$/,
}: Partial<{
  maxSize: number;
  fileType: string | RegExp;
}> = {}) {
  return new ParseFilePipeBuilder()
    .addMaxSizeValidator({ maxSize })
    .addFileTypeValidator({ fileType })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
}
