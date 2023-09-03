import {
  Request,
  Response
} from 'express';
import { prismaClient } from '../../prisma';

export const createRoles = async (req: Request, res: Response) => {
  const { name } = req.body;

  const new_category = await prismaClient.role.create({
    data: {
      name: String(name).toLowerCase(),
    }
  });

  return res.json(new_category);

}

export const updateRoles = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { role_id } = req.query;

  const role_updated = await prismaClient.role.update({
    where: { id: Number(role_id) },
    data: {
      name,
    }
  });

  return res.json(role_updated);

}

export const deleteRoles = async (req: Request, res: Response) => {
  const { role_id } = req.query;

  const exists_role = await prismaClient.role.findFirst({
    where: { id: Number(role_id) }
  });

  if (!exists_role) throw new Error('A função selecionada não existe');

  const deleted_role = await prismaClient.role.delete({
    where: { id: Number(role_id) }
  });

  return res.json(deleted_role);

}

export const listRoles = async (req: Request, res: Response) => {
  const roles = await prismaClient.role.findMany();

  return res.json(roles);
}
