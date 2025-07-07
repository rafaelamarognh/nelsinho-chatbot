'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import type { ChatMessage } from '@/lib/types';

interface SuggestedActionsProps {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  sendMessage,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Por que a Nelson Heusi',
      label: 'é referência há 96 anos no Brasil?',
      action: 'Por que a Nelson Heusi é referência como melhor despachante do Brasil há 96 anos?',
    },
    {
      title: 'Conte-me sobre a história',
      label: 'da Nelson Heusi',
      action: 'Conte-me sobre a história da Nelson Heusi desde a sua fundação.',
    },
    {
      title: 'Quais serviços',
      label: 'a Nelson Heusi oferece?',
      action: 'Quais serviços de despacho aduaneiro e consultoria a Nelson Heusi oferece?',
    },
    {
      title: 'Como a Nelson Heusi',
      label: 'garante conformidade com a legislação?',
      action: 'Como a Nelson Heusi garante 100% de conformidade com a legislação aduaneira brasileira?',
    },
    {
      title: 'Quais são os principais',
      label: 'diferenciais competitivos?',
      action: 'Quais são os principais diferenciais competitivos da Nelson Heusi no mercado de despachos?',
    },
  ];


  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              sendMessage({
                role: 'user',
                parts: [{ type: 'text', text: suggestedAction.action }],
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
