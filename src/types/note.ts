export interface NoteMetadata {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}

export interface Note extends NoteMetadata {
  content: string;
}
