import { create } from "zustand";


interface BearState {
  bears: number;
  total: number;

  itemSelected: boolean;
  amountGiven: number;
  balanceGiven: number;
  balanceEntered: boolean;


  barcodeScanned: string;

  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;

  setItemSelected: (change: boolean) => void;
  setTotal: (newTotal: number) => void;
  setBalanceGiven: (newBalance: number) => void;
  setAmountGiven: (newGivenAmount: number) => void;
  setbarcode:(newBarcode:string)=>void;


}

export const barcodeStore = create<BearState>((set) => ({
  bears: 10,
  total: 0,

  // availableItems: products,
  availableItems: [],

  selectedItem: null,
  itemSelected: false,
  balanceGiven: 0,
  amountGiven: 0,
  balanceEntered: false,
  barcodeScanned:"1",
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),

  setItemSelected: (change) => set({ itemSelected: change }),
  setTotal: (newTotal) => set({ total: newTotal }),
  setBalanceGiven: (newBalance) => set({ balanceGiven: newBalance }),
  setAmountGiven: (newGivenAmount) => set({ amountGiven: newGivenAmount }),
  setbarcode: (newBarcode) => set({ barcodeScanned: newBarcode }),


}));
