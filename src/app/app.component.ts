import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Candidate List';
  baseURL = 'http://myxpetask.runasp.net/api/Candidates/Get-All';
  Candidate: any[] = [];
  selectedFile: File | null = null;
  uploadMessage: string = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://myxpetask.runasp.net/api/Candidates/upload', formData)
      .subscribe({
        next: () => {
          this.uploadMessage = 'File uploaded successfully!';
        },
        error: () => {
          this.uploadMessage = 'Error uploading file.';
        }
      });
  }

  loadCandidates(): void {
    this.loading = true;
    this.http.get<any[]>(this.baseURL).subscribe({
      next: (data) => {
        this.Candidate = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching candidates:', err);
        this.loading = false;
      }
    });
  }
}
