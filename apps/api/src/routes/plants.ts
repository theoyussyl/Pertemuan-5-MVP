import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ValidateRequiredText } from "../lib/validation";

export const PlantRouter = Router();

PlantRouter.get("/:Id", async (req, res) => {
  const Plant = await prisma.plant.findUnique({
    where: { Id: Number(req.params.Id) },
    include: { Garden: true },
  });
  if (!Plant) return res.status(404).json({ Message: "Tanaman tidak ditemukan" });
  res.json(Plant);
});

PlantRouter.put("/:Id", async (req, res) => {
  const { Name, Species, PlantedDate } = req.body;
  const ValidationError = ValidateRequiredText(Name, "Nama tanaman");
  if (ValidationError) return res.status(400).json({ Message: ValidationError });
  const Plant = await prisma.plant.update({
    where: { Id: Number(req.params.Id) },
    data: { Name, Species, PlantedDate: PlantedDate ? new Date(PlantedDate) : null },
  });
  res.json(Plant);
});

PlantRouter.delete("/:Id", async (req, res) => {
  await prisma.plant.delete({ where: { Id: Number(req.params.Id) } });
  res.status(204).send();
});
