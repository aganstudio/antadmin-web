import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  username: string;
  name: string;
  roleName: number;
  deptName: number;
  createTime: string;
  status: number;
}

export interface DeptListItem {
  deptId: string;
  sort: string;
  createTime: string;
  deptName: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  sort: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  perms: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  label: string;
  status: number;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListResultModel = BasicFetchResult<AccountListItem>;

export type DeptListResultModel = BasicFetchResult<DeptListItem>;

export type MenuListResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListResultModel = BasicFetchResult<RoleListItem>;

export type RoleListResultModel = RoleListItem[];
