import { BaseConditionRHS } from "./BaseConditionsRHS/BaseConditionRHS";
import { Expr } from "./Expr";
import { TrackObject } from "../../../API/fetchTracks";
// TODO: Determine if we should relax case-sensitivity for equals and in conditions
class BaseCondition extends Expr {
  keyword: string;
  rhs: BaseConditionRHS;
  constructor(keyword: string, rhs: BaseConditionRHS) {
    super();
    this.keyword = keyword;
    this.rhs = rhs;
  }
  evaluate(track: TrackObject): boolean {
    return this.rhs.evaluate(this.keyword, track);
  }
}

export default BaseCondition;