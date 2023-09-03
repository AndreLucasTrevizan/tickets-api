import {
  Request,
  Response
} from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { prismaClient } from '../../prisma';

interface IRoles {
  id: number;
  code: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (
  req: Request,
  res: Response
) => {
  const { name, email, password, role_id } = req.body;
  
  const users_exists = await prismaClient.user.findFirst({
    where: { email }
  });

  if (users_exists) throw new Error('Email já está sendo usado');

  const password_hash = await hash(password, 8);

  const default_role: IRoles | null = await prismaClient.role.findFirst({
    where: { name: 'default' }
  });

  if (!default_role) throw new Error('Função de usuário não encontrada');

  const new_user = await prismaClient.user.create({
    data: {
      avatar: 'default.png',
      name,
      email,
      password: password_hash,
      role_id: role_id ? role_id : default_role.id,
    },
    select: {
      id: true,
      avatar: true,
      code: true,
      name: true,
      email: true,
    }
  });

  return res.json(new_user);
};

export const userSignIn = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  const user_exists = await prismaClient.user.findFirst({
    where: { email },
    select: {
      code: true,
      password: true,
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!user_exists) throw new Error('Email ou senha inválidos');

  const passwords_matches = await compare(password, user_exists.password);

  if (!passwords_matches) throw new Error('Email ou senha inválidos');

  const token = jwt.sign({
    code: user_exists.code,
    role: user_exists.role.name
  }, String(process.env.JWT_SECRET));

  return res.json({ token });

};

export const listUsers = async (
  req: Request,
  res: Response
) => {
  const users = await prismaClient.user.findMany({
    select: {
      code: true,
      avatar: true,
      name: true,
      email: true,
      created_at: true,
      updated_at: true
    }
  });

  return res.json(users);

};

export const getUserProfile = async (
  req: Request,
  res: Response
) => {

  const user = await prismaClient.user.findFirst({
    where: { code: req.user.code },
    select: {
      id: true,
      code: true,
      avatar: true,
      name: true,
      email: true,
      role: {
        select: {
          id: true,
          name: true
        }
      },
      created_at: true,
      updated_at: true
    }
  });

  return res.json(user);

};

export const updateUserAvatar = async (
  req: Request,
  res: Response
) => {
  const avatar = req.file;

  if (!avatar) throw new Error('Preencha o campo avatar');

  const user = await prismaClient.user.findFirst({
    where: { code: req.user.code },
  });

  if (!user) throw new Error('Usuário não encontrado');

  if (user.avatar !== 'default.png' && user.avatar !== '') {
    fs.unlink(`${__dirname}/../../uploads/avatars/${user.avatar}`, (err) => {
      if (err) throw new Error('Erro ao deletar avatar, ' + err.message);
    
      console.log(`Avatar ${user.avatar} deletado`);
    });
  }

  const user_updated = await prismaClient.user.update({
    where: { code: req.user.code },
    data: {
      avatar: avatar.filename,
    },
    select: {
      code: true,
      avatar: true,
      name: true,
      email: true,
      role: {
        select: {
          id: true,
          name: true,
        }
      },
      created_at: true,
      updated_at: true
    }
  });

  return res.json(user_updated);
};


