import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '@/types/chat';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <div className="text-2xl">🤖</div>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Como posso ajudar você hoje?
            </h2>
            <p className="text-muted-foreground">
              Comece uma conversa digitando sua pergunta abaixo.
            </p>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-4 p-4 bg-muted/20">
                <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">IA</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">Assistente</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
      
      <ChatInput 
        onSendMessage={onSendMessage} 
        isLoading={isLoading}
      />
    </div>
  );
};
