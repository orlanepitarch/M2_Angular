import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

type FCT_FILTER_ITEMS = (item : TodoItemData) => boolean;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class TodoListComponent implements OnInit {

  filterAll: FCT_FILTER_ITEMS = () => true;
  filterDone: FCT_FILTER_ITEMS = (item)=>item.isDone;
  filterUnDone: FCT_FILTER_ITEMS = (item)=>!item.isDone;
  currentFilter = this.filterAll;
  
  faTrashAlt = faTrashAlt;

  getFilteredItems():TodoItemData[]{
    return this.data ? this.data.items.filter(this.currentFilter) : [];
  }

  @Input() private data: TodoListData;

  @ViewChild("newTextInputTitre", {static:false}) private inputTitre:ElementRef;

  private titre: string;
  private _voirEditTitre: boolean = false;
  
  get voirEditTitre(): boolean {
    return this._voirEditTitre;
  }
  set voirEditTitre(e:boolean) {
    this._voirEditTitre = e;
    requestAnimationFrame(()=>this.inputTitre.nativeElement.focus());
  }
  constructor(private todoService: TodoService) { 
    todoService.getTodoListDataObserver().subscribe(tdl => this.data = tdl);
    this.titre = this.data.label;
  }

  ngOnInit() {
  }

  get title(): string {
    return this.data ? this.data.label : '';
  } 

  set title(lab:string){
    this.todoService.setTitle(lab);
    this._voirEditTitre=false;
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  appendItem(label: string) {
    this.todoService.appendItems({label, isDone:false});
  }

  clearCompletedToDos() {
    this.todoService.removeItems(...this.items.filter(this.filterDone));
  }

  isAllDone(): boolean {
    return this.items.every(it=>it.isDone);
  }

  toggleAllDone() {
    const done=!this.isAllDone();
    this.todoService.setItemsDone(done, ...this.items);
  }

  deleteAllItems() {
    this.todoService.removeItems(...this.items.filter(this.filterAll));
  }
}
