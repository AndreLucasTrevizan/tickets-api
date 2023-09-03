import {
  Request,
  Response
} from 'express';
import { prismaClient } from '../../prisma';

export const createStatus = async (req: Request, res: Response) => {
  const { name } = req.body;

  const new_status = await prismaClient.status.create({
    data: {
      name: String(name).toLowerCase(),
    }
  });

  return res.json(new_status);

}

export const updateStatus = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { status_id } = req.query;

  const status_updated = await prismaClient.status.update({
    where: { id: Number(status_id) },
    data: {
      name: String(name).toLowerCase(),
    }
  });

  return res.json(status_updated);

}

export const deleteStatus = async (req: Request, res: Response) => {
  const { status_id } = req.query;

  const exists_status = await prismaClient.status.findFirst({
    where: { id: Number(status_id) }
  });

  if (!exists_status) throw new Error('O status selecionado não existe');

  const deleted_status = await prismaClient.status.delete({
    where: { id: Number(status_id) }
  });

  return res.json(deleted_status);

}

export const listStatus = async (req: Request, res: Response) => {
  const status = await prismaClient.status.findMany();

  return res.json(status);
}
