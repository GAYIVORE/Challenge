import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Target, User } from 'lucide-react';

export default function TextInputs({ name, vision, discipline, onNameChange, onVisionChange, onDisciplineChange }) {
  return (
    <div className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary tracking-wide uppercase flex items-center gap-2">
          <User className="w-4 h-4 text-accent" />
          Your Name
        </label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your full name"
          maxLength={40}
          className="bg-card border-border focus:border-accent focus:ring-accent/20 text-foreground placeholder:text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground text-right">{name.length}/40</p>
      </div>

      {/* Vision */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary tracking-wide uppercase flex items-center gap-2">
          <Eye className="w-4 h-4 text-accent" />
          My Vision for Impact
        </label>
        <Textarea
          value={vision}
          onChange={(e) => {
            if (e.target.value.length <= 150) onVisionChange(e.target.value);
          }}
          placeholder="Write your core ambition for the year..."
          maxLength={150}
          rows={3}
          className="bg-card border-border focus:border-accent focus:ring-accent/20 text-foreground placeholder:text-muted-foreground resize-none"
        />
        <p className="text-xs text-muted-foreground text-right">{vision.length}/150</p>
      </div>

      {/* Discipline */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-primary tracking-wide uppercase flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" />
          My Daily Discipline
        </label>
        <Input
          value={discipline}
          onChange={(e) => {
            if (e.target.value.length <= 50) onDisciplineChange(e.target.value);
          }}
          placeholder="One habit that builds the future..."
          maxLength={50}
          className="bg-card border-border focus:border-accent focus:ring-accent/20 text-foreground placeholder:text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground text-right">{discipline.length}/50</p>
      </div>
    </div>
  );
}