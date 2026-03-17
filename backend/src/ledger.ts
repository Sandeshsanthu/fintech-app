import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function processPayment(userId: string, amount: number, key: string) {
  // Use a Transaction to ensure "All or Nothing"
  return await prisma.$transaction(async (tx) => {
    
    // 1. Get Wallet
    const wallet = await tx.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new Error("Wallet not found");

    // 2. Check Funds
    if (Number(wallet.balance) < amount) throw new Error("Insufficient Funds");

    // 3. Create Ledger Entry (The "Receipt")
    await tx.ledger.create({
      data: {
        walletId: wallet.id,
        amount: -amount,
        idempotencyKey: key, // If this key exists, DB will throw error here
        description: "Payment for services"
      }
    });

    // 4. Update Wallet Balance
    const updatedWallet = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: { decrement: amount } }
    });

    return updatedWallet;
  });
}
