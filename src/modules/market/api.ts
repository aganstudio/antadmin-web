import { defHttp } from '/@/utils/http/axios';

enum Api {
  TinyurlAdd = '/v1/tinyurl/add',
}

/**
 * @description: TinyurlAdd api
 */
export function doTinyurlAdd(params: any) {
  return defHttp.post<any>(
    {
      url: Api.TinyurlAdd,
      params,
    },
    {
      isTransformResponse: false,
    },
  );
}
