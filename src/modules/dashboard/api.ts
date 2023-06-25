import { UploadApiResult } from './model';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
const { uploadUrl = '' } = useGlobSetting();
enum Api {
  //admin
  PersonInfo = '/v2/admin/admin/page',
  WorkbenchStatistic = '/v2/admin/workbench/statistic',
  WorkbenchProject = '/v2/admin/workbench/project',
  WorkbenchNotice = '/v2/admin/workbench/notice',
}
//admin
export const getPersonInfo = () => defHttp.post<any>({ url: Api.PersonInfo });
export const getWorkbenchStatistic = () => defHttp.post<any>({ url: Api.WorkbenchStatistic });
export const getWorkbenchProject = () => defHttp.post<any>({ url: Api.WorkbenchProject });
export const getWorkbenchNotice = () => defHttp.post<any>({ url: Api.WorkbenchNotice });

// Upload interface
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
