export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  keyPoints?: string[];
  subjectId: string;
  tagIds: string[];
  filePath?: string;
  type: 'text' | 'image' | 'pdf';
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  noteCount: number;
}

export interface SubjectMap {
  [id: string]: Subject;
}

export interface Tag {
  id: string;
  name: string;
  subjectId: string;
  createdAt: Date;
}
