import type { AxiosInstance } from "axios";

export type UserRole = "admin" | "user";

export interface SelectOptions {
  id: string;
  name: string;
}
export interface BaseFilterConfig {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder: "ASC" | "DESC";
}

export interface ApiError {
  statusCode?: number;
  message: string;
  error?: string;
  timeStamp?: string;
  path?: string;
}

export interface BaseServiceConfig<
  TEntity,
  TCreateDto,
  TUpdateDto,
  TFilterParams,
> {
  endpoint: string;
  axios?: AxiosInstance;
  getAll?: (params: TFilterParams) => Promise<TEntity>;
  getById?: (id: string | number) => Promise<TEntity>;
  create?: (data: TCreateDto) => Promise<TEntity>;
  update?: (id: string | number, data: TUpdateDto) => Promise<TEntity>;
  remove?: (id: string | number) => Promise<void>;
  getSelectOptions?: () => Promise<SelectOptions[]>;
}
export interface BaseService<TEntity, TCreateDto, TUpdateDto, TFilterParams> {
  getAll: (params: TFilterParams) => Promise<TEntity>;
  getById: (id: string | number) => Promise<TEntity>;
  create: (data: TCreateDto) => Promise<TEntity>;
  update: (id: string | number, data: TUpdateDto) => Promise<TEntity>;
  remove: (id: string | number) => Promise<void>;
  getSelectOptions: () => Promise<SelectOptions[]>;
}
