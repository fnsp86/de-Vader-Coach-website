'use client';

import { useAdminPassword } from '@/components/AdminAuth';

export default function PromptGeneratorPage() {
  useAdminPassword();

  return (
    <div className="h-[calc(100vh-52px)]">
      <iframe
        src="/tools/prompt-generator.html"
        className="w-full h-full border-0"
        title="AI Prompt Generator"
      />
    </div>
  );
}
