import { DatabaseModel } from "src/app/models/store-models/database.model"
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface TestConnectionState extends EntityState<DatabaseModel> {
    mongoDBCol: string[]
}

export const connectionAdapter = createEntityAdapter<DatabaseModel>({
})

export const initialConnectionState = connectionAdapter.getInitialState({
    mongoDBcol: []
})