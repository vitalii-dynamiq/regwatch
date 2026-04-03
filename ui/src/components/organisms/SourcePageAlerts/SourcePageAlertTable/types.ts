export interface SourcePageAlert {
  id: string;
  changeName: string;
  risk: 'high' | 'medium' | 'low' | 'unknown';
  description: string;
  dateTime: string;
}
