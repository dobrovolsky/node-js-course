import express, { Response } from "express";

import { groupID } from "../types";
import { IGroup } from "../models/interfaces";
import { NotFoundError } from "../../shared/exceptions";
import { groupService } from "../services/groupService";
import { authenticateToken } from "../../auth/middleware";

async function getOr404(id: groupID, res: Response): Promise<IGroup | null> {
  try {
    return await groupService.getByID(id);
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(404);
      res.end();
      return null;
    }
    throw e;
  }
}

const groupRouter = express.Router();

groupRouter.use(authenticateToken);

groupRouter.get("/", async (req, res) => {
  const userData = {
    limit: req.query.limit as string,
  };

  const parsedLimit = parseInt(userData.limit);

  let limit = 0;
  if (parsedLimit) {
    limit = parsedLimit;
  }

  const entities = await groupService.getAll(limit);
  res.json(entities);
});

groupRouter.post("/", async (req, res) => {
  const userData = req.body;

  const entity = await groupService.create(userData.name, userData.permissions);
  res.json(entity);
});

groupRouter.get("/:id", async (req, res) => {
  const userData = req.params;
  const entity = await getOr404(userData.id, res);
  if (!entity) {
    return;
  }

  res.json(entity);
});

groupRouter.delete("/:id", async (req, res) => {
  const userData = req.params;

  const entity = await getOr404(userData.id, res);
  if (!entity) {
    return;
  }

  await groupService.delete(entity);
  res.status(204).end();
});

groupRouter.patch("/:id", async (req, res) => {
  const params = req.params;
  const userData = req.body;

  const entity = await getOr404(params.id, res);
  if (!entity) {
    return;
  }

  const newEntity = Object.assign(entity, userData);
  await groupService.update(newEntity);
  res.json(newEntity);
});

groupRouter.post("/:id", async (req, res) => {
  const params = req.params;
  const userData = req.body;
  const entity = await getOr404(params.id, res);
  if (!entity) {
    return;
  }
  await groupService.addUsersToGroup(params.id, userData.users);
  res.json(entity);
});

export default groupRouter;
