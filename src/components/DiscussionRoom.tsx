
import { useState } from 'react';
import { ArrowLeft, Send, Heart, MessageCircle, BookOpen, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface DiscussionRoomProps {
  bookId: number;
  onBack: () => void;
}

// 토론 데이터
const discussionData: { [key: number]: any } = {
  1: {
    book: {
      title: "아무튼, 술",
      author: "편혜영",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop"
    },
    messages: [
      {
        id: 1,
        user: "책읽는소피",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1ab?w=50&h=50&fit=crop&crop=face",
        content: "이 책을 읽고 나서 혼자만의 시간이 얼마나 소중한지 깨달았어요. 특히 퇴근 후 조용한 카페에서 보내는 시간이 더 의미있게 느껴져요.",
        timestamp: "2024.02.20 19:30",
        likes: 12,
        replies: 3
      },
      {
        id: 2,
        user: "도시독서가",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        content: "저도 같은 생각이에요! 작가가 말하는 '혼자 있는 시간의 가치'에 대해서 많이 공감했습니다. 요즘 사람들이 너무 바쁘게 살아서 자신과 마주할 시간이 부족한 것 같아요.",
        timestamp: "2024.02.20 20:15",
        likes: 8,
        replies: 1
      },
      {
        id: 3,
        user: "밤의독서",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        content: "책 제목만 보고 술에 관한 가벼운 에세이인 줄 알았는데, 읽어보니 정말 깊이 있는 철학적 사유가 담겨있더라고요. TMI도 흥미로웠어요!",
        timestamp: "2024.02.21 10:22",
        likes: 15,
        replies: 2
      }
    ]
  },
  2: {
    book: {
      title: "긴긴밤",
      author: "루쉰",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop"
    },
    messages: [
      {
        id: 1,
        user: "문학청년",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        content: "루쉰의 불면증이 이런 걸작을 낳았다니... 개인적인 고통이 사회적 메시지로 승화된 대표적인 작품인것 같아요.",
        timestamp: "2024.02.19 22:45",
        likes: 18,
        replies: 4
      }
    ]
  }
};

const DiscussionRoom = ({ bookId, onBack }: DiscussionRoomProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(discussionData[bookId]?.messages || []);
  const [likedMessages, setLikedMessages] = useState<number[]>([]);

  const discussion = discussionData[bookId];

  if (!discussion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-amber-900 mb-2">토론방을 찾을 수 없습니다</h2>
          <Button onClick={onBack} className="cozy-gradient text-white">
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      user: "도기",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      content: newMessage,
      timestamp: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\. /g, '.').replace(/\.$/, ''),
      likes: 0,
      replies: 0
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleLike = (messageId: number) => {
    setLikedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-amber-700 hover:text-amber-900">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <img
                src={discussion.book.cover}
                alt={discussion.book.title}
                className="w-12 h-16 object-cover rounded-lg soft-shadow"
              />
              <div>
                <h1 className="text-lg font-bold text-amber-900">{discussion.book.title}</h1>
                <p className="text-sm text-amber-700">{discussion.book.author} · 토론방</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 토론 내용 */}
        <div className="space-y-4 mb-8">
          {messages.map((message) => (
            <Card key={message.id} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={message.avatar}
                    alt={message.user}
                    className="w-10 h-10 rounded-full object-cover soft-shadow flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-amber-900">{message.user}</span>
                      <span className="text-xs text-amber-600">{message.timestamp}</span>
                    </div>
                    
                    <p className="text-amber-800 mb-3 leading-relaxed">{message.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-amber-600">
                      <button
                        onClick={() => handleLike(message.id)}
                        className="flex items-center gap-1 hover:text-amber-800 transition-colors"
                      >
                        <Heart className={`h-4 w-4 ${likedMessages.includes(message.id) ? 'fill-current text-red-500' : ''}`} />
                        <span>{message.likes + (likedMessages.includes(message.id) ? 1 : 0)}</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{message.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 메시지 입력 */}
        <Card className="soft-shadow border-0 bg-white/80 backdrop-blur-sm sticky bottom-4">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                alt="도기"
                className="w-10 h-10 rounded-full object-cover soft-shadow flex-shrink-0"
              />
              
              <div className="flex-1">
                <Textarea
                  placeholder="이 책에 대한 생각을 나눠주세요..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="mb-3 bg-white/70 border-amber-200 resize-none"
                  rows={3}
                />
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="cozy-gradient text-white hover:opacity-90"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    전송
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscussionRoom;
