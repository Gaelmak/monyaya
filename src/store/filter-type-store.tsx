import { create } from 'zustand';

type State = {
  filterType: string;
};

type Actions = {
  setFilterType: (filterType: State['filterType']) => void;
};

const initialState: State = {
  filterType: 'Tous',
};

const useFilterTypeStore = create<State & Actions>()((set) => ({
  ...initialState,
  setFilterType: (filterType) => {
    set({ filterType: filterType });
  },
}));

export default useFilterTypeStore;
