import { Minus, Plus } from 'lucide-react';

interface Props {
  cantidad: number;
  onIncrementar: () => void;
  onDecrementar: () => void;
  tamano?: 'sm' | 'lg';
}

export default function SelectorCantidad({ cantidad, onIncrementar, onDecrementar, tamano = 'sm' }: Props) {
  const boton = tamano === 'lg' ? 'w-11 h-11' : 'w-8 h-8';
  const icono = tamano === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const claseBoton = `${boton} flex items-center justify-center rounded-full text-gray-600 hover:text-primary hover:bg-primary-light transition-colors disabled:opacity-40 disabled:pointer-events-none`;

  return (
    <div className="inline-flex items-center rounded-full border border-gray-200 bg-white shrink-0">
      <button type="button" onClick={onDecrementar} disabled={cantidad <= 1} aria-label="Disminuir cantidad" className={claseBoton}>
        <Minus className={icono} />
      </button>
      <span className={`min-w-8 text-center font-semibold text-gray-800 ${tamano === 'lg' ? 'text-base' : 'text-sm'}`} aria-live="polite">
        {cantidad}
      </span>
      <button type="button" onClick={onIncrementar} aria-label="Aumentar cantidad" className={claseBoton}>
        <Plus className={icono} />
      </button>
    </div>
  );
}
