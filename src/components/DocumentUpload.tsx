import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { DocumentUploadModal } from './DocumentUploadModal';

interface DocumentUploadProps {
  onUploadSuccess?: (documentId: string) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUploadSuccess,
}) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        📁 Upload Document
      </Button>
      <DocumentUploadModal
        isOpen={open}
        onClose={onClose}
        onUploadSuccess={onUploadSuccess}
      />
    </>
  );
};
