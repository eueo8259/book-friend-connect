
import { useState } from 'react';
import { ArrowLeft, Search, BookOpen, Heart, MessageCircle, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TMIDatabaseProps {
  onBack: () => void;
  onDiscussionRoom: (bookId: number) => void;
}

// TMI 데이터
const tmiData = [
  {
    id: 1,
    title: "아무튼, 술",
    author: "편혜영",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    tmi: "이 책은 작가가 실제로 술을 마시며 쓴 에세이가 아니라, 술에 대한 다양한 생각과 감정을 담은 철학적 에세이입니다. 제목과 달리 술 마시는 방법보다는 인생에 대한 깊은 성찰을 다루고 있어요.",
    likes: 127,
    discussions: 23,
    tags: ["에세이", "철학", "일상"],
    curator: "김서연",
    verificationLevel: "공식 기록"
  },
  {
    id: 2,
    title: "긴긴밤",
    author: "루쉰",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
    tmi: "루쉰의 '긴긴밤'은 사실 그의 개인적인 불면증 경험에서 시작되었습니다. 작가는 밤마다 잠들지 못하고 뒤척이며 중국 사회의 현실을 생각했고, 그 고뇌가 고스란히 작품에 녹아들었습니다.",
    likes: 89,
    discussions: 31,
    tags: ["중국문학", "현실주의", "사회비판"],
    curator: "이소현",
    verificationLevel: "연구 자료"
  },
  {
    id: 3,
    title: "나는 나로 살기로 했다",
    author: "김수현",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
    tmi: "저자 김수현은 이 책을 쓰기 전 3년간 우울증으로 고생했습니다. 심리 상담을 받으며 자신과 마주한 과정이 고스란히 책에 담겨있어, 많은 독자들이 '내 이야기 같다'고 공감하는 이유입니다.",
    likes: 203,
    discussions: 45,
    tags: ["자기계발", "심리", "힐링"],
    curator: "박준호",
    verificationLevel: "작가 인터뷰"
  },
  {
    id: 4,
    title: "코스모스",
    author: "칼 세이건",
    cover: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=280&fit=crop",
    tmi: "칼 세이건은 이 책을 쓰면서 13세 된 자신의 아들에게 우주에 대해 설명한다는 마음으로 집필했습니다. 그래서 복잡한 과학 이론도 쉽고 따뜻한 언어로 표현되어 있어요.",
    likes: 156,
    discussions: 28,
    tags: ["과학", "우주", "철학"],
    curator: "최민준",
    verificationLevel: "공식 기록"
  }
];

const TMIDatabase = ({ onBack, onDiscussionRoom }: TMIDatabaseProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedTMIs, setLikedTMIs] = useState<number[]>([]);

  const filteredTMIs = tmiData.filter(tmi => 
    tmi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tmi.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tmi.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLike = (tmiId: number) => {
    setLikedTMIs(prev => 
      prev.includes(tmiId) 
        ? prev.filter(id => id !== tmiId)
        : [...prev, tmiId]
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
            <div>
              <h1 className="text-xl font-bold text-amber-900">책 TMI 데이터베이스</h1>
              <p className="text-sm text-amber-700">책 속 숨겨진 이야기들</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 검색 바 */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
            <Input
              placeholder="책 제목, 작가, 태그로 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70 backdrop-blur-sm border-amber-200"
            />
          </div>
        </div>

        {/* TMI 리스트 */}
        <div className="space-y-6">
          {filteredTMIs.map((tmi) => (
            <Card key={tmi.id} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={tmi.cover}
                    alt={tmi.title}
                    className="w-20 h-28 object-cover rounded-lg soft-shadow flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-amber-900 mb-1">{tmi.title}</h3>
                        <p className="text-amber-700">{tmi.author}</p>
                      </div>
                      <Badge variant="outline" className="border-amber-200 text-amber-700">
                        {tmi.verificationLevel}
                      </Badge>
                    </div>

                    <div className="bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2 mb-2">
                        <BookOpen className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 leading-relaxed">{tmi.tmi}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tmi.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-amber-600">
                        <button
                          onClick={() => handleLike(tmi.id)}
                          className="flex items-center gap-1 hover:text-amber-800 transition-colors"
                        >
                          <Heart className={`h-4 w-4 ${likedTMIs.includes(tmi.id) ? 'fill-current text-red-500' : ''}`} />
                          <span>{tmi.likes + (likedTMIs.includes(tmi.id) ? 1 : 0)}</span>
                        </button>
                        <button
                          onClick={() => onDiscussionRoom(tmi.id)}
                          className="flex items-center gap-1 hover:text-amber-800 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{tmi.discussions}</span>
                        </button>
                        <span>큐레이터: {tmi.curator}</span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDiscussionRoom(tmi.id)}
                        className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        토론 참여
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTMIs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-amber-700">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TMIDatabase;
