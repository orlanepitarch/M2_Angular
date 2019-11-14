import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

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

  getFilteredItems():TodoItemData[]{
    return this.data ? this.data.items.filter(this.currentFilter) : [];
  }

  @Input() private data: TodoListData;

  private titre: string;
  
  constructor(private todoService: TodoService) { 
    todoService.getTodoListDataObserver().subscribe(tdl => this.data = tdl);
    this.titre = this.data.label;
  }

  ngOnInit() {
  }

  get label(): string {
    return this.data ? this.data.label : '';
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
}
