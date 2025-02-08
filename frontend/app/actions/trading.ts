"use server";

import { z } from "zod";

const TradeSchema = z.object({
  userId: z.number(),
  stockId: z.number(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  // type: z.enum(["BUY", "SELL"]),
});

export async function buyShares(prevState: any, formData: FormData) {
  const validatedFields = TradeSchema.safeParse({
    userId: Number.parseInt(formData.get("userId") as string),
    stockId: Number.parseInt(formData.get("stockId") as string),
    quantity: Number.parseInt(formData.get("quantity") as string),
    price: Number.parseFloat(formData.get("price") as string),
    // type: "BUY",
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid input",
      success: false,
    };
  }

  // Simulate API call
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const { userId, stockId, quantity, price } = validatedFields.data;

  try {
    // Here you would make the actual API call with the ask price
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=buyStock`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          stock_id: stockId,
          quantity,
          current_price: price,
        }),
      }
    );

    const boughtStock = await response.json();

    if (boughtStock.status === "success") {
      console.log("boughtStock", boughtStock);

      return {
        message: boughtStock.message,
        success: true,
      };
    }
  } catch (error) {
    return {
      error: "Transaction failed",
      success: false,
    };
  }
}

export async function sellShares(prevState: any, formData: FormData) {
  const validatedFields = TradeSchema.safeParse({
    userId: Number.parseInt(formData.get("userId") as string),
    stockId: Number.parseInt(formData.get("stockId") as string),
    quantity: Number.parseInt(formData.get("quantity") as string),
    price: Number.parseFloat(formData.get("price") as string),
    // type: "SELL",
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid input",
      success: false,
    };
  }

  // Simulate API call
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const { userId, stockId, quantity, price } = validatedFields.data;

  try {
    // Here you would make the actual API call with the bid price
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=sellStock`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          stock_id: stockId,
          quantity,
          current_price: price,
        }),
      }
    );

    const soldStock = await response.json();
    console.log("soldStock", soldStock);

    if (soldStock.status === "success") {
      console.log("soldStock success", soldStock);

      return {
        message: soldStock.message,
        success: true,
      };
    }
  } catch (error) {
    return {
      error: "Transaction failed",
      success: false,
    };
  }
}
