import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { TestConnectionState } from "../states";

import { TestConnectionActions } from "../actions";
import { catchError, concatMap, map, of } from "rxjs";
import { TestConnectionService } from "src/app/services/test-connection-services";
import { DatabaseModel } from "src/app/models/store-models/database.model";


export class TestConnectionEffects{
    constructor(private action$: Actions,
                private store: Store<TestConnectionState>,
                private testConnectionService: TestConnectionService){
                }

    insertNewDataInit$ = createEffect(() => 
        this.action$.pipe(
            ofType(TestConnectionActions.insertNewDataInit),
            concatMap(action => {
                return this.testConnectionService.sendTest(action.data)
                .pipe(
                    map(result => {
                        if (result != null){
                            return TestConnectionActions.insertNewDataSuccess({data: result})
                        }
                        else {
                            return TestConnectionActions.insertNewDataFailed({error: result})
                        }
                    }),
                    catchError((error) => of(TestConnectionActions.insertNewDataFailed({error: error})))
                )
            })
        ))
}