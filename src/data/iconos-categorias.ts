import { ShoppingBasket, Building2, Coffee, Flower2, Apple, Cookie, Gift } from 'lucide-astro';

export const iconosCategoria: Record<string, typeof ShoppingBasket> = {
  anchetas:     ShoppingBasket,
  corporativos: Building2,
  desayunos:    Coffee,
  flores:       Flower2,
  frutas:       Apple,
  onces:        Cookie,
  regalos:      Gift,
};
