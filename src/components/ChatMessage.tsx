
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex gap-4 p-4 hover:bg-muted/30 transition-colors",
      isUser ? "bg-background" : "bg-muted/20"
    )}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(
          "text-xs font-medium",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {isUser ? 'U' : 'IA'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium text-foreground">
          {isUser ? 'Você' : 'Assistente'}
        </div>
        <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};
