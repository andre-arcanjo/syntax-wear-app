import { z } from 'zod';

export const checkoutSchema = z.object({
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, 'CEP deve ter 8 dígitos'),
  street: z.string().trim().min(1, 'Logradouro é obrigatório'),
  number: z.string().trim().min(1, 'Número é obrigatório'),
  complement: z.string().trim(),
  neighborhood: z.string().trim().min(1, 'Bairro é obrigatório'),
  city: z.string().trim().min(1, 'Cidade é obrigatória'),
  state: z
    .string()
    .trim()
    .length(2, 'UF deve ter 2 letras')
    .regex(/^[A-Za-z]{2}$/, 'UF deve conter apenas letras'),
});

export type ShippingAddress = z.infer<typeof checkoutSchema>;
