import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Academic
  { id: 'ppt_gen', title: 'Topic to PPT', description: 'Generate professional PowerPoint presentations from any topic using AI. Perfect for students and engineers.', icon: 'fa-wand-magic-sparkles', category: 'academic' },
  
  // Organize
  { id: 'merge', title: 'Merge PDF', description: 'Combine multiple PDF files into a single document. Drag and drop to reorder pages before merging.', icon: 'fa-layer-group', category: 'organize' },
  { id: 'split', title: 'Split PDF', description: 'Extract specific pages or split a document into multiple PDF files by page ranges.', icon: 'fa-scissors', category: 'organize' },
  { id: 'compress', title: 'Compress PDF', description: 'Reduce PDF file size while maintaining quality. Optimize documents for email and web upload.', icon: 'fa-file-zipper', category: 'organize' },
  { id: 'repair', title: 'Repair PDF', description: 'Recover data from corrupted or damaged PDF files. Fix structure and content errors.', icon: 'fa-kit-medical', category: 'organize', isPro: true },
  { id: 'ocr', title: 'OCR PDF', description: 'Convert scanned documents and images into searchable and editable PDF text using OCR.', icon: 'fa-magnifying-glass-chart', category: 'organize', isPro: false },
  { id: 'rotate', title: 'Rotate PDF', description: 'Rotate PDF pages permanently. Fix orientation of scanned documents (90, 180, 270 degrees).', icon: 'fa-rotate-right', category: 'organize' },
  { id: 'extract', title: 'Extract Pages', description: 'Select and extract specific pages from a PDF to create a new document.', icon: 'fa-file-export', category: 'organize' },
  { id: 'organize', title: 'Organize PDF', description: 'Rearrange, delete, and rotate pages within your PDF document. Visual page editor.', icon: 'fa-table-cells', category: 'organize', isPro: false },
  { id: 'scan', title: 'Scan to PDF', description: 'Enhance and convert camera photos or scans into clean, professional PDF documents.', icon: 'fa-camera', category: 'organize' },
  { id: 'compare', title: 'Compare PDF', description: 'Side-by-side comparison of two PDF files to highlight text and visual differences.', icon: 'fa-code-compare', category: 'organize', isPro: true },

  // Converters
  { id: 'img2pdf', title: 'JPG to PDF', description: 'Convert JPG, PNG, and other image formats into a single PDF document.', icon: 'fa-file-image', category: 'converter' },
  { id: 'pdf2jpg', title: 'PDF to JPG', description: 'Extract pages from PDF and save them as high-quality JPG or PNG images.', icon: 'fa-images', category: 'converter', isPro: true },
  { id: 'word2pdf', title: 'Word to PDF', description: 'Convert Microsoft Word documents (DOC, DOCX) to PDF format with perfect formatting.', icon: 'fa-file-word', category: 'converter' },
  { id: 'pdf2word', title: 'PDF to Word', description: 'Convert PDF files to editable Microsoft Word documents (DOCX) for easy editing.', icon: 'fa-file-pen', category: 'converter', isPro: true },
  { id: 'ppt2pdf', title: 'PPT to PDF', description: 'Convert Microsoft PowerPoint presentations (PPT, PPTX) to PDF format.', icon: 'fa-file-powerpoint', category: 'converter' },
  { id: 'pdf2ppt', title: 'PDF to PPT', description: 'Convert PDF content back into editable PowerPoint slides (PPTX).', icon: 'fa-person-chalkboard', category: 'converter', isPro: true },
  { id: 'excel2pdf', title: 'Excel to PDF', description: 'Convert Excel spreadsheets (XLS, XLSX) to PDF format. Keep tables intact.', icon: 'fa-file-excel', category: 'converter' },
  { id: 'pdf2excel', title: 'PDF to Excel', description: 'Extract data tables from PDF files into editable Excel spreadsheets (XLSX).', icon: 'fa-table', category: 'converter', isPro: true },
  { id: 'html2pdf', title: 'HTML to PDF', description: 'Convert webpages or HTML code into high-quality PDF documents.', icon: 'fa-globe', category: 'converter' },
  { id: 'pdf2pdfa', title: 'PDF to PDF/A', description: 'Convert PDF documents to PDF/A format for long-term archiving and compliance.', icon: 'fa-box-archive', category: 'converter', isPro: true },

  // Security
  { id: 'unlock', title: 'Unlock PDF', description: 'Remove passwords and restrictions from secured PDF files.', icon: 'fa-unlock-keyhole', category: 'security', isPro: true },
  { id: 'protect', title: 'Protect PDF', description: 'Encrypt your PDF with a password to prevent unauthorized access and copying.', icon: 'fa-shield-halved', category: 'security', isPro: true },
  { id: 'watermark', title: 'Watermark', description: 'Add text or image watermarks to your PDF pages for branding and security.', icon: 'fa-stamp', category: 'security', isPro: false },
  { id: 'pagenum', title: 'Page Numbers', description: 'Add page numbers to your PDF document with custom positioning and formatting.', icon: 'fa-hashtag', category: 'security', isPro: true },
  { id: 'edit', title: 'Edit PDF', description: 'Add text, shapes, and annotations to your PDF document directly in the browser.', icon: 'fa-pen-to-square', category: 'security', isPro: true },
  { id: 'sign', title: 'Sign PDF', description: 'Create and apply electronic signatures to your PDF documents legally and securely.', icon: 'fa-signature', category: 'security', isPro: true },
  { id: 'redact', title: 'Redact PDF', description: 'Permanently remove sensitive information and private data from your PDF.', icon: 'fa-eye-slash', category: 'security', isPro: true },
];