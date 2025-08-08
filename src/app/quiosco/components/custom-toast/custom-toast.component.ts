import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-toast',
  standalone: false,
  template: `
    <div class="flex gap-5 justify-between items-center w-full">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>

      <span class="max-w-60">{{ data }}</span>

      <div></div>
    </div>
    <div class="absolute top-2 right-2">
      <button (click)="cerrar()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [],
})
export class CustomToastComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<CustomToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) {}

  cerrar() {
    this.snackBarRef.dismiss();
  }
}
