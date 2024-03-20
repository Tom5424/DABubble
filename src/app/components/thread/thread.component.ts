import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';


@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [QuillModule],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})


export class ThreadComponent {


  focusQuillEditor(event: { editor: any, range: any, oldRange: any }): void {
    if (this.quillEditorIsFocused(event)) {
      event.editor.container.style.border = '1px solid #535AF1';
      event.editor.container.style.color = '#000000';
    } else if (this.quillEditorIsNotFocused(event)) {
      event.editor.container.style.border = '1px solid #adb0d9';
      event.editor.container.style.color = '#686868';
    }
  }


  quillEditorIsFocused(event: { editor: any, range: any, oldRange: any }): boolean {
    return (event.oldRange == null) ? true : false;
  }


  quillEditorIsNotFocused(event: { editor: any, range: any, oldRange: any }): boolean {
    return (event.range == null) ? true : false;
  }
}
