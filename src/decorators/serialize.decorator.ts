// @nestjs
import { UseInterceptors } from '@nestjs/common';
// @app
import { Constructable } from 'src/interfaces/constructable.interface';
// local
import { SerializeInterceptor } from 'src/interceptors';

// ----------------------------------------------------------------------------------------------------

export function Serialize(dto: Constructable = class {}) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
