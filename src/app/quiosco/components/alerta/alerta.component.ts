import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerta',
  standalone: true,
  template: `
    <div class="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
      {{ children }}
    </div>
  `,
})
export class AlertaComponent {
  @Input()
  public children?: string;
}
