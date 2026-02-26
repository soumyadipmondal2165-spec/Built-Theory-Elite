import React from 'react';

const SeoContent: React.FC = () => {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-gray-700 font-sans leading-relaxed">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black text-dark mb-4">Advanced PDF Tools for Students and Professionals</h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Built-Theory is an elite document processing engine designed specifically for the heavy workflows of modern engineering and academic research. Experience 100% client-side processing, ensuring your sensitive blueprints, load calculations, and technical documents never leave your device.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-dark mb-3">Why Local Processing Matters</h3>
            <p className="mb-4">
              When working with confidential civil engineering documents, data privacy is critical. Unlike traditional cloud-based PDF converters that upload your files to remote servers, Built-Theory utilizes advanced browser-based WebAssembly and JSZip technologies. This means tasks like merging massive architectural plans or splitting large structural analysis reports happen entirely within your local memory.
            </p>
            <p>
              This local-first approach not only guarantees AES-256 equivalent privacy but also bypasses slow upload times on campus or corporate networks, allowing for instant processing speeds even on massive 50MB files.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-3">Comprehensive Document Management</h3>
            <p className="mb-4">
              Managing project deliverables requires a robust toolkit. Our platform offers a full suite of utilities to streamline your daily tasks. Combine multiple scattered site reports into a single, cohesive master document using our <strong>Merge PDF</strong> tool. Need to extract a specific floor plan from a 500-page manual? Our highly accurate <strong>Split PDF</strong> engine allows you to parse custom page ranges with zero quality loss.
            </p>
            <p>
              Furthermore, for documents that need to be emailed to clients or contractors, our <strong>Compress PDF</strong> utility uses smart algorithms to reduce file size while maintaining the crispness of vector graphics and CAD exports.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-dark mb-4">AI-Powered Academic Tools</h3>
          <p className="mb-4">
            Beyond standard PDF manipulation, Built-Theory integrates next-generation AI to assist in academic and professional presentations. Generate structured, compelling PowerPoint slides directly from complex engineering topics. Whether you are presenting on sustainable waffle roof technologies or urban infrastructure, our AI engine outlines, formats, and prepares your deck, saving you hours of formatting time.
          </p>
          <p className="text-sm text-gray-500 italic">
            *Disclaimer: All processing limits are clearly defined. Free tier users enjoy generous local processing, while our PRO members unlock gigabyte-level document handling and priority AI generation queues.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SeoContent;
