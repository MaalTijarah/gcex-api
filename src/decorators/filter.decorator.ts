// @nestjs
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// @app
import { QueryOperator } from 'src/enums';
import { castQueryValuesToArrayConditionally } from 'src/utils/helpers';

// ----------------------------------------------------------------------------------------------------

const EXCLUDED_QUERY_PROPS = ['search', 'sort', 'page', 'limit', 'select'];

// ----------------------------------------------------------------------------------------------------

export const Filter = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const queryObj = { ...request.query };

    EXCLUDED_QUERY_PROPS.forEach((prop) => delete queryObj[prop]);

    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] === '') {
        delete queryObj[key];
      }
    });

    Object.entries(queryObj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        queryObj[key] = value.includes(',')
          ? { [QueryOperator.IN]: value }
          : { [QueryOperator.EQUALS]: value };
      }
    });

    return castQueryValuesToArrayConditionally(queryObj);
  },
);
