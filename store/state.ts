import { create } from "zustand";
// Define the type for the state
export interface Item {
  id: string;
  brandName: string;
  name: string;
  size: string;
  weight: number;
  price: number;
  quantity: number;
  imageURL: string;
  isWeighting: boolean;
  barCode:string;
}

interface BearState {
  bears: number;
  total: number;
  billedItems: Item[];
  availableItems: Item[];
  selectedItem: Item | null;
  itemSelected: boolean;
  amountGiven: number;
  balanceGiven: number;
  balanceEntered: boolean;
  barCode:string | null;
  isCameraActive:boolean;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
  setSelectedItem: (newSelectedItem: Item) => void;
  setBilledItems: (newItem: Item) => void;
  setItemSelected: (change: boolean) => void;
  setTotal: (newTotal: number) => void;
  setBalanceGiven: (newBalance: number) => void;
  setAmountGiven: (newGivenAmount: number) => void;
  setBalanceEntered: (value: boolean) => void;
  removeBilledItem: (index: number) => void;
  updateProducts: (items: Item[]) => void;
  setbarcode:(newBarCode: string | null) => void;
  setCameraState:(state: boolean)=>void;
}

export const useStore = create<BearState>((set) => ({
  bears: 10,
  total: 0,
  billedItems: [] as Item[],

  // availableItems: products,
  availableItems: [],

  selectedItem: null,
  itemSelected: false,
  balanceGiven: 0,
  amountGiven: 0,
  balanceEntered: false,
  barCode:null,
  isCameraActive:false,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  setSelectedItem: (newItem) =>
    set({ selectedItem: newItem as unknown as Item }),
  setBilledItems: (newItem) =>
    set((state) => ({ billedItems: [...state.billedItems, newItem] })), // Add to billedItems
  setItemSelected: (change) => set({ itemSelected: change }),
  setTotal: (newTotal) => set({ total: newTotal }),
  setBalanceGiven: (newBalance) => set({ balanceGiven: newBalance }),
  setAmountGiven: (newGivenAmount) => set({ amountGiven: newGivenAmount }),
  setBalanceEntered: (value) => set({ balanceEntered: value }),
  removeBilledItem: (index) =>
    set((state) => {
      const updatedBilledItems = [...state.billedItems];
      updatedBilledItems.splice(index, 1);
      return { billedItems: updatedBilledItems };
    }),
  updateProducts: (items) => set({ availableItems: items }),
  setbarcode: (newBarcode) => set({ barCode: newBarcode }),  
  setCameraState: (newState) => set({ isCameraActive: newState }),
}));
