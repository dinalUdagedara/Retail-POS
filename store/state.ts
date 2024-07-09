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
  setSelectedItem: (newSelectedItem:Item) => void;
  setBilledItems: (newItem: Item) => void;

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
  ] as Item[],
  availableItems: products,
  selectedItem:[
      {
        id: 1,
        name: "Broken Nadu",
        size: "5kg",
        price: 1150.0,
        quantity: 3,
        imageURL: "/assets/hiru.jpg",
      }
  ],

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  setSelectedItem:(newItem) => set ({selectedItem:newItem as unknown as Item[]}),
  setBilledItems: (newItem) => set((state) => ({ billedItems: [...state.billedItems, newItem] })), // Add to billedItems

}));
