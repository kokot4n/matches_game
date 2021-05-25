import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

const MATCHES_NUM = 25;
const MAX_PICK_NUM = 3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  matches = MATCHES_NUM;
  playerMatches = 0;
  aiMatches = 0;
  takenMatches = 0;
  modeSwitched = false;


  onPickedNumChange(T: boolean){
      if(T && this.takenMatches<MAX_PICK_NUM && this.matches>0){
        this.playerMatches++;
        this.takenMatches++;
        this.matches--;
      } else if(!T && this.takenMatches>0){
        this.playerMatches--;
        this.takenMatches--;
        this.matches++;
      }
  }

  onConfirm(){
    if(this.takenMatches!=0){
      this.takenMatches=0;
      this.aiTurn();
      if(this.matches==0){
        this.winCheck();
      }
    }
  }

  aiTurn(){
    let counter: number;
    for (let i = 1; i <= MAX_PICK_NUM; i+=2) {
      if((this.matches-i)%4<=1 && (this.matches-i)>=0){
        counter=i;
      }
    }
    if((this.matches!=MATCHES_NUM || this.modeSwitched) && this.matches!=0){
      this.aiMatches += counter;
      this.matches -=counter;
    }
  }

  reload(){
    this.matches = MATCHES_NUM;
    this.aiMatches = this.playerMatches = 0;
    if(this.modeSwitched){
      this.aiTurn();
    }
  }

  winCheck(){
    if(this.playerMatches%2==0){
      if(confirm('You won!')){
        this.reload();
      }
    }else{
      if(confirm('You lost!')){
        this.reload();
      }
    }
  }

  switch(){
    this.modeSwitched = !this.modeSwitched;
    this.reload();
  }

  getMatches(num: number){
    return new Array(num);
  }
}
