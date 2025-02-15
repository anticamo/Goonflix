import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-16">
      <div className="text-center">
        <SettingsIcon className="mx-auto mb-6 h-24 w-24 text-primary" />
        <h1 className="mb-4 text-4xl font-bold text-text">Coming Soon</h1>
        <p className="text-lg text-text-secondary">
          Settings and preferences will be available soon.<br />
          We're working on making your experience even better!
        </p>
      </div>
    </div>
  );
}