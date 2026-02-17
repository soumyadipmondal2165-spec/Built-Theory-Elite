import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Academic
  { id: 'ppt_gen', title: 'Topic to PPT', description: 'Free: 5/mo | Pro: Unlimited', icon: 'fa-wand-magic-sparkles', category: 'academic' },
  
  // Organize
  { id: 'merge', title: 'Merge PDF', description: 'Combine multiple reports.', icon: 'fa-layer-group', category: 'organize' },
  { id: 'split', title: 'Split PDF', description: 'Extract specific pages.', icon: 'fa-scissors', category: 'organize' },
  { id: 'compress', title: 'Compress PDF', description: 'Reduce size for submission.', icon: 'fa-file-zipper', category: 'organize' },
  { id: 'repair', title: 'Repair PDF', description: 'Fix corrupted drawings.', icon: 'fa-kit-medical', category: 'organize', isPro: true },
  { id: 'ocr', title: 'OCR PDF', description: 'Make scans searchable.', icon: 'fa-magnifying-glass-chart', category: 'organize', isPro: false },
  { id: 'rotate', title: 'Rotate PDF', description: 'Fix page orientation.', icon: 'fa-rotate-right', category: 'organize' },
  { id: 'extract', title: 'Extract Pages', description: 'Create new PDF from subset.', icon: 'fa-file-export', category: 'organize' },
  { id: 'organize', title: 'Organize PDF', description: 'Reorder, delete, rotate.', icon: 'fa-table-cells', category: 'organize', isPro: false },
  { id: 'scan', title: 'Scan to PDF', description: 'Camera capture cleanup.', icon: 'fa-camera', category: 'organize' },
  { id: 'compare', title: 'Compare PDF', description: 'Visual/Text diff.', icon: 'fa-code-compare', category: 'organize', isPro: true },

  // Converters
  { id: 'img2pdf', title: 'JPG to PDF', description: 'Photos to Document.', icon: 'fa-file-image', category: 'converter' },
  { id: 'pdf2jpg', title: 'PDF to JPG', description: 'Extract Images.', icon: 'fa-images', category: 'converter', isPro: true },
  { id: 'word2pdf', title: 'Word to PDF', description: 'Reports to Submission.', icon: 'fa-file-word', category: 'converter' },
  { id: 'pdf2word', title: 'PDF to Word', description: 'Make PDF editable.', icon: 'fa-file-pen', category: 'converter', isPro: true },
  { id: 'ppt2pdf', title: 'PPT to PDF', description: 'Slides to Handouts.', icon: 'fa-file-powerpoint', category: 'converter' },
  { id: 'pdf2ppt', title: 'PDF to PPT', description: 'Extract to Slides.', icon: 'fa-person-chalkboard', category: 'converter', isPro: true },
  { id: 'excel2pdf', title: 'Excel to PDF', description: 'Sheets to Documents.', icon: 'fa-file-excel', category: 'converter' },
  { id: 'pdf2excel', title: 'PDF to Excel', description: 'Table Extraction.', icon: 'fa-table', category: 'converter', isPro: true },
  { id: 'html2pdf', title: 'HTML to PDF', description: 'Webpage Capture.', icon: 'fa-globe', category: 'converter' },
  { id: 'pdf2pdfa', title: 'PDF to PDF/A', description: 'Long-term storage.', icon: 'fa-box-archive', category: 'converter', isPro: true },

  // Security
  { id: 'unlock', title: 'Unlock PDF', description: 'Remove passwords.', icon: 'fa-unlock-keyhole', category: 'security', isPro: true },
  { id: 'protect', title: 'Protect PDF', description: 'Add encryption.', icon: 'fa-shield-halved', category: 'security', isPro: true },
  { id: 'watermark', title: 'Watermark', description: 'Stamp pages.', icon: 'fa-stamp', category: 'security', isPro: false },
  { id: 'pagenum', title: 'Page Numbers', description: 'Insert pagination.', icon: 'fa-hashtag', category: 'security', isPro: true },
  { id: 'edit', title: 'Edit PDF', description: 'Modify text/objects.', icon: 'fa-pen-to-square', category: 'security', isPro: true },
  { id: 'sign', title: 'Sign PDF', description: 'E-signatures.', icon: 'fa-signature', category: 'security', isPro: true },
  { id: 'redact', title: 'Redact PDF', description: 'Hide sensitive info.', icon: 'fa-eye-slash', category: 'security', isPro: true },
];