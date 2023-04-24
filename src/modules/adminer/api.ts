import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListResultModel,
  DeptListResultModel,
  AccountListResultModel,
  RolePageListResultModel,
  RoleListResultModel,
} from './model';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  //admin
  AccountList = '/v2/admin/admin/page',
  AdminAdd = '/v2/admin/admin/add',
  AdminDelete = '/v2/admin/admin/delete',
  AdminPassword = '/v2/admin/admin/password',
  AdminStatus = '/v2/admin/admin/status',

  // dept
  DeptList = '/v2/admin/dept/list',
  DeptAdd = '/v2/admin/dept/add',
  DeptDelete = '/v2/admin/dept/delete',
  //role
  RoleList = '/v2/admin/role/list',
  RoleMenuList = '/v2/admin/role/menulist',
  RolePage = '/v2/admin/role/page',
  RoleAdd = '/v2/admin/role/add',
  RoleUpdateStatus = '/v2/admin/role/simpleupdate',
  RoleDelete = '/v2/admin/role/delete',
  //menu
  MenuList = '/v2/admin/menu/list',
  MenuParentList = '/v2/admin/menu/selectlist',
  MenuAdd = '/v2/admin/menu/add',
  MenuDelete = '/v2/admin/menu/delete',
}
//admin
export const getAccountList = (params: AccountParams) =>
  defHttp.post<AccountListResultModel>({ url: Api.AccountList, params });
export const doneAdminAdd = (params?: any) =>
  defHttp.post<any>({ url: Api.AdminAdd, params }, { isTransformResponse: false });
export const doneAdminDelete = (params?: any) =>
  defHttp.post<any>({ url: Api.AdminDelete, params }, { isTransformResponse: false });
export const doneAdminPassword = (params?: any) =>
  defHttp.post<any>({ url: Api.AdminPassword, params }, { isTransformResponse: false });
export const doneAdminStatus = (params: any) =>
  defHttp.post({ url: Api.AdminStatus, params }, { isTransformResponse: false });
// dept
export const getDeptList = (params?: DeptListItem) =>
  defHttp.post<DeptListResultModel>({ url: Api.DeptList, params });
export const doneDeptAdd = (params?: any) =>
  defHttp.post<any>({ url: Api.DeptAdd, params }, { isTransformResponse: false });
export const doneDeptDelete = (params?: any) =>
  defHttp.post<any>({ url: Api.DeptDelete, params }, { isTransformResponse: false });

// menu
export const getMenuList = (params?: MenuParams) =>
  defHttp.post<MenuListResultModel>({ url: Api.MenuList, params });
export const getMenuParentList = (params?: MenuParams) =>
  defHttp.post<MenuListResultModel>({ url: Api.MenuParentList, params });
export const doneMenuAdd = (params?: any) =>
  defHttp.post<any>({ url: Api.MenuAdd, params }, { isTransformResponse: false });
export const doneMenuDelete = (params?: any) =>
  defHttp.post<any>({ url: Api.MenuDelete, params }, { isTransformResponse: false });
//role
export const getRolePage = (params?: RolePageParams) =>
  defHttp.post<RolePageListResultModel>({ url: Api.RolePage, params });
export const getRoleList = (params?: RoleParams) =>
  defHttp.post<RoleListResultModel>({ url: Api.RoleList, params });
export const getRoleMenuList = (params?: any) =>
  defHttp.post<any>({ url: Api.RoleMenuList, params });
export const doneRoleStatus = (params: any) =>
  defHttp.post({ url: Api.RoleUpdateStatus, params }, { isTransformResponse: false });
export const doneRoleAdd = (params: any) =>
  defHttp.post({ url: Api.RoleAdd, params }, { isTransformResponse: false });
export const doneRoleDelete = (params?: any) =>
  defHttp.post<any>({ url: Api.RoleDelete, params }, { isTransformResponse: false });
