import { ShoppingCart } from 'lucide-react';
import { useCarrito, totalUnidades } from '../../store/carrito';

export default function CarritoBoton() {
  const unidades = useCarrito(s => totalUnidades(s.items));
  const abrir = useCarrito(s => s.abrir);

  return (
    <button
      type="button"
      onClick={abrir}
      aria-label={`Abrir carrito (${unidades} productos)`}
      className="relative flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold pl-3.5 pr-4 py-2 rounded-full shadow-md shadow-primary/30 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>Carrito</span>

      {/* Burbuja de notificación: key={unidades} la vuelve a montar para repetir el "pop" en cada cambio */}
      {unidades > 0 && (
        <span
          key={unidades}
          className="absolute -top-2 -right-2 min-w-6 h-6 px-1.5 bg-dark text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pop"
        >
          {unidades > 99 ? '99+' : unidades}
        </span>
      )}
    </button>
  );
}
