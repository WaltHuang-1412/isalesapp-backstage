import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IGetAuthProfileResponse } from '@/types/api/auth'
import { getAuthProfileApi } from '@/utils/api/auth'
import { isObject } from 'lodash'

export interface IState {
  userProfile: IGetAuthProfileResponse | null
}

export const storeKey: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  state: {
    userProfile: null
  },
  getters: {},
  mutations: {
    SetUserProfile(state, value: IGetAuthProfileResponse | null) {
      state.userProfile = value
    }
  },
  actions: {
    getUserProfile: async (context) => {
      const data: IGetAuthProfileResponse = await getAuthProfileApi()
      if (isObject(data)) {
        context.commit('SetUserProfile', data)
      } else {
        context.commit('SetUserProfile', null)
      }
    }
  },
  modules: {}
})

export function useStore() {
  return baseUseStore(storeKey)
}
