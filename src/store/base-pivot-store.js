/**
 * Created by Fernando Torres on 13/12/2017.
 */
import BaseStore from './base-store'

export default class BasePivotStore extends BaseStore {
  constructor (model, relationModel) {
    super(model)
    this.state.relationModel = relationModel
  }
}
