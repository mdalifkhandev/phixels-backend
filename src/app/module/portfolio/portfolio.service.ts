import { TPortfolio } from "./portfolio.interface";
import { PortfolioModel } from "./portfolio.model";

const createPortfolioIntoDB = async (payload: TPortfolio) => {
  const result = await PortfolioModel.create(payload);
  return result;
};

const getAllPortfoliosFromDB = async (query: Record<string, unknown> = {}) => {
  const filter: Record<string, any> = {};
  if (query.all !== "true") {
    filter.isActive = true;
  }
  const result = await PortfolioModel.find(filter).sort({ sortOrder: 1 });
  return result;
};

const getSinglePortfolioFromDB = async (id: string) => {
  const result = await PortfolioModel.findById(id);
  return result;
};

const updatePortfolioInDB = async (
  id: string,
  payload: Partial<TPortfolio>,
) => {
  const result = await PortfolioModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deletePortfolioFromDB = async (id: string) => {
  const result = await PortfolioModel.findByIdAndDelete(id);
  return result;
};

const reorderPortfolioInDB = async (orderedIds: string[]) => {
  const bulkOps = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id as any },
      update: { sortOrder: index },
    },
  }));

  await PortfolioModel.bulkWrite(bulkOps as any);
  return await PortfolioModel.find({ _id: { $in: orderedIds } }).sort({
    sortOrder: 1,
  });
};

export const PortfolioServices = {
  createPortfolioIntoDB,
  getAllPortfoliosFromDB,
  getSinglePortfolioFromDB,
  updatePortfolioInDB,
  deletePortfolioFromDB,
  reorderPortfolioInDB,
};
