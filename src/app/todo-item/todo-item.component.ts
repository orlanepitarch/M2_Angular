import {ChangeDetectionStrategy, Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input()
  protected data: TodoItemData;

  protected _voirEdit: boolean = false;

  @ViewChild("newTextInput", {static:false}) private inputLabel:ElementRef;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  get label(): string {
    return this.data.label;
  }
  set label(lab:string) {
    this.todoService.setItemsLabel(lab, this.data);
  }

  get voirEdit(): boolean {
    return this._voirEdit;
  }
  set voirEdit(e:boolean) {
    this._voirEdit = e;
    requestAnimationFrame(()=>this.inputLabel.nativeElement.focus());
  }

  
  itemDone(item: TodoItemData, done:boolean) {
    this.todoService.setItemsDone(done, item);
  }

  removeItem() {
    this.todoService.removeItems(this.data);
  }

}
