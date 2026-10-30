import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Producto } from '../data/todos-productos';

export type ProductoCarrito = Pick<Producto, 'slug' | 'nombre' | 'precio' | 'imagen'>;

export interface ItemCarrito extends ProductoCarrito {
  cantidad: number;
}

interface CarritoState {
  items: ItemCarrito[];
  abierto: boolean;
  agregar: (producto: ProductoCarrito, cantidad?: number) => void;
  incrementar: (slug: string) => void;
  decrementar: (slug: string) => void;
  eliminar: (slug: string) => void;
  vaciar: () => void;
  abrir: () => void;
  cerrar: () => void;
}

const cambiarCantidad = (items: ItemCarrito[], slug: string, delta: number) =>
  items.map(i => (i.slug === slug ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i));

export const useCarrito = create<CarritoState>()(
  persist(
    (set) => ({
      items: [],
      abierto: false,

      // Si el producto ya está en el carrito suma la cantidad; siempre abre el drawer
      agregar: (producto, cantidad = 1) =>
        set(state => {
          const existe = state.items.some(i => i.slug === producto.slug);
          const items = existe
            ? cambiarCantidad(state.items, producto.slug, cantidad)
            : [...state.items, { ...producto, cantidad }];
          return { items, abierto: true };
        }),

      incrementar: (slug) => set(state => ({ items: cambiarCantidad(state.items, slug, 1) })),
      decrementar: (slug) => set(state => ({ items: cambiarCantidad(state.items, slug, -1) })),
      eliminar: (slug) => set(state => ({ items: state.items.filter(i => i.slug !== slug) })),
      vaciar: () => set({ items: [] }),

      abrir: () => set({ abierto: true }),
      cerrar: () => set({ abierto: false }),
    }),
    {
      name: 'udd-carrito',
      storage: createJSONStorage(() => localStorage),
      // Solo los productos sobreviven a la recarga; el drawer siempre inicia cerrado
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const totalUnidades = (items: ItemCarrito[]) => items.reduce((t, i) => t + i.cantidad, 0);
export const subtotal = (items: ItemCarrito[]) => items.reduce((t, i) => t + i.precio * i.cantidad, 0);
