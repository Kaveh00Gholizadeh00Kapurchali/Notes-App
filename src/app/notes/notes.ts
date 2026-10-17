import { Component, signal, computed, effect } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-notes',
  styleUrl: './notes.css',
  templateUrl: './notes.html',
})
export class Notes {

  private StorageKey = 'notes_app';

  constructor() {
    effect(() => {
      if(typeof localStorage !== 'undefined'){
        localStorage.setItem(this.StorageKey, JSON.stringify(this.notes()));
      }
    });
  }

  notes = signal<string[]>(this.loadNotes());
  search = signal<string>('');
  

  addNote(note: string) {
    if (!note.trim()) return;
    this.notes.update((notes: string[]) => [...notes, note]);
  }

  deleteNote(index: number){
    this.notes.update((list)=>{
      return list.filter((_,i)=> i !== index);
    });
  }

  filteredNotes = computed(() => this.notes().filter(note => note.toLowerCase().includes(this.search().toLowerCase())));

  private loadNotes(): string[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const savedNotes = localStorage.getItem(this.StorageKey);
    return savedNotes ? JSON.parse(savedNotes) : [];
  }
}

