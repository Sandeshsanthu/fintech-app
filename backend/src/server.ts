import express from 'express';
import { processPayment } from './ledger';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// ROUTE 1: Check Balance
app.get('/balance/:userId', async (req, res) => {
  const wallet = await prisma.wallet.findUnique({ where: { userId: req.params.userId } });
  res.json({ balance: wallet?.balance });
});

// ROUTE 2: Pay
app.post('/pay', async (req, res) => {
  try {
    const { userId, amount, idempotencyKey } = req.body;
    const result = await processPayment(userId, amount, idempotencyKey);
    res.json({ message: "Success", newBalance: result.balance });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Fintech Server Live on Port 3000"));
