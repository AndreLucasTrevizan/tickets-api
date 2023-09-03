import {
  Request,
  Response
} from 'express';
import { prismaClient } from '../../prisma';

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const new_category = await prismaClient.category.create({
    data: {
      name: String(name).toLowerCase(),
    }
  });

  return res.json(new_category);

}

export const updateCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { category_id } = req.query;

  const category_updated = await prismaClient.category.update({
    where: { id: Number(category_id) },
    data: {
      name: String(name).toLowerCase(),
    }
  });

  return res.json(category_updated);

}

export const deleteCategory = async (req: Request, res: Response) => {
  const { category_id } = req.query;

  const exists_category = await prismaClient.category.findFirst({
    where: { id: Number(category_id) }
  });

  if (!exists_category) throw new Error('A categoria selecionada não existe');

  const deleted_category = await prismaClient.category.delete({
    where: { id: Number(category_id) }
  });

  return res.json(deleted_category);

}

export const listCategories = async (req: Request, res: Response) => {
  const categories = await prismaClient.category.findMany();

  return res.json(categories);
}
