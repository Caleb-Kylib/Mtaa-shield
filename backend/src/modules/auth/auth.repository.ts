import { prisma } from '../../prisma/client';
import type { OccupationType, Role } from '@prisma/client';

export interface CreateUserInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  county: string;
  occupation: OccupationType;
  role?: Role;
}

export const authRepository = {
  createUser: async (data: CreateUserInput) =>
    prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        county: data.county,
        occupation: data.occupation,
        role: data.role ?? 'USER',
      },
    }),

  findByEmail: async (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  findByPhone: async (phone: string) =>
    prisma.user.findUnique({ where: { phone } }),
};
