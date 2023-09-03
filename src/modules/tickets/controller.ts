import { Request, Response } from 'express';
import { prismaClient } from '../../prisma';

enum Urgencies {
  "BAIXA" = "baixa",
  "MEDIA" = "media",
  "ALTA" = "alta",
  "EMERGENCIA" = "emergencia",
};

interface File {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export const createTicket = async (
  req: Request,
  res: Response
) => {

  const { title, description, category_id, status_id } = req.body;

  

}

export const addingAttachments = async (
  req: Request,
  res: Response
) => {
  const { ticket_id } = req.query;
  const files = req.files;

  if ((files as File[]).length == 0) throw new Error('Nenhum arquivo encontrado para fazer upload');

  let files_of_ticket: String[] = [];

  (files as File[]).map(file => {
    files_of_ticket.push(file.filename);
  });

  const files_of_ticket_string = JSON.stringify(files_of_ticket);

  const exists_ticket = await prismaClient.ticket.findFirst({
    where: { id: Number(ticket_id) },
  });

  if (!exists_ticket) throw new Error('Chamado não encontrado');

  const updated_ticket = await prismaClient.ticket.update({
    where: { id: Number(ticket_id) },
    data: {
      attachments: files_of_ticket_string
    }
  });

  return res.json(updated_ticket);

}


