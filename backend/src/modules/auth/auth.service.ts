import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository';
import type { OccupationType, Role } from '@prisma/client';

export interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  county: string;
  occupation: OccupationType;
  role?: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

function signToken(user: { id: string; email: string; role: Role }) {
  const secret = process.env.JWT_SECRET || 'development-secret';
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, secret, { expiresIn: '7d' });
}

export const authService = {
  register: async (input: RegisterInput) => {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const phoneTaken = await authRepository.findByPhone(input.phone);
    if (phoneTaken) {
      throw new Error('Phone already registered');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await authRepository.createUser({
      ...input,
      password: hashedPassword,
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        county: user.county,
        occupation: user.occupation,
        role: user.role,
      },
      token,
    };
  },

  login: async (input: LoginInput) => {
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        county: user.county,
        occupation: user.occupation,
        role: user.role,
      },
      token,
    };
  },
};
