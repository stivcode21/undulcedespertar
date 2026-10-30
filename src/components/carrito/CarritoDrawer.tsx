import { useEffect, useRef } from 'react';
import { ShoppingCart, Trash2, X, CreditCard } from 'lucide-react';
import { useCarrito, totalUnidades, subtotal } from '../../store/carrito';
import { formatPrecio } from '../../lib/formato';
import SelectorCantidad from './SelectorCantidad';
import WhatsappIcon from '../icons/WhatsappIcon';

export default function CarritoDrawer() {
  const items = useCarrito(s => s.items);
  const abierto = useCarrito(s => s.abierto);
  const cerrar = useCarrito(s => s.cerrar);
  const incrementar = useCarrito(s => s.incrementar);
  const decrementar = useCarrito(s => s.decrementar);
  const eliminar = useCarrito(s => s.eliminar);
  const botonCerrar = useRef<HTMLButtonElement>(null);

  // Mientras está abierto: bloquea el scroll del fondo, cierra con Escape y maneja el foco
  useEffect(() => {
    if (!abierto) return;

    const { body, documentElement } = document;
    const focoPrevio = document.activeElement as HTMLElement | null;
    const anchoScrollbar = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    body.style.paddingRight = `${anchoScrollbar}px`;
    botonCerrar.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
      window.removeEventListener('keydown', onKeyDown);
      focoPrevio?.focus();
    };
  }, [abierto, cerrar]);

  const unidades = totalUnidades(items);

  return (
    <div className={`fixed inset-0 z-[60] ${abierto ? '' : 'pointer-events-none'}`} inert={!abierto}>
      {/* Overlay: click fuera cierra */}
      <div
        onClick={cerrar}
        className={`absolute inset-0 bg-dark/50 backdrop-blur-[2px] transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Panel: entra desde la derecha y sale hacia la derecha */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="carrito-titulo"
        className={`absolute inset-y-0 right-0 flex h-dvh w-[88%] max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${abierto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 id="carrito-titulo" className="font-bold text-lg text-gray-900">Tu carrito</h2>
            {unidades > 0 && (
              <span className="bg-primary-light text-primary text-xs font-semibold px-2 py-0.5 rounded-full">{unidades}</span>
            )}
          </div>
          <button
            ref={botonCerrar}
            type="button"
            onClick={cerrar}
            aria-label="Cerrar carrito"
            className="p-2 -mr-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Lista con scroll propio: header y footer siempre visibles */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <p className="font-semibold text-gray-800">Tu carrito está vacío</p>
              <p className="text-sm text-gray-500 max-w-60">Agrega desayunos, anchetas o regalos para empezar.</p>
              <a
                href="/categorias/desayunos"
                onClick={cerrar}
                className="mt-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
              >
                Ver productos
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map(item => (
                <li key={item.slug} className="flex gap-3 py-4">
                  <a href={`/producto/${item.slug}`} className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-primary-light">
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" loading="lazy" />
                  </a>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <a href={`/producto/${item.slug}`} className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-primary transition-colors">
                        {item.nombre}
                      </a>
                      <button
                        type="button"
                        onClick={() => eliminar(item.slug)}
                        aria-label={`Eliminar ${item.nombre}`}
                        className="p-1.5 -mr-1.5 -mt-1 rounded-full text-gray-400 hover:text-primary hover:bg-primary-light transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatPrecio(item.precio)} c/u</p>

                    <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                      <SelectorCantidad
                        cantidad={item.cantidad}
                        onIncrementar={() => incrementar(item.slug)}
                        onDecrementar={() => decrementar(item.slug)}
                      />
                      <span className="font-bold text-primary text-sm">{formatPrecio(item.precio * item.cantidad)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-gray-100 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">{formatPrecio(subtotal(items))}</span>
            </div>

            {/* Fase 3: integración con Wompi */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Pagar en línea
            </button>

            {/* Fase 2: redirigir a WhatsApp con los productos seleccionados */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-full transition-colors"
            >
              <WhatsappIcon className="w-5 h-5" />
              Pagar por WhatsApp
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
