'use client';

import dynamic from 'next/dynamic';

const ChatConcierge = dynamic(() => import('@/components/ChatConcierge'), {
  ssr: false,
  loading: () => null,
});

export default function LazyChatConcierge() {
  return <ChatConcierge />;
}
