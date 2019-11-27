import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );

  constructor() { 
    if(typeof localStorage!='undefined' && localStorage.getItem('todoList')!==null) {
      // Récupération de la valeur dans web storage (JSON donc à parser)
      const tdl = JSON.parse(localStorage.getItem('todoList'));
      this.todoListSubject.next( {
        label: tdl.label,
        items: tdl.items
      });
    }
  }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    // sauvegarde l'état de la liste dans le localStorage
    this.save();
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
    this.save();
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.save();
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.save();
  }

  setTitle(title:string) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: title,
      items: tdl.items
    });
    this.save();
  }

  // sauvegarde dans le localStorage l'état de la todoList actuelle (on veut garder le format JSON donc à stringifier 
  // puis à parser dans le constructeur)
  save() {    
    localStorage.setItem( 'todoList', JSON.stringify(this.todoListSubject.getValue()) );
  }
}
