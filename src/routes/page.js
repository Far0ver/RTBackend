// router.ts
import { Router } from "express";

const router = Router(); // создали роутер

router.get("/:id", (req, res) => {
  // индекс в массиве - число, поэтому приводим к Number (не обязательно, но Typescript бы тебя не простил бро)
  const id = Number(req.params.id);

  res.send(`Это ${id} страница`);
  return;
});

router.get('', (req, res) => {
  res.send(`жизнь`);
  return;
})

export default router;