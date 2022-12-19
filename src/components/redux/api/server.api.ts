import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userRegister } from '../../interfaces/IRequest';

import {IBrandsByType, IToken, IType, DeviceResponce, IBasketDevice, IDevice} from '../../interfaces/IResponse'


export const serverApi = createApi({
    reducerPath: 'serverApi',
    tagTypes:['DevicesBusket','Devices'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://onlinestoreserver-production.up.railway.app/api/',
        prepareHeaders:(headers,{getState}):any=>{
            const token = localStorage.getItem('token'); 
            headers.set('authorization',token ? `Bearer ${token}` : '')
            return headers
        } 
    }),

    endpoints: (build) => ({
      checkAuth:build.query<IToken,string>({

        query: () => ({
          url:`user/auth`,
          
       }),
      }),

      getBrands:build.query<IBrandsByType[],any>({
        query: () => ({
          url:`brand`,
       })
      }),

      getBrandsByType:build.query<IBrandsByType[],number>({
        query: (id) => ({
          url:`typebrand/${id}`,
       })
      }),

      AddBrandTypeConnection:build.mutation<any,any>({
        query:(body)=>({
            url:'typebrand',
            method:'POST',
            body
        })
      }),

      userRegister: build.mutation<any,any>({
        query: (body) => ({
            url:"user/registration",
            method:'POST',
            body,
        })
      }),

      userLogin:build.mutation<any,any>({
        query:(body)=>({
            url:'user/login',
            method:'POST',
            body
        })
      }),
      
      AddType:build.mutation<any,any>({
        query:(body)=>({
            url:'type',
            method:'POST',
            body
        })
      }),
      
      AddBrand:build.mutation<any,any>({
        query:(body)=>({
            url:'brand',
            method:'POST',
            body
        })
      }),

      changeDevice:build.mutation<any,any>({
        query:({id,body})=>({
            url:`device/${id}`,
            method:'PUT',
            body
        }),
        invalidatesTags:[{type:'Devices',id:'LIST'}]
      }),

      getTypes:build.query<IType[],any>({
        query:()=>({
            url:'type',
        })
      }),

      getOneDevice:build.query<IDevice,any>({
        query:(id)=>({
            url:`device/${id}`,
        })
      }),

      getDevicesByName:build.query<IDevice,any>({
        query:(name)=>({
            url:`device/names/${name}`,
        })
      }),

      getBasket:build.query<IBasketDevice[],number>({
        query:(id)=>({
            url:`basket/${id}`,
        }),
        
        providesTags: (result:any, error, arg) =>
        result
          ? [{type:'DevicesBusket',id:'LIST'},
            ...result.map(({ id }:any) => ({ type: 'DevicesBusket' as const, id })), 'DevicesBusket'
          ]
          : [{type:'DevicesBusket',id:'LIST'}],
      }),

      getDevices:build.query<DeviceResponce,any>({
        query:({type,brand,sort})=>({
            url:'device',
            params:{
              sort,
              typeId:type,
              brandId:brand,
            },
            
        }),
        providesTags: (result:any, error, arg) =>
        result
          ? [{type:'Devices',id:'LIST'},
            ...result.rows.map(({ id }:any) => ({ type: 'Devices' as const, id })),
          ]
          : [{type:'Devices',id:'LIST'}],
      }),
      

      addDevice: build.mutation<any, any>({
        query: (body) => ({
            url:"device",
            method:'POST',
            body,
        }),
        invalidatesTags:[{type:'Devices',id:'LIST'}]
        }),
      

      addBucketDevice: build.mutation<void, any>({
        query: (body) => ({
            url:"basket",
            method:'POST',
            body,
        }),

        invalidatesTags:[{type:'DevicesBusket'}]
      }),
      
      deleteDevice: build.mutation<void, any>({
        query: (id) => ({
            url:`device/${id}`,
            method:'DELETE'
        }),

        invalidatesTags:[{type:'Devices',id:'LIST'}]
      }),

      deleteDeviceFromBasket: build.mutation<void, any>({
        query: ({basketId,body}) => ({
            url:`basket/${basketId}`,
            method:'DELETE',
            body
        }),

        invalidatesTags:[{type:'DevicesBusket',id:'LIST'}]
      }),
    })
  })

  export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useCheckAuthQuery,
    useGetTypesQuery,
    useGetDevicesQuery,
    useAddBucketDeviceMutation,
    useGetBasketQuery,
    useGetOneDeviceQuery,
    useGetBrandsByTypeQuery,
    useAddDeviceMutation,
    useAddTypeMutation,
    useAddBrandMutation,
    useDeleteDeviceMutation,
    useGetDevicesByNameQuery,
    useGetBrandsQuery,
    useAddBrandTypeConnectionMutation,
    useChangeDeviceMutation,
    useDeleteDeviceFromBasketMutation,
  } = serverApi

