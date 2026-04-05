import apiClient from "@/lib/axios";
import type { BaseService, BaseServiceConfig, SelectOptions } from "../types";

export function createBaseService<
  TEntity,
  TCreateDto = Partial<TEntity>,
  TUpdateDto = Partial<TEntity>,
  TFilterParams = Record<string, unknown>,
>(
  config: BaseServiceConfig<TEntity, TCreateDto, TUpdateDto, TFilterParams>,
): BaseService<TEntity, TCreateDto, TUpdateDto, TFilterParams> {
  const axios = config.axios ?? apiClient;
  const endpoint = config.endpoint;
  return {
    getAll:
      config.getAll ??
      (async (params: TFilterParams) => {
        return axios.get<TEntity>(endpoint, {
          params,
        }) as unknown as Promise<TEntity>;
      }),
    getById:
      config.getById ??
      (async (id: string | number) => {
        return axios.get<TEntity>(
          `${endpoint}/${id}`,
        ) as unknown as Promise<TEntity>;
      }),
    create:
      config.create ??
      (async (data: TCreateDto) => {
        return axios.post<TEntity>(
          endpoint,
          data,
        ) as unknown as Promise<TEntity>;
      }),
    update:
      config.update ??
      (async (id: string | number, data: TUpdateDto) => {
        return axios.put<TEntity>(
          `${endpoint}/${id}`,
          data,
        ) as unknown as Promise<TEntity>;
      }),
    remove:
      config.remove ??
      (async (id: string | number) => await axios.delete(`${endpoint}/${id}`)),
    getSelectOptions:
      config.getSelectOptions ??
      (async () => {
        return axios.get<SelectOptions[]>(
          `${endpoint}/select`,
        ) as unknown as Promise<SelectOptions[]>;
      }),
  };
}
