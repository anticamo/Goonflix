import React from 'react';
import { Film } from 'lucide-react';

export function Anime() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-16">
      <div className="text-center">
        <Film className="mx-auto mb-6 h-24 w-24 text-primary" />
        <h1 className="mb-4 text-4xl font-bold text-text">Coming Soon</h1>
        <p className="text-lg text-text-secondary">
          Our anime section is currently under development.<br />
          Stay tuned for amazing anime content!
        </p>
      </div>
    </div>
  );
}