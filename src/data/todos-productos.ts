import desayunos from './categorias/desayunos.json';
import anchetas from './categorias/anchetas.json';
import flores from './categorias/flores.json';
import frutas from './categorias/frutas.json';
import onces from './categorias/onces.json';
import corporativos from './categorias/corporativos.json';
import regalos from './categorias/regalos.json';

export interface Producto {
  slug: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  ocasiones: string[];
  temporadas: string[];
  destacado: boolean;
  categoria?: string;
}

export const todosLosProductos: Producto[] = [
  ...desayunos.map(p => ({ ...p, categoria: 'desayunos' })),
  ...anchetas.map(p => ({ ...p, categoria: 'anchetas' })),
  ...flores.map(p => ({ ...p, categoria: 'flores' })),
  ...frutas.map(p => ({ ...p, categoria: 'frutas' })),
  ...onces.map(p => ({ ...p, categoria: 'onces' })),
  ...corporativos.map(p => ({ ...p, categoria: 'corporativos' })),
  ...regalos.map(p => ({ ...p, categoria: 'regalos' })),
];

export const porCategoria: Record<string, Producto[]> = {
  desayunos: desayunos.map(p => ({ ...p, categoria: 'desayunos' })),
  anchetas:  anchetas.map(p => ({ ...p, categoria: 'anchetas' })),
  flores:    flores.map(p => ({ ...p, categoria: 'flores' })),
  frutas:    frutas.map(p => ({ ...p, categoria: 'frutas' })),
  onces:     onces.map(p => ({ ...p, categoria: 'onces' })),
  corporativos: corporativos.map(p => ({ ...p, categoria: 'corporativos' })),
  regalos:   regalos.map(p => ({ ...p, categoria: 'regalos' })),
};
