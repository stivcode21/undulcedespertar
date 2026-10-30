const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
});

export const formatPrecio = (precio: number) => formatoCOP.format(precio);
