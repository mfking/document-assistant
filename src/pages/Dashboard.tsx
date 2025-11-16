import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Document {
  id: string;
  title: string;
  summary: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    // TODO: Fetch documents from API
    // Mock data for now
    setDocuments([
      {
        id: '1',
        title: 'Meeting Notes - Jan 15',
        summary: 'Discussion about project timeline and key deliverables',
        created_at: '2024-01-15'
      },
      {
        id: '2', 
        title: 'Project Requirements',
        summary: 'Key features and technical specifications for the new system',
        created_at: '2024-01-14'
      }
    ]);
  }, []);

  const handleAddNote = () => {
    // TODO: Send to API
    console.log('Adding note:', newNote);
    setShowAddNote(false);
    setNewNote({ title: '', content: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Document Assistant</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setShowAddNote(true)}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          + Add Note
        </button>
        <button style={{ padding: '10px 20px' }}>
          📁 Upload Document
        </button>
      </div>

      {showAddNote && (
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '20px', 
          marginBottom: '20px',
          borderRadius: '5px'
        }}>
          <h3>Add New Note</h3>
          <input
            type="text"
            placeholder="Note title"
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <textarea
            placeholder="Note content"
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            style={{ width: '100%', height: '150px', padding: '10px', marginBottom: '10px' }}
          />
          <button onClick={handleAddNote} style={{ marginRight: '10px' }}>Save</button>
          <button onClick={() => setShowAddNote(false)}>Cancel</button>
        </div>
      )}

      <h2>Your Documents</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {documents.map(doc => (
          <Link 
            key={doc.id} 
            to={`/document/${doc.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{doc.title}</h3>
              <p style={{ margin: '0', color: '#666' }}>{doc.summary}</p>
              <small style={{ color: '#999' }}>{doc.created_at}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
