import { create } from 'zustand'

type State = {
  user: object
}

type Actions = {
  updateUser: (userData: object) => void
  reset: () => void
}

const initialState: State = {
  user: {},
}

const useUserStore_Monyaya = create<State & Actions>()((set) => ({
  ...initialState,
  updateUser: (userData : object) => {
    set({ user: userData })
  },
  reset: () => {
    set(initialState)
  },
}))

export default useUserStore_Monyaya