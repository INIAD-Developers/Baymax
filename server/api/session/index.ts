import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: { id: string };
    resBody: { status: 'success' };
  };
  delete: {
    resBody: { status: 'success' };
  };
}>;
