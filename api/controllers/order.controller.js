import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    if (
      !userId ||
      !Array.isArray(items) ||
      items.length === 0 ||
      totalAmount <= 0
    ) {
      return res.status(400).json({
        error:
          "Invalid input. Ensure userId, items, and totalAmount are valid and provided.",
      });
    }
    const order = await prisma.order.create({
      data: {
        userId,
        items,
        totalAmount,
        status: "Pending",
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error while creating order" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve order" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    // if (!orders) {
    //   return res.status(404).json({ error: "No Orders found" });
    // }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  } finally {
    await prisma.$disconnect();
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Completed", "Canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid order status" });
    }
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order status" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id },
    });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete order status" });
  } finally {
    await prisma.$disconnect();
  }
};
