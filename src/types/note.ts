export interface NoteMetadata {
  id: string;
  title: string;
  summary: string;
  created_at: string;
}

export interface Note extends NoteMetadata {
  content: string;
}
