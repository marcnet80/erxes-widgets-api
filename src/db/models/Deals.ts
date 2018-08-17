import { Model, model } from "mongoose";
import { dealSchema, IDeal, IStage, stageSchema } from "./definitions/deals";

interface IDealInput {
  name: string;
  stageId: string;
  companyIds?: string[];
  customerIds?: string[];
  description?: string;
  productsData?: any;
}

interface IStageModel extends Model<IStage> {}

interface IDealModel extends Model<IDeal> {
  createDeal(doc: IDealInput): IDeal;
}

class Deal {
  public static async createDeal(doc: IDealInput) {
    const { stageId } = doc;

    const stage = await DealStages.findOne({ _id: stageId });

    if (!stage) {
      throw new Error("Stage not found");
    }

    return Deals.create(doc);
  }
}

dealSchema.loadClass(Deal);

const Deals = model<IDeal, IDealModel>("deals", dealSchema);

const DealStages = model<IStage, IStageModel>("deal_stages", stageSchema);

export { Deals, DealStages };
