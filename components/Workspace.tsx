import React, { useState, useRef, useEffect } from 'react';
import { Tool, User } from '../types';
import { processTool } from '../services/apiService';

interface WorkspaceProps {
  tool: Tool;
  user: User | null;
  onClose: () => void;
  onJoinPro: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ tool, user, onClose, onJoinPro }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'config' | 'processing' | 'done'>('upload');
  const [options, setOptions] = useState<Record<string, any>>({});
  
  // Progress States
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Specific state for signature
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Specific state for organize/rotate (mock pages)
  const [mockPages, setMockPages] = useState<{id: number, rot: number}[]>([
    {id: 1, rot: 0}, {id: 2, rot: 0}, {id: 3, rot: 0}, {id: 4, rot: 0}
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const FILE_SIZE_LIMIT_FREE = 35 * 1024 * 1024; // 35MB
  const FILE_SIZE_LIMIT_PRO = 10 * 1024 * 1024 * 1024; // 10GB

  // Initialize defaults
  useEffect(() => {
    setFiles([]);
    setOptions({});
    setMockPages([{id: 1, rot: 0}, {id: 2, rot: 0}, {id: 3, rot: 0}, {id: 4, rot: 0}]);
    setUploadProgress(0);
    setProcessingProgress(0);
    
    // Tools that don't need initial file upload
    if (['ppt_gen', 'html2pdf'].includes(tool.id)) {
      setStep('config');
    } else {
      setStep('upload');
    }
  }, [tool]);

  // Determine accepted file types based on tool ID
  const getAcceptType = () => {
    switch (tool.id) {
        case 'word2pdf':
            return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case 'excel2pdf':
            return ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        case 'ppt2pdf':
            return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
        case 'img2pdf':
        case 'scan':
            return "image/*,.jpg,.jpeg,.png";
        case 'ppt_gen':
        case 'html2pdf':
            return "*/*"; 
        default:
            return ".pdf,application/pdf";
    }
  };

  // Check limits for Topic to PPT
  const checkTopicLimit = () => {
      if (user?.isPremium) return true;
      if (tool.id !== 'ppt_gen') return true;

      const usageStr = localStorage.getItem('ppt_usage');
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;
      
      let usage = { month: currentMonth, count: 0 };
      if (usageStr) {
          try {
             const parsed = JSON.parse(usageStr);
             if (parsed.month === currentMonth) {
                 usage = parsed;
             }
          } catch(e) {}
      }

      if (usage.count >= 5) {
          return false;
      }
      return true;
  };

  const incrementTopicLimit = () => {
      if (user?.isPremium) return;
      if (tool.id !== 'ppt_gen') return;

      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;
      let usage = { month: currentMonth, count: 0 };
      const usageStr = localStorage.getItem('ppt_usage');
      if (usageStr) {
           try {
             const parsed = JSON.parse(usageStr);
             if (parsed.month === currentMonth) {
                 usage = parsed;
             }
          } catch(e) {}
      }
      usage.count += 1;
      localStorage.setItem('ppt_usage', JSON.stringify(usage));
  };

  // Signature Canvas Logic
  useEffect(() => {
    if (tool.id === 'sign' && step === 'config') {
       const canvas = canvasRef.current;
       if (canvas) {
           const ctx = canvas.getContext('2d');
           if (ctx) {
               ctx.strokeStyle = '#000000';
               ctx.lineWidth = 2;
               ctx.lineCap = 'round';
           }
       }
    }
  }, [tool.id, step]);

  const startDrawing = (e: React.MouseEvent) => {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
          const rect = canvas.getBoundingClientRect();
          ctx.beginPath();
          ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
  };
  const draw = (e: React.MouseEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
          const rect = canvas.getBoundingClientRect();
          ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
          ctx.stroke();
      }
  };
  const stopDrawing = () => setIsDrawing(false);
  const clearSignature = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
  };

  // Upload Simulation
  const simulateUpload = (newFiles: File[]) => {
      setUploadProgress(1);
      let progress = 1;
      const interval = setInterval(() => {
          if (progress >= 100) {
              clearInterval(interval);
              setUploadProgress(100);
              setFiles((prevFiles) => [...prevFiles, ...newFiles]);
              setTimeout(() => {
                  setUploadProgress(0);
                  if (tool.id !== 'compare') {
                       setStep('config'); 
                  }
              }, 300);
          } else {
              progress += 10;
              setUploadProgress(progress);
          }
      }, 50);
  };

  const validateFiles = (filesToCheck: File[]) => {
      const limit = user?.isPremium ? FILE_SIZE_LIMIT_PRO : FILE_SIZE_LIMIT_FREE;
      const limitLabel = user?.isPremium ? '10GB' : '35MB';

      for (const f of filesToCheck) {
          if (f.size > limit) {
              if (window.confirm(`File ${f.name} exceeds the ${limitLabel} limit.\n${!user?.isPremium ? 'Upgrade to Pro for 10GB limits?' : ''}`)) {
                  if (!user?.isPremium) onJoinPro();
              }
              return false;
          }
      }
      return true;
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      if (tool.id === 'merge' && !user?.isPremium && (files.length + droppedFiles.length) > 10) {
        if(window.confirm("Free limit reached: Max 10 files for Merge.\nUpgrade to Pro for unlimited merging?")) {
            onJoinPro();
        }
        return;
      }
      if (!validateFiles(droppedFiles)) return;
      if (tool.id === 'compare') {
          setFiles((prev) => [...prev, ...droppedFiles]);
      } else {
          if (step === 'upload') {
            simulateUpload(droppedFiles);
          } else {
            setFiles((prev) => [...prev, ...droppedFiles]);
          }
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files) as File[];
      if (tool.id === 'merge' && !user?.isPremium && (files.length + selectedFiles.length) > 10) {
        if(window.confirm("Free limit reached: Max 10 files for Merge.\nUpgrade to Pro for unlimited merging?")) {
            onJoinPro();
        }
        e.target.value = '';
        return;
      }
      if (!validateFiles(selectedFiles)) {
          e.target.value = '';
          return;
      }
      if (tool.id === 'compare') {
           setFiles((prev) => [...prev, ...selectedFiles]);
      } else {
           if (step === 'upload') {
               simulateUpload(selectedFiles);
           } else {
               setFiles((prev) => [...prev, ...selectedFiles]);
           }
      }
    }
    e.target.value = '';
  };

  const executeProcess = async () => {
    if (tool.id === 'ppt_gen' && !checkTopicLimit()) {
        if(window.confirm("You have reached your free monthly limit (5 PPTs).\nUpgrade to Pro for unlimited access?")) {
            onJoinPro();
        }
        return;
    }

    if (files.length === 0 && !['ppt_gen', 'html2pdf'].includes(tool.id)) {
        alert("Please upload a file first.");
        return;
    }

    setStep('processing');
    setProcessing(true);
    setProcessingProgress(0);
    
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    if (files.length > 0) formData.append('file', files[0]);
    
    Object.keys(options).forEach(key => formData.append(key, options[key]));

    if (tool.id === 'sign' && canvasRef.current) {
         await new Promise<void>(resolve => {
             canvasRef.current?.toBlob(blob => {
                 if(blob) formData.append('signature', blob);
                 resolve();
             });
         });
    }

    const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
            if (prev >= 95) return 95;
            return prev + 2;
        });
    }, 100);

    try {
      const blob = await processTool(tool.id, formData);
      clearInterval(progressInterval);
      setProcessingProgress(100);
      if (tool.id === 'ppt_gen') incrementTopicLimit();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      let ext = 'pdf';
      if (tool.id === 'ppt_gen' || tool.id === 'pdf2ppt') ext = 'pptx';
      if (tool.id === 'pdf2word') ext = 'docx';
      if (tool.id === 'pdf2excel') ext = 'xlsx';
      if (tool.id === 'pdf2jpg') ext = 'zip'; 
      
      a.download = `BuiltTheory_${tool.id}_Result.${ext}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setTimeout(() => setStep('done'), 500);
    } catch (e: any) {
      clearInterval(progressInterval);
      alert(e.message || "Error processing file.");
      if (e.message?.includes("Pro Upgrade")) {
          onJoinPro();
      }
      setStep('config');
    } finally {
      setProcessing(false);
    }
  };

  // --- UI COMPONENTS ---
  // Specific UI implementations for each tool to ensure separation.

  const renderMergeUI = () => (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl h-full p-4">
      <div className="w-full md:w-1/3 border border-gray-200 rounded-xl p-4 bg-white flex flex-col shadow-sm">
         <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-700">File Order</h3>
             <button onClick={() => fileInputRef.current?.click()} className={`text-sm font-bold text-primary hover:underline`}>+ Add Files</button>
         </div>
         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {files.map((f, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center group hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="bg-gray-200 text-gray-600 text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">{i+1}</span>
                        <span className="truncate text-sm text-gray-700 font-medium">{f.name}</span>
                    </div>
                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500 transition-colors">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            ))}
         </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
         <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-4 text-2xl">
            <i className="fas fa-layer-group"></i>
         </div>
         <h2 className="text-xl font-bold text-gray-800 mb-2">Ready to Merge</h2>
         <p className="text-gray-500 text-sm mb-6 max-w-xs">Combining {files.length} documents into a single PDF file.</p>
         <button onClick={executeProcess} className="bg-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-red-600 transition-all hover:-translate-y-1">
            Merge PDF
         </button>
      </div>
    </div>
  );

  const renderSplitUI = () => (
    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Split Settings</h3>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-6">
            <button className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${options.mode !== 'all' ? 'bg-white shadow text-primary' : 'text-gray-500'}`} onClick={() => setOptions({...options, mode: 'range'})}>Extract Range</button>
            <button className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${options.mode === 'all' ? 'bg-white shadow text-primary' : 'text-gray-500'}`} onClick={() => setOptions({...options, mode: 'all'})}>Split All Pages</button>
        </div>
        {options.mode !== 'all' && (
            <div className="mb-6 animate-[fadeIn_0.2s]">
                <label className="block text-sm font-bold text-gray-700 mb-2">Page Ranges</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono" placeholder="e.g. 1-5, 8, 10-12" onChange={(e) => setOptions({...options, pages: e.target.value})} />
            </div>
        )}
        <button onClick={executeProcess} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg">Split PDF</button>
    </div>
  );

  const renderCompressUI = () => (
    <div className="w-full max-w-2xl text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Compression Level</h3>
        <p className="text-gray-500 mb-8">Choose how much you want to reduce the file size.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {['low', 'recommended', 'extreme'].map((level) => (
                <div key={level} onClick={() => setOptions({...options, level})} className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all ${options.level === level ? 'border-primary bg-red-50 ring-2 ring-primary/20' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                    <div className={`mb-3 text-2xl ${options.level === level ? 'text-primary' : 'text-gray-300'}`}><i className={`fas ${level === 'extreme' ? 'fa-compress-arrows-alt' : level === 'recommended' ? 'fa-check-circle' : 'fa-image'}`}></i></div>
                    <div className="font-bold text-gray-800 capitalize mb-1">{level}</div>
                    <div className="text-xs text-gray-400 font-medium">{level === 'extreme' ? 'High Compression' : level === 'recommended' ? 'Good Quality' : 'Less Compression'}</div>
                </div>
            ))}
        </div>
        <button onClick={executeProcess} className="bg-primary text-white px-12 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Compress PDF</button>
    </div>
  );

  const renderVisualGridUI = (action: 'rotate' | 'organize' | 'extract') => (
      <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center mb-4 px-4">
              <h3 className="font-bold text-lg capitalize flex items-center gap-2"><i className="fas fa-th text-gray-400"></i> {action} Pages</h3>
              <div className="flex gap-2">
                  <button onClick={() => setMockPages(mockPages.map(p => ({...p, rot: (p.rot + 90) % 360})))} className="text-sm bg-white border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 font-medium text-gray-600">Rotate All</button>
                  <button onClick={() => setMockPages([])} className="text-sm text-red-500 hover:text-red-700 px-3 py-1 font-medium">Clear All</button>
              </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-100 rounded-xl p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 border border-gray-200 shadow-inner">
               {mockPages.map((page, idx) => (
                   <div key={page.id} className="relative group bg-white rounded-lg shadow-sm hover:shadow-md transition-all aspect-[3/4] flex flex-col items-center justify-center border border-gray-200">
                       <div className="w-full h-full flex items-center justify-center transition-transform duration-300 text-gray-300 font-serif text-4xl select-none" style={{ transform: `rotate(${page.rot}deg)`}}>{page.id}</div>
                       <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px] rounded-lg">
                           {action === 'rotate' && (
                               <button onClick={() => { const newPages = [...mockPages]; newPages[idx].rot = (newPages[idx].rot + 90) % 360; setMockPages(newPages); }} className="bg-white rounded-full w-8 h-8 text-dark hover:bg-primary hover:text-white shadow-lg transition-colors"><i className="fas fa-redo"></i></button>
                           )}
                           {(action === 'organize' || action === 'extract') && (
                               <button onClick={() => { const newPages = mockPages.filter((_, i) => i !== idx); setMockPages(newPages); }} className="bg-white rounded-full w-8 h-8 text-red-500 hover:bg-red-500 hover:text-white shadow-lg transition-colors"><i className="fas fa-trash"></i></button>
                           )}
                       </div>
                       <div className="absolute bottom-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">Page {page.id}</div>
                   </div>
               ))}
               <div className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary hover:text-primary transition-all bg-white/50 hover:bg-white">
                   <i className="fas fa-plus mb-2"></i>
                   <span className="text-xs font-bold">Add Page</span>
               </div>
          </div>
          <div className="mt-4 flex justify-end">
              <button onClick={executeProcess} className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-600 transition-colors">Apply & Download</button>
          </div>
      </div>
  );

  const renderSecurityUI = (type: 'protect' | 'unlock') => (
    <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className={`w-16 h-16 ${type === 'protect' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl`}>
            <i className={`fas ${type === 'protect' ? 'fa-lock' : 'fa-lock-open'}`}></i>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{type === 'protect' ? 'Encrypt PDF' : 'Remove Security'}</h3>
        <p className="text-gray-500 text-sm mb-6">
            {type === 'protect' ? 'Set a strong password to prevent unauthorized access.' : 'Enter the owner password to unlock this file permanently.'}
        </p>
        <input type="password" placeholder={type === 'protect' ? "New Password" : "Current Password"} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono" onChange={(e) => setOptions({...options, password: e.target.value})} />
        {type === 'protect' && (
             <input type="password" placeholder="Confirm Password" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono" />
        )}
        <button onClick={executeProcess} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg">{type === 'protect' ? 'Protect PDF' : 'Unlock PDF'}</button>
    </div>
  );

  const renderWatermarkUI = () => (
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100">
              <div>
                  <h3 className="font-bold text-gray-700 mb-2">Watermark Text</h3>
                  <input type="text" placeholder="e.g. DRAFT, CONFIDENTIAL" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" onChange={(e) => setOptions({...options, text: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Color</label>
                      <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-xl">
                           <input type="color" className="w-8 h-8 rounded cursor-pointer border-none" onChange={(e) => setOptions({...options, color: e.target.value})} defaultValue="#000000" />
                           <span className="text-xs text-gray-500">Pick Color</span>
                      </div>
                  </div>
                  <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Opacity</label>
                      <input type="range" min="0" max="100" className="w-full mt-3 accent-primary" onChange={(e) => setOptions({...options, opacity: e.target.value})} />
                  </div>
              </div>
              <button onClick={executeProcess} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-red-600 transition-colors">Apply Watermark</button>
          </div>
          <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-8 border border-gray-200 shadow-inner">
             <div className="bg-white shadow-xl w-64 h-[340px] relative flex items-center justify-center overflow-hidden border border-gray-100">
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform -rotate-45">
                     <span className="text-3xl font-black text-gray-900 opacity-20 select-none whitespace-nowrap">{options.text || "WATERMARK"}</span>
                 </div>
                 <div className="text-[6px] text-gray-300 p-4 text-justify leading-tight">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </div>
             </div>
          </div>
      </div>
  );

  const renderSignatureUI = () => (
      <div className="w-full max-w-2xl text-center">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Draw Your Signature</h3>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden relative cursor-crosshair touch-none shadow-sm hover:border-primary transition-colors">
              <canvas ref={canvasRef} width={600} height={300} className="w-full h-64 bg-transparent" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
              <button onClick={clearSignature} className="absolute top-4 right-4 text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:text-red-500 font-bold shadow-sm hover:shadow">
                  <i className="fas fa-eraser mr-1"></i> Clear
              </button>
              <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none text-xs text-gray-300">Sign above using mouse or touch</div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
              <button onClick={executeProcess} className="bg-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Sign & Download</button>
          </div>
      </div>
  );

  const renderPPTGenUI = () => (
    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-5 w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-lg text-gray-800 mb-2">Presentation Details</h3>
             <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Topic</label>
                <input type="text" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="e.g. Sustainable Energy Future" onChange={(e) => setOptions({...options, topic: e.target.value})} />
             </div>
             <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Target Audience</label>
                <select className="w-full border border-gray-200 p-3 rounded-xl bg-white outline-none" onChange={(e) => setOptions({...options, audience: e.target.value})}>
                    <option>University Students</option>
                    <option>Corporate Professionals</option>
                    <option>General Public</option>
                    <option>Investors</option>
                </select>
             </div>
             <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Slide Count</label>
                <input type="number" defaultValue={10} className="w-full border border-gray-200 p-3 rounded-xl outline-none" onChange={(e) => setOptions({...options, slides: e.target.value})} />
             </div>
        </div>
        <div className="w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-wand-magic-sparkles text-blue-600"></i>
                <h4 className="font-bold text-blue-900">AI Power</h4>
            </div>
            <p className="text-xs text-blue-700 mb-4 leading-relaxed">Our AI will research the topic and generate a complete slide deck with structured content.</p>
            <ul className="text-xs text-blue-800 space-y-2 mb-6">
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-blue-500"></i> Smart Outline</li>
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-blue-500"></i> Key Points</li>
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-blue-500"></i> Professional Formatting</li>
            </ul>
            <button onClick={executeProcess} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Generate PPT</button>
        </div>
    </div>
  );

  const renderHTML2PDF = () => (
      <div className="w-full max-w-lg text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-globe text-4xl text-purple-500"></i>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Capture Webpage</h3>
          <p className="text-gray-500 mb-8 text-sm">Convert any public URL into a high-quality PDF document.</p>
          <div className="relative mb-6">
              <i className="fas fa-link absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="url" placeholder="https://www.example.com" className="w-full border border-gray-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-purple-200 outline-none" onChange={(e) => setOptions({...options, url: e.target.value})} />
          </div>
          <button onClick={executeProcess} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 shadow-lg transition-colors">Convert to PDF</button>
      </div>
  );

  const renderScanUI = () => (
      <div className="w-full max-w-lg text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-camera text-3xl text-white"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Enhance Scan</h3>
          <p className="text-gray-500 mb-6 text-sm">We will clean up the image, fix perspective, and increase contrast.</p>
          <div className="flex justify-center gap-4 mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-dark w-5 h-5" defaultChecked onChange={(e) => setOptions({...options, grayscale: e.target.checked})} />
                  <span className="text-sm font-bold text-gray-700">Grayscale</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-dark w-5 h-5" defaultChecked onChange={(e) => setOptions({...options, highContrast: e.target.checked})} />
                  <span className="text-sm font-bold text-gray-700">High Contrast</span>
              </label>
          </div>
          <button onClick={executeProcess} className="w-full bg-dark text-white py-3 rounded-xl font-bold shadow-lg hover:bg-black transition-colors">Process Scan</button>
      </div>
  );

  const renderConverterUI = (icon: string, title: string, desc: string, colorClass: string = "text-primary") => (
      <div className="text-center p-10 w-full max-w-lg bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex flex-col items-center animate-in slide-in-from-left duration-500">
                  <i className={`fas fa-file-pdf text-4xl text-gray-300 mb-3`}></i>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source</span>
              </div>
              <i className="fas fa-arrow-right text-gray-200"></i>
              <div className="flex flex-col items-center animate-in slide-in-from-right duration-500">
                  <i className={`fas ${icon} text-4xl ${colorClass} mb-3`}></i>
                  <span className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>Target</span>
              </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-500 mb-8 text-sm">{desc}</p>
          <button onClick={executeProcess} className={`w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-100 hover:bg-red-600 hover:-translate-y-0.5 transition-all`}>
              Start Conversion
          </button>
      </div>
  );

  const renderOcrUI = () => (
      <div className="text-center p-8 w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100">
          <i className="fas fa-search text-4xl text-blue-500 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">OCR Text Recognition</h3>
          <p className="text-gray-500 mb-6 text-sm">Make your scanned PDF searchable and selectable.</p>
          <div className="text-left mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Document Language</label>
              <select className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white transition-colors outline-none" onChange={(e) => setOptions({...options, lang: e.target.value})}>
                  <option value="eng">English</option>
                  <option value="spa">Spanish</option>
                  <option value="deu">German</option>
                  <option value="fra">French</option>
                  <option value="ita">Italian</option>
              </select>
          </div>
          <button onClick={executeProcess} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">Run OCR</button>
      </div>
  );

  const renderComparisonUI = () => (
    <div className="text-center max-w-lg bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-not-equal text-3xl text-orange-500"></i>
        </div>
        <h3 className="font-bold text-xl mb-2 text-gray-800">Compare Documents</h3>
        <p className="text-gray-500 mb-8 text-sm">We will analyze <b>{files[0]?.name}</b> vs <b>{files[1]?.name}</b> and highlight every difference.</p>
        <button onClick={executeProcess} className="w-full bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all">Run Comparison</button>
    </div>
  );

  const renderRepairUI = () => (
      <div className="text-center p-8 w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-hammer text-2xl text-green-600"></i>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Repair Corrupt PDF</h3>
          <p className="text-gray-500 mb-6 text-sm">Attempt to recover data from a damaged or unreadable PDF file.</p>
          <button onClick={executeProcess} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors">Start Recovery</button>
      </div>
  );

  const renderConfig = () => {
    // Explicit switch case for ALL 27 tools to satisfy "Separate Implementation" requirement.
    switch (tool.id) {
        // Organize Category
        case 'merge': return renderMergeUI();
        case 'split': return renderSplitUI();
        case 'compress': return renderCompressUI();
        case 'rotate': return renderVisualGridUI('rotate');
        case 'organize': return renderVisualGridUI('organize');
        case 'extract': return renderVisualGridUI('extract');
        case 'scan': return renderScanUI();
        case 'compare': return renderComparisonUI();
        case 'repair': return renderRepairUI();
        case 'ocr': return renderOcrUI();

        // Converters
        case 'img2pdf': return renderConverterUI('fa-file-pdf', 'Images to PDF', 'Convert JPG, PNG, WEBP to a single PDF.', 'text-red-500');
        case 'pdf2jpg': return renderConverterUI('fa-image', 'PDF to JPG', 'Extract pages as high-quality images.', 'text-yellow-500');
        case 'word2pdf': return renderConverterUI('fa-file-pdf', 'Word to PDF', 'Convert DOC/DOCX documents to PDF.', 'text-blue-600');
        case 'pdf2word': return renderConverterUI('fa-file-word', 'PDF to Word', 'Convert PDF to editable DOCX.', 'text-blue-600');
        case 'excel2pdf': return renderConverterUI('fa-file-pdf', 'Excel to PDF', 'Convert Spreadsheets to PDF.', 'text-green-600');
        case 'pdf2excel': return renderConverterUI('fa-file-excel', 'PDF to Excel', 'Extract PDF tables to XLSX.', 'text-green-600');
        case 'ppt2pdf': return renderConverterUI('fa-file-pdf', 'PowerPoint to PDF', 'Convert Slides to PDF document.', 'text-orange-500');
        case 'pdf2ppt': return renderConverterUI('fa-file-powerpoint', 'PDF to PowerPoint', 'Convert PDF pages to PPTX slides.', 'text-orange-500');
        case 'html2pdf': return renderHTML2PDF();
        case 'pdf2pdfa': return renderConverterUI('fa-archive', 'PDF to PDF/A', 'Convert to ISO-standard for long-term archiving.', 'text-purple-600');

        // Security Category
        case 'protect': return renderSecurityUI('protect');
        case 'unlock': return renderSecurityUI('unlock');
        case 'watermark': return renderWatermarkUI();
        case 'sign': return renderSignatureUI();
        case 'redact': return renderConverterUI('fa-eye-slash', 'Redact PDF', 'Black out sensitive text and images permanently.', 'text-gray-800');
        case 'pagenum': return renderConverterUI('fa-hashtag', 'Page Numbers', 'Add pagination to header or footer.', 'text-gray-600');
        case 'edit': return renderConverterUI('fa-pen-to-square', 'Edit PDF', 'Add text, shapes and annotations.', 'text-indigo-500');
        
        // Academic
        case 'ppt_gen': return renderPPTGenUI();

        default: return (
             <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                 <p className="mb-4 text-gray-500">Standard processing for {tool.title}</p>
                 <button onClick={executeProcess} className="bg-primary text-white px-8 py-2 rounded-lg font-bold">Process File</button>
             </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-[fadeIn_0.2s_ease-out]">
        
        {/* Workspace Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-white z-10 shadow-[0_2px_10px_-10px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-primary text-xl shadow-inner border border-red-100">
                    <i className={`fas ${tool.icon}`}></i>
                </div>
                <div>
                    <h2 className="font-extrabold text-xl text-gray-800 tracking-tight">{tool.title}</h2>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Built-Theory Engine</p>
                </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-all">
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-auto bg-[#f8f9fa] relative flex flex-col items-center p-6">
            
            {/* Stepper */}
            {step !== 'done' && (
              <div className="w-full max-w-2xl mb-8 mt-2">
                  <div className="flex justify-between relative">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                      <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(['upload','config','processing','done'].indexOf(step) / 3) * 100}%` }}></div>
                      {[{id:'upload',label:'Upload'},{id:'config',label:'Settings'},{id:'processing',label:'Process'},{id:'done',label:'Result'}].map((s, idx) => {
                          const steps = ['upload','config','processing','done'];
                          const currentIdx = steps.indexOf(step);
                          const isActive = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;
                          return (
                              <div key={s.id} className="flex flex-col items-center gap-2 bg-[#f8f9fa] px-2">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${isActive ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-300 text-gray-400'}`}>
                                      {isActive && idx < currentIdx ? <i className="fas fa-check"></i> : idx + 1}
                                  </div>
                                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-primary' : 'text-gray-400'}`}>{s.label}</span>
                              </div>
                          );
                      })}
                  </div>
              </div>
            )}

            <div className="flex-1 w-full flex items-center justify-center">
                {step === 'upload' && (
                  tool.id === 'compare' ? (
                      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[0, 1].map((idx) => (
                              <div key={idx} className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center hover:bg-white hover:border-primary transition-all cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-sm ${idx === 0 ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>{idx + 1}</div>
                                  <p className="font-bold text-gray-700 group-hover:text-primary transition-colors">{files[idx] ? files[idx].name : `Upload File ${idx === 0 ? 'A' : 'B'}`}</p>
                                  <p className="text-xs text-gray-400 mt-2">PDF Document</p>
                              </div>
                          ))}
                          <div className="md:col-span-2 text-center">
                              <button disabled={files.length < 2} onClick={() => setStep('config')} className={`px-12 py-3 rounded-xl font-bold transition-all shadow-lg ${files.length >= 2 ? 'bg-primary text-white hover:bg-red-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Proceed to Compare</button>
                          </div>
                      </div>
                  ) : (
                    <div 
                       className={`w-full max-w-xl p-16 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center relative overflow-hidden group ${isDragging ? 'border-primary bg-red-50 scale-[1.02]' : 'border-gray-300 hover:border-primary hover:bg-white hover:shadow-xl'}`}
                       onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => !uploadProgress && fileInputRef.current?.click()}
                    >
                       {uploadProgress > 0 ? (
                           <div className="flex flex-col items-center justify-center h-full animate-[fadeIn_0.3s]">
                                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary font-bold text-2xl shadow-inner relative">
                                    {Math.round(uploadProgress)}%
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#e33b2f" strokeWidth="4" strokeDasharray="283" strokeDashoffset={283 - (283 * uploadProgress) / 100} className="transition-all duration-75 ease-linear" /></svg>
                                </div>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Uploading...</p>
                           </div>
                       ) : (
                           <>
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-primary text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    <i className={`fas ${tool.icon}`}></i>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">Drop files here</h3>
                                <p className="text-gray-400 mb-8 font-medium">or click to browse from device</p>
                                <span className={`inline-block px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase ${user?.isPremium ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'bg-gray-100 text-gray-500'}`}>
                                    {user?.isPremium ? 'PRO LIMIT: 10GB' : 'FREE LIMIT: 35MB'}
                                </span>
                           </>
                       )}
                    </div>
                  )
                )}

                {step === 'config' && renderConfig()}

                {step === 'processing' && (
                    <div className="text-center p-12 bg-white rounded-3xl shadow-lg border border-gray-100 w-full max-w-lg">
                        <div className="w-20 h-20 mx-auto mb-8 relative flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <i className="fas fa-cog text-gray-300 text-2xl animate-pulse"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Processing...</h3>
                        <p className="text-gray-400 text-sm mb-6">Our AI engine is analyzing your document.</p>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                             <div className="h-full bg-primary transition-all duration-300 ease-out" style={{width: `${processingProgress}%`}}></div>
                        </div>
                        <div className="mt-2 text-right text-xs font-bold text-primary">{Math.round(processingProgress)}%</div>
                    </div>
                )}

                {step === 'done' && (
                    <div className="text-center animate-[scaleIn_0.3s_ease-out] bg-white p-12 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-4xl shadow-inner ring-4 ring-green-50">
                            <i className="fas fa-check"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">Success!</h3>
                        <p className="text-gray-500 mb-10">Your file is ready for download.</p>
                        <div className="flex flex-col gap-4">
                            <button className="bg-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-black transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
                                <i className="fas fa-download"></i> Download File
                            </button>
                            <button onClick={() => { setStep('upload'); setFiles([]); setOptions({}); setUploadProgress(0); setProcessingProgress(0); }} className="text-gray-400 font-bold hover:text-dark py-2 text-sm uppercase tracking-wide">
                                <i className="fas fa-redo mr-2"></i> Start Over
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} accept={getAcceptType()} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;