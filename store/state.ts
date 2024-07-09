import { create } from "zustand";

const products = [
  {
    id: 1,
    name: "Keeri Samba",
    size: "5kg",
    price: 1300.0,
    quantity: 2,
    imageURL: "/assets/hiru.jpg",
  },
  {
    id: 2,
    name: "Nadu",
    size: "5kg",
    price: 1100.0,
    quantity: 2,
    imageURL: "/assets/hiru.jpg",
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
}

interface BearState {
  bears: number;
  billedItems: Item[];
  availableItems: Item[];
  selectedItem: Item[];
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 10,
  billedItems: [
    {
      id: 1,
      name: "Keeri Samba",
      size: "5kg",
      price: 1300.0,
      quantity: 2,
      imageURL: "/assets/hiru.jpg",
    },
  ],
  availableItems: products,
  selectedItem:products,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
