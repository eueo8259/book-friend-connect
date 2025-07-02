import { useState } from 'react';
import { ArrowLeft, Heart, Users, BookOpen, Star, MessageCircle, Share2, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Curator {
  id: number;
  name: string;
  title: string;
  followers: number;
  books: number;
  rating: number;
  bio: string;
  tags: string[];
  avatar: string;
  recentBook: string;
  personalNote: string;
  specialty: string;
}

interface CuratorProfileProps {
  curator: Curator;
  onBack: () => void;
}

// 모킹 데이터 - 추천 도서들 (구매 링크 추가)
const recommendedBooks = [
  {
    id: 1,
    title: "아무튼, 술",
    author: "편혜영",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    reason: "퇴근 후 혼자 마시는 술 한 잔의 의미를 담담하게 그려낸 에세이예요. 일상의 작은 위로가 필요한 순간에 읽어보세요.",
    genre: "에세이",
    readingTime: "2시간",
    difficulty: "쉬움",
    personalMessage: "이 책을 읽고 나면, 혼자만의 시간이 더 소중하게 느껴질 거예요.",
    purchaseUrl: "https://www.yes24.com/Product/Goods/123456",
    price: "13,500원"
  },
  {
    id: 2,
    title: "긴긴밤",
    author: "루쉰",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
    reason: "잠들지 못하는 밤, 복잡한 생각들로 가득할 때 읽기 좋은 단편들이에요. 현대인의 고독을 섬세하게 담아냈어요.",
    genre: "소설",
    readingTime: "3시간",
    difficulty: "보통",
    personalMessage: "불면의 밤이 외롭지 않게 해주는 책이에요.",
    purchaseUrl: "https://www.yes24.com/Product/Goods/234567",
    price: "12,600원"
  },
  {
    id: 3,
    title: "나는 나로 살기로 했다",
    author: "김수현",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
    reason: "타인의 시선에서 벗어나 자신만의 속도로 살아가는 법을 알려주는 책이에요. 직장생활에 지쳤을 때 큰 위로가 됩니다.",
    genre: "자기계발",
    readingTime: "4시간", 
    difficulty: "쉬움",
    personalMessage: "자신을 사랑하는 방법을 잊었을 때 다시 기억할 수 있게 해주는 책이에요.",
    purchaseUrl: "https://www.yes24.com/Product/Goods/345678",
    price: "14,400원"
  }
];

const CuratorProfile = ({ curator, onBack }: CuratorProfileProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

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
              <h1 className="text-xl font-bold text-amber-900">{curator.name}님의 서재</h1>
              <p className="text-sm text-amber-700">{curator.title}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 큐레이터 프로필 헤더 */}
        <Card className="soft-shadow border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <img 
                src={curator.avatar} 
                alt={curator.name}
                className="w-24 h-24 rounded-full object-cover soft-shadow"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-900 mb-2">{curator.name}</h2>
                    <p className="text-lg text-amber-700 font-medium mb-2">{curator.title}</p>
                    <p className="text-amber-600">{curator.specialty}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      공유
                    </Button>
                    <Button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={isFollowing ? 
                        "bg-amber-200 text-amber-800 hover:bg-amber-300" : 
                        "cozy-gradient text-white hover:opacity-90"
                      }
                    >
                      <Heart className={`h-4 w-4 mr-1 ${isFollowing ? 'fill-current' : ''}`} />
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </Button>
                  </div>
                </div>

                {/* 큐레이터 소개 */}
                <p className="text-amber-700 leading-relaxed mb-4">
                  {curator.bio}
                </p>

                {/* 개인적인 메시지 */}
                <div className="bg-gradient-to-r from-amber-100/70 to-orange-100/70 rounded-lg p-4 mb-4">
                  <p className="text-amber-800 italic">
                    💝 "{curator.personalNote}"
                  </p>
                </div>

                {/* 태그들 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {curator.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 통계 */}
                <div className="flex items-center gap-6 text-sm text-amber-600">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">{curator.followers.toLocaleString()}</span>
                    <span>팔로워</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">{curator.books}</span>
                    <span>추천도서</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-amber-400" />
                    <span className="font-medium">{curator.rating}</span>
                    <span>만족도</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="books" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              추천 도서
            </TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              큐레이터 스토리
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              독자 후기
            </TabsTrigger>
          </TabsList>

          {/* 추천 도서 탭 */}
          <TabsContent value="books" className="mt-6">
            <div className="grid gap-6">
              {recommendedBooks.map((book) => (
                <Card key={book.id} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded-lg soft-shadow flex-shrink-0"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-1">{book.title}</h3>
                            <p className="text-amber-700">{book.author}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="border-amber-200 text-amber-700 mb-2">
                              {book.genre}
                            </Badge>
                            <p className="text-sm font-semibold text-amber-800">{book.price}</p>
                          </div>
                        </div>

                        <p className="text-amber-700 leading-relaxed mb-4">
                          {book.reason}
                        </p>

                        {/* 큐레이터의 개인적인 메시지 */}
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-amber-800 italic">
                            💭 {curator.name}의 한마디: "{book.personalMessage}"
                          </p>
                        </div>

                        {/* 도서 정보 */}
                        <div className="flex items-center gap-4 text-sm text-amber-600 mb-4">
                          <span>📖 {book.readingTime}</span>
                          <span>📊 {book.difficulty}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="cozy-gradient text-white hover:opacity-90"
                            onClick={() => window.open(book.purchaseUrl, '_blank')}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            책 구매하기
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                            onClick={() => {
                              // 위시리스트 추가 로직
                              alert('읽고 싶은 책에 추가되었습니다! 📚');
                            }}
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            읽고 싶어요
                          </Button>
                          <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            후기 보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 큐레이터 스토리 탭 */}
          <TabsContent value="story" className="mt-6">
            <Card className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-amber-900 mb-6">나의 독서 여정</h3>
                
                <div className="space-y-6 text-amber-700 leading-relaxed">
                  <p>
                    안녕하세요, {curator.name}입니다. 저도 여러분과 같은 평범한 직장인이었어요. 
                    매일 반복되는 일상 속에서 뭔가 다른 것을 찾고 싶었고, 그때 독서를 시작하게 되었습니다.
                  </p>
                  
                  <p>
                    처음엔 어떤 책을 읽어야 할지 막막했어요. 베스트셀러를 따라 읽어보기도 하고, 
                    유명한 사람들이 추천한 책을 읽어보기도 했지만, 끝까지 읽지 못하는 경우가 많았습니다.
                  </p>
                  
                  <p>
                    그러다 깨달은 것은, 나와 비슷한 상황에 있는 사람이 추천하는 책이 가장 와닿는다는 것이었어요. 
                    그래서 저는 같은 고민을 하고 있는 직장인들에게 제가 직접 읽고 위로받은 책들을 소개하고 싶었습니다.
                  </p>
                  
                  <div className="bg-amber-50/70 rounded-lg p-4">
                    <p className="font-medium text-amber-800">
                      "책은 단순한 정보가 아니라, 마음을 다독이는 친구 같은 존재라고 생각해요."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 독자 후기 탭 */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {[
                {
                  name: "김○○",
                  rating: 5,
                  comment: "정말 제 마음을 아시는 것 같아요. 추천해주신 책들이 모두 제 취향이었습니다!",
                  book: "아무튼, 술"
                },
                {
                  name: "박○○", 
                  rating: 5,
                  comment: "힘든 하루를 보낸 후 읽으니 정말 위로가 되었어요. 감사합니다.",
                  book: "긴긴밤"
                },
                {
                  name: "이○○",
                  rating: 4,
                  comment: "큐레이터님의 개인적인 메시지가 특히 좋았어요. 책에 대한 애정이 느껴집니다.",
                  book: "나는 나로 살기로 했다"
                }
              ].map((review, index) => (
                <Card key={index} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-amber-900">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <Badge variant="outline" className="border-amber-200 text-amber-700 text-xs">
                        {review.book}
                      </Badge>
                    </div>
                    <p className="text-amber-700 text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CuratorProfile;
