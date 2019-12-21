import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );

  private undo: TodoListData[] = [];
  private redo: TodoListData[] = [];

  constructor() { 
    if(typeof localStorage!='undefined' && localStorage.getItem('todoList')!==null) {
      // Récupération de la valeur dans web storage (JSON donc à parser)
      const tdl = JSON.parse(localStorage.getItem('todoList'));
      this.todoListSubject.next( {
        label: tdl.label,
        items: tdl.items
      });

      if (localStorage.getItem('undo') !== null && localStorage.getItem('redo') !==null) {
        this.undo = JSON.parse(localStorage.getItem('undo'));
        this.redo = JSON.parse(localStorage.getItem('redo'));
      }
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
    this.saveUndo(tdl);
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
    this.saveUndo(tdl);
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.saveUndo(tdl);
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.saveUndo(tdl);
  }

  setTitle(title:string) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: title,
      items: tdl.items
    });
    this.saveUndo(tdl);
  }

  undoFunction() {
    if(this.undo.length!==0) {
      // on insére la valeur actuelle dans la liste redo pour y revenir
      this.redo.push(this.todoListSubject.getValue());
      let last = this.undo.pop();
      this.todoListSubject.next({
        label: last.label,
        items: last.items
      })
      this.save();
    }
  }

  redoFunction(){
    console.log(this.redo);
    if(this.redo.length!==0) {
      this.undo.push(this.todoListSubject.getValue());
      let last = this.redo.pop();
      this.todoListSubject.next({
        label: last.label,
        items: last.items
      })     
      this.save(); 
    }
  }

  // sauvegarde dans le localStorage l'état de la todoList actuelle (on veut garder le format JSON donc à stringifier 
  // puis à parser dans le constructeur)
  saveUndo(tdl:TodoListData) {
    // on insére dans la liste undo la valeur de la todoList précédente
    this.undo.push(tdl); 
    this.save();
  }
  save() {   
    // stockage dans le localStorage
    localStorage.setItem('undo', JSON.stringify(this.undo));
    localStorage.setItem('redo', JSON.stringify(this.redo));
    localStorage.setItem('todoList', JSON.stringify(this.todoListSubject.getValue()) );
  }

  
}
