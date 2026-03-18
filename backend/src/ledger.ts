import { prisma } from "./prisma";

export async function processPayment(userId: string, amount: number, key: string) {
  return await prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new Error("Wallet not found");

    if (Number(wallet.balance) < amount) throw new Error("Insufficient Funds");

    await tx.ledger.create({
      data: {
        walletId: wallet.id,
        amount: -amount,
        idempotencyKey: key,
        description: "Payment for services"
      }
    });

    const updatedWallet = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: { decrement: amount } }
    });

    return updatedWallet;
  });
}

