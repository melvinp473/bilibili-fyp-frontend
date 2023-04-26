import { DatabaseModel } from "src/app/models/store-models/database.model"
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface DBConnectionState extends EntityState<DatabaseModel> {
    mongoDBCol: string
}

export const connectionAdapter = createEntityAdapter<DatabaseModel>({
    selectId: model => model.data
})

export const initialConnectionState = connectionAdapter.getInitialState({
    mongoDBCol: ""
})