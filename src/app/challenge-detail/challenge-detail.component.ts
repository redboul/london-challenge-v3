import { AppStatusService } from "./../app-status.service";
import { Subscription, Observable } from 'rxjs';
import { ChallengeStorageService } from "./../challenge-storage.service";
import { ChallengesService } from "./../challenges.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { FulfilledChallengesService } from "./../fulfilled-challenges.service";
import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Challenge, challengeType } from "../challenge";
import { AngularFireUploadTask } from "@angular/fire/storage";
import { take, pull } from "lodash";
import { zip } from "rxjs";
import { filter } from "rxjs/operators";
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../root-store';
import { ChallengesStoreSelectors } from '../root-store/challenges-store';
import { FulfilledChallengesStoreSelectors } from '../root-store/fulfilled-challenges-store';
import { FulfilledChallenge } from '../fulfilled-challenge';

@Component({
  selector: "app-challenge-detail",
  templateUrl: "./challenge-detail.component.html",
  styleUrls: ["./challenge-detail.component.css"]
})
export class ChallengeDetailComponent implements OnInit {
  challenge$: Observable<Challenge>;
  fulfilledChallenge$: Observable<FulfilledChallenge>;
  answerToSubmit: string;
  challengeId: string;
  appStatusSubscription: Subscription;
  routeSubscription: Subscription;
  allChallengeSubscription: Subscription;
  ffChallengeSubscription: Subscription;
  uploading = false;
  errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(
      (map: ParamMap) => (this.challengeId = map.get("challengeId"))
    );
    this.challenge$ = this.store$.select(ChallengesStoreSelectors.selectChallengeById(this.challengeId));
    this.fulfilledChallenge$ = this.store$.select(FulfilledChallengesStoreSelectors.selectFulfilledChallengesByChallengeId(this.challengeId));
  }
  /*isTextChallenge() {
    return this.challenge && this.challenge.type === challengeType.text;
  }
  isMediaChallenge() {
    return this.challenge && this.challenge.type === challengeType.media;
  }
  isImageChallenge() {
    return this.challenge && this.challenge.type === challengeType.image;
  }
  isChallengeFulfilled() {
    return (
      !!this.fulfilledChallenge &&
      !this.challenge.multiple &&
      !!this.fulfilledChallenge.answers &&
      !!this.fulfilledChallenge.answers.length
    );
  }
  isAnswerLimitReached() {
    return (
      !!this.fulfilledChallenge &&
      !!this.fulfilledChallenge.answers &&
      !!this.fulfilledChallenge.answers.length &&
      (this.challenge.maxAnswers || 1) <= this.fulfilledChallenge.answers.length
    );
  }

  deleteAnswer(answerToRemove) {
    if (this.fulfilledChallenge && this.fulfilledChallenge.answers) {
      this.saveOrUpdateFulfilledChallenge({
        id: this.challenge.id,
        type: this.challenge.type,
        day: this.challenge.day,
        answers: pull(this.fulfilledChallenge.answers, answerToRemove)
      });
    }
  }

  submitAnswer() {
    this.saveOrUpdateFulfilledChallenge({
      id: this.challenge.id,
      type: this.challenge.type,
      day: this.challenge.day,
      answers:
        !this.fulfilledChallenge || !this.fulfilledChallenge.answers
          ? [this.answerToSubmit]
          : take(
              [...this.fulfilledChallenge.answers, this.answerToSubmit],
              this.challenge.maxAnswers || 1
            )
    });
  }

  saveOrUpdateFulfilledChallenge(ffChallenge: FulfilledChallenge) {
    this.fulfilledChallengesService.submitFulfillChallenge(ffChallenge);
  }
  openFileInput() {
    this.el.nativeElement.querySelector("#fileForAnswer").click();
  }
  getNumberOfAnswers(): number {
    return (
      (!!this.fulfilledChallenge &&
        !!this.fulfilledChallenge.answers &&
        this.fulfilledChallenge.answers.length) ||
      0
    );
  }
  submitFileForAnswer(event: { target: { files: FileList } }) {
    this.uploading = true;
    const uploadTasks: AngularFireUploadTask[] = take(
      Array.from(event.target.files),
      (this.challenge.maxAnswers || 1) - this.getNumberOfAnswers()
    )
    // TODO
      .filter(file => file.size < 20 * 1024 * 1024) as any
      //.map(file => this.challengeStorageService.addFile(file as File));
    Promise.all(uploadTasks as AngularFireUploadTask[])
      .then((taskResponses: UploadTaskSnapshot[]) => {
        this.fulfilledChallengesService.submitFulfillChallenge({
          id: this.challenge.id,
          day: this.challenge.day,
          type: this.challenge.type,
          answers: (
            (this.fulfilledChallenge && this.fulfilledChallenge.answers) ||
            []
          ).concat(taskResponses.map(taskResponse => taskResponse.ref.fullPath))
        });
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = `An error occurrued during upload.
          Please try later with a better connectivity.`;
      })
      .then(() => (this.uploading = false));
  }*/
}
