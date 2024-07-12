import { create } from "zustand";

const products = [
  {
    id: 1,
    name: "Keeri Samba",
    size: "5",
    price: 1300.0,
    quantity: 2,
    imageURL: "/assets/hiru.jpg",
    isWeighting:false,
  },
  {
    id: 2,
    name: "Nadu",
    size: "5",
    price: 1100.0,
    quantity: 2,
    imageURL: "/assets/hiru.jpg",
    isWeighting:true,
  },
];

// Define the type for the state
interface Item {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageURL: string;
  isWeighting:boolean;
}

interface BearState {
  bears: number;
  total:number;
  billedItems: Item[];
  availableItems: Item[];
  selectedItem: Item | null;
  itemSelected: boolean;
  amountGiven:number ;
  balanceGiven:number ;
  balanceEntered:boolean;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
  setSelectedItem: (newSelectedItem: Item) => void;
  setBilledItems: (newItem: Item) => void;
  setItemSelected: (change: boolean) => void;
  setTotal:(newTotal:number) => void;
  setBalanceGiven:(newBalance:number) => void;
  setAmountGiven:(newGivenAmount:number) => void;
  setBalanceEntered:(value:boolean) => void;
  removeBilledItem: (index: number) => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 10,
  total:0,
  billedItems: [] as Item[],
  availableItems: products,
  selectedItem: null,
  itemSelected: false,
  balanceGiven:0,
  amountGiven:0,
  balanceEntered:false,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  setSelectedItem: (newItem) =>
    set({ selectedItem: newItem as unknown as Item }),
  setBilledItems: (newItem) =>
    set((state) => ({ billedItems: [...state.billedItems, newItem] })), // Add to billedItems
  setItemSelected: (change) => set({ itemSelected: change }),
  setTotal:(newTotal) => set ({total:newTotal}),
  setBalanceGiven:(newBalance) => set ({balanceGiven:newBalance}),
  setAmountGiven:(newGivenAmount) => set ({amountGiven:newGivenAmount}),
  setBalanceEntered:(value) => set ({balanceEntered:value}),
  removeBilledItem: (index) =>
    set((state) => {
      const updatedBilledItems = [...state.billedItems];
      updatedBilledItems.splice(index, 1);
      return { billedItems: updatedBilledItems };
    }),

}));
