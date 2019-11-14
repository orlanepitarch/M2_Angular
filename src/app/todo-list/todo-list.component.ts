import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  @Input() 
  private data: TodoListData;

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
    
  }

  isAllDone(): boolean {
    return this.items.every(it=>it.isDone);
  }

  toggleAllDone() {
    const done=!this.isAllDone();
    this.todoService.setItemsDone(done, ...this.items);
  }
}
