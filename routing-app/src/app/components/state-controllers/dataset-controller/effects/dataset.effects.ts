import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of } from "rxjs";
import { DatasetActions } from "../actions";

@Injectable()
export class DatasetEffects{
    constructor(private action$: Actions,){
                }

    loadSelectedDatasetIDInit$ = createEffect(() => 
        this.action$.pipe(
            ofType(DatasetActions.loadSelectedDatasetIDInit),
            map(result => {
                console.log(result)
                if (result.data != null || result.data != ""){
                    console.log("valid data")
                    return DatasetActions.loadSelectedDatasetIDSuccess({data: result.data})
                    }
                else {
                    console.log("invalid data")
                    return DatasetActions.loadSelectedDatasetIDFailed({error: result})
                }
            }),
            catchError((error) => of(DatasetActions.loadSelectedDatasetIDFailed({error: error})))
        ))
}