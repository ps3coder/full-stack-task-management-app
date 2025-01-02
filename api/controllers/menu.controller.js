import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMenuItem = async (req, res) => {
  const { name, description, price, category, availability } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  try {
    const newMenuItem = await prisma.menu.create({
      data: {
        name,
        description,
        category,
        price,
        availability,
      },
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create menu item" });
  } finally {
    await prisma.$disconnect();
  }
};
export const getMenu = async (req, res) => {
  const { category, availability } = req.body;
  //   for queries we are taking category and availability

  try {
    const menuItems = await prisma.menu.findMany({
      where: {
        ...(category && { category }),
        ...(availability && { availability: availability === "true" }),
      },
    });
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve menu items" });
  }
};

export const getMenuItems = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await prisma.menu.findUnique({
      where: { id },
    });
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve menu item" });
  }
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, availability } = req.body;
  try {
    const updatedMenuItem = await prisma.menu.update({
      where: { id },
      data: {
        name,
        description,
        category,
        price,
        availability,
      },
    });
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update menu item" });
  }
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.menu.delete({
      where: { id },
    });
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};
