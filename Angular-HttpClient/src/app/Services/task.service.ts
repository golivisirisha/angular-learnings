import { Injectable, inject } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpEventType,
} from "@angular/common/http";
import { Task } from "src/Models/Task";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  loggingService: LoggingService = inject(LoggingService);
  errorSubject = new Subject<HttpErrorResponse>();

  CreateTask(task: Task) {
    this.http
      .post<{ name: string }>(
        "https://angular-http-client-360ac-default-rtdb.firebaseio.com/tasks.json",
        task
      )
      .pipe(
        catchError((err) => {
          //write the logic to log errors.
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
        // this.fetchAllTasks();
      });
  }

  DeleteTask(id: string | undefined) {
    this.http
      .delete(
        "https://angular-http-client-360ac-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json"
      )
      .pipe(
        catchError((err) => {
          //write the logic to log errors.
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )

      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
        // this.fetchAllTasks();
      });
  }

  DeleteAllTask() {
    this.http
      .delete(
        "https://angular-http-client-360ac-default-rtdb.firebaseio.com/tasks.json",
        { observe: "events" }
      )
      .pipe(
        tap(
          (event) => {
            console.log(event);
            if (event.type === HttpEventType.Response) {
            }
          },
          catchError((err) => {
            //write the logic to log errors.
            const errorObj = {
              statusCode: err.status,
              errorMessage: err.message,
              dateTime: new Date(),
            };
            this.loggingService.logError(errorObj);

            return throwError(() => err);
          })
        )
      )

      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
        // this.fetchAllTasks();
      });
  }

  GetAlltasks() {
    let headers = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    headers = headers.set("content-type", "html/json");

    return this.http
      .get<{ [key: string]: Task }>(
        "https://angular-http-client-360ac-default-rtdb.firebaseio.com/tasks.json",
        { headers: headers, observe: "response" }
      )
      .pipe(
        map((response) => {
          //trasforming data
          let tasks = [];
          console.log(response);

          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }

          return tasks;
        }),
        catchError((err) => {
          //write the logic to log errors.
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      );
  }
  UpdateTask(id: string | undefined, data: Task) {
    this.http
      .put(
        "https://angular-http-client-360ac-default-rtdb.firebaseio.com/tasks" +
          id +
          ".json",
        data
      )
      .pipe(
        catchError((err) => {
          //write the logic to log errors.
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )
      .subscribe();
  }

  getTaskDetails(id: string | undefined) {
    return this.http
      .get(
        "https://angular-http-client-360ac-default-rtdb.firebaseio.com/tasks" +
          id +
          ".json"
      )
      .pipe(
        map((response) => {
          console.log(response);
          let task = {};
          task = { ...response, id: id };
          return task;
        })
      );
    // .subscribe((task)=>{
    //     console.log(task);
    // });
  }
}
