import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCarrito, type ProductoCarrito } from '../../store/carrito';
import SelectorCantidad from './SelectorCantidad';

interface Props {
  producto: ProductoCarrito;
  // Página de producto: selector de cantidad + botón grande
  conCantidad?: boolean;
}

export default function AgregarAlCarrito({ producto, conCantidad = false }: Props) {
  const agregar = useCarrito(s => s.agregar);
  const [cantidad, setCantidad] = useState(1);

  if (!conCantidad) {
    return (
      <button
        type="button"
        onClick={() => agregar(producto)}
        className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-3 py-2 rounded-full transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        Agregar
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SelectorCantidad
        tamano="lg"
        cantidad={cantidad}
        onDecrementar={() => setCantidad(c => Math.max(1, c - 1))}
        onIncrementar={() => setCantidad(c => c + 1)}
      />
      <button
        type="button"
        onClick={() => {
          agregar(producto, cantidad);
          setCantidad(1);
        }}
        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-full transition-colors shadow-lg shadow-primary/30"
      >
        <ShoppingCart className="w-5 h-5" />
        Agregar al carrito
      </button>
    </div>
  );
}
