import { useState } from 'react';
import { Heart, Users, BookOpen, Star, ChevronRight, User, TrendingUp, Library, Filter, Database, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CuratorProfile from '@/components/CuratorProfile';
import UserProfile from '@/components/UserProfile';
import TMIDatabase from '@/components/TMIDatabase';
import DiscussionRoom from '@/components/DiscussionRoom';
import CuratorSurvey from '@/components/CuratorSurvey';

// 모킹 데이터 - 큐레이터들
const curators = [
  {
    id: 1,
    name: "김서연",
    title: "마음을 다독이는 책방지기",
    followers: 12500,
    books: 89,
    rating: 4.9,
    bio: "퇴근 후 혼자만의 시간을 소중히 여기는 직장인입니다. 일상의 작은 위로가 되는 책들을 찾아 소개해드려요.",
    tags: ["힐링", "에세이", "자기계발"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1ab?w=150&h=150&fit=crop&crop=face",
    recentBook: "아무튼, 술",
    personalNote: "바쁜 일상 속에서도 나만의 시간을 찾고 싶은 분들에게",
    specialty: "직장인을 위한 마음챙김"
  },
  {
    id: 2,
    name: "박준호",
    title: "성장하는 직장인의 독서 멘토",
    followers: 18200,
    books: 156,
    rating: 4.8,
    bio: "7년차 마케터로 일하며 독서를 통해 성장해온 이야기를 나눕니다. 실무에 바로 적용할 수 있는 인사이트를 담은 책들을 추천해요.",
    tags: ["비즈니스", "마케팅", "리더십"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    recentBook: "마케팅 불변의 법칙",
    personalNote: "커리어 성장에 목마른 직장인들과 함께 성장하고 싶어요",
    specialty: "실무진을 위한 성장 가이드"
  },
  {
    id: 3,
    name: "이소현",
    title: "감성 충전소 운영자",
    followers: 9800,
    books: 124,
    rating: 4.9,
    bio: "감성이 메마른 도시 생활 속에서 마음에 물을 주는 책들을 큐레이션합니다. 소설과 시집을 좋아해요.",
    tags: ["소설", "시집", "감성"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    recentBook: "달러구트 꿈 백화점",
    personalNote: "일상의 따뜻함을 찾고 싶은 모든 분들께",
    specialty: "마음을 따뜻하게 하는 이야기"
  },
  {
    id: 4,
    name: "최민준",
    title: "지적 호기심 탐험가",
    followers: 15600,
    books: 203,
    rating: 4.7,
    bio: "과학부터 철학까지, 세상에 대한 궁금증을 책으로 해결해가는 여정을 함께해요. 어려운 내용도 쉽게 설명드려요.",
    tags: ["과학", "철학", "인문학"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    recentBook: "코스모스",
    personalNote: "세상에 대한 호기심이 많은 분들과 지적 여행을 떠나고 싶어요",
    specialty: "복잡한 세상을 이해하는 열쇠"
  },
  {
    id: 5,
    name: "정하은",
    title: "라이프스타일 디자이너",
    followers: 11400,
    books: 97,
    rating: 4.8,
    bio: "더 나은 삶을 위한 작은 변화들을 제안하는 책들을 소개합니다. 미니멀하고 의미 있는 라이프스타일에 관심이 많아요.",
    tags: ["라이프스타일", "미니멀", "습관"],
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    recentBook: "미니멀 라이프",
    personalNote: "더 나은 나를 만들어가고 싶은 분들에게",
    specialty: "작은 변화로 만드는 큰 차이"
  }
];

// 새로운 모킹 데이터 - 베스트 책들
const bestBooks = [
  {
    id: 1,
    title: "아무튼, 술",
    author: "편혜영",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    curatorCount: 8,
    avgRating: 4.9,
    purchaseUrl: "https://www.yes24.com/Product/Goods/123456",
    genre: "에세이",
    description: "8명의 큐레이터가 한목소리로 추천한 책"
  },
  {
    id: 2,
    title: "긴긴밤",
    author: "루쉰",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
    curatorCount: 6,
    avgRating: 4.8,
    purchaseUrl: "https://www.yes24.com/Product/Goods/234567",
    genre: "소설",
    description: "6명의 큐레이터가 추천한 현대인의 고독을 그린 작품"
  },
  {
    id: 3,
    title: "나는 나로 살기로 했다",
    author: "김수현",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
    curatorCount: 7,
    avgRating: 4.7,
    purchaseUrl: "https://www.yes24.com/Product/Goods/345678",
    genre: "자기계발",
    description: "7명의 큐레이터가 추천한 자기 사랑 가이드"
  }
];

// 장르별 큐레이터 데이터
const genreCurators = {
  "자기계발": [
    { ...curators[1], specialty: "직장인 성장" },
    { ...curators[4], specialty: "라이프스타일 개선" }
  ],
  "소설/에세이": [
    { ...curators[0], specialty: "감성 힐링" },
    { ...curators[2], specialty: "감성 충전" }
  ],
  "인문학": [
    { ...curators[3], specialty: "지적 탐구" }
  ]
};

const Index = () => {
  const [selectedCurator, setSelectedCurator] = useState<number | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showTMIDatabase, setShowTMIDatabase] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [activeTab, setActiveTab] = useState("curators");

  if (selectedCurator) {
    const curator = curators.find(c => c.id === selectedCurator);
    return <CuratorProfile curator={curator!} onBack={() => setSelectedCurator(null)} />;
  }

  if (showUserProfile) {
    return <UserProfile onBack={() => setShowUserProfile(false)} />;
  }

  if (showTMIDatabase) {
    return <TMIDatabase 
      onBack={() => setShowTMIDatabase(false)} 
      onDiscussionRoom={(bookId) => setSelectedDiscussion(bookId)}
    />;
  }

  if (selectedDiscussion) {
    return <DiscussionRoom 
      bookId={selectedDiscussion} 
      onBack={() => setSelectedDiscussion(null)}
    />;
  }

  if (showSurvey) {
    return <CuratorSurvey 
      onBack={() => setShowSurvey(false)}
      onRecommendation={(curator) => {
        setShowSurvey(false);
        setSelectedCurator(curator.id);
      }}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">북프렌드</h1>
              <p className="text-sm text-amber-700">당신과 잘 맞는 큐레이터와 함께하는 독서</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSurvey(true)}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Star className="h-4 w-4 mr-1" />
                맞춤 큐레이터 찾기
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTMIDatabase(true)}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Database className="h-4 w-4 mr-1" />
                책 TMI
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUserProfile(true)}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <User className="h-4 w-4 mr-1" />
                내 프로필
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 인트로 섹션 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            어떤 책을 읽을지 고민이세요?
          </h2>
          <p className="text-lg text-amber-700 mb-2">
            당신의 취향과 상황에 맞는 <span className="font-semibold text-amber-800">큐레이터</span>를 먼저 찾아보세요
          </p>
          <p className="text-amber-600">
            신뢰할 수 있는 추천으로 더 나은 독서 경험을 시작하세요
          </p>
        </div>

        {/* 탭 메뉴 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm mb-8">
            <TabsTrigger value="curators" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              <Users className="h-4 w-4 mr-2" />
              큐레이터 탐색
            </TabsTrigger>
            <TabsTrigger value="best-books" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              <TrendingUp className="h-4 w-4 mr-2" />
              베스트 추천도서
            </TabsTrigger>
            <TabsTrigger value="by-genre" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              <Library className="h-4 w-4 mr-2" />
              장르별 큐레이터
            </TabsTrigger>
            <TabsTrigger value="tmi" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              <Database className="h-4 w-4 mr-2" />
              책 TMI & 토론
            </TabsTrigger>
          </TabsList>

          {/* 큐레이터 탭 */}
          <TabsContent value="curators">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-800">추천순으로 정렬</span>
              </div>
              <div className="text-sm text-amber-600">
                {curators.length}명의 큐레이터가 당신을 기다리고 있어요
              </div>
            </div>

            <div className="grid gap-6">
              {curators.map((curator, index) => (
                <Card
                  key={curator.id}
                  className="soft-shadow hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                  onClick={() => setSelectedCurator(curator.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* 순위 배지 */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full cozy-gradient flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>

                      {/* 프로필 이미지 */}
                      <div className="flex-shrink-0">
                        <img
                          src={curator.avatar}
                          alt={curator.name}
                          className="w-20 h-20 rounded-full object-cover soft-shadow"
                        />
                      </div>

                      {/* 큐레이터 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-1">{curator.name}</h3>
                            <p className="text-amber-700 font-medium">{curator.title}</p>
                            <p className="text-sm text-amber-600 mt-1">{curator.specialty}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0" />
                        </div>

                        <p className="text-amber-700 mb-4 leading-relaxed">
                          {curator.bio}
                        </p>

                        {/* 개인적인 메시지 */}
                        <div className="bg-amber-50/70 rounded-lg p-3 mb-4">
                          <p className="text-sm text-amber-800 italic">
                            💝 "{curator.personalNote}"
                          </p>
                        </div>

                        {/* 태그들 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {curator.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* 최근 추천 도서 */}
                        <div className="bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-lg p-3 mb-4">
                          <p className="text-xs text-amber-600 font-medium mb-1">최근 추천</p>
                          <p className="text-sm text-amber-800 font-semibold">📚 {curator.recentBook}</p>
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
              ))}
            </div>
          </TabsContent>

          {/* 베스트 추천도서 탭 */}
          <TabsContent value="best-books">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                🏆 큐레이터들이 입을 모아 추천한 책들
              </h3>
              <p className="text-amber-700">
                여러 큐레이터가 한목소리로 추천한 검증된 도서들을 만나보세요
              </p>
            </div>

            <div className="grid gap-6">
              {bestBooks.map((book, index) => (
                <Card key={book.id} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full cozy-gradient flex items-center justify-center text-white font-bold text-sm mb-4">
                          {index + 1}
                        </div>
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-24 h-32 object-cover rounded-lg soft-shadow"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-1">{book.title}</h3>
                            <p className="text-amber-700">{book.author}</p>
                          </div>
                          <Badge variant="outline" className="border-amber-200 text-amber-700">
                            {book.genre}
                          </Badge>
                        </div>

                        <p className="text-amber-700 mb-4">{book.description}</p>

                        <div className="bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-amber-600" />
                              <span className="font-medium">{book.curatorCount}명</span>
                              <span className="text-amber-600">큐레이터 추천</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-amber-400" />
                              <span className="font-medium">{book.avgRating}</span>
                              <span className="text-amber-600">평균 평점</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="cozy-gradient text-white hover:opacity-90"
                            onClick={() => window.open(book.purchaseUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            교보문고에서 구매
                          </Button>
                          <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                            추천 큐레이터 보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 장르별 큐레이터 탭 */}
          <TabsContent value="by-genre">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                📚 장르별로 큐레이터를 찾아보세요
              </h3>
              <p className="text-amber-700">
                관심 있는 장르의 전문 큐레이터들을 만나보세요
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(genreCurators).map(([genre, curatorList]) => (
                <div key={genre}>
                  <h4 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    {genre}
                  </h4>

                  <div className="grid gap-4">
                    {curatorList.map((curator) => (
                      <Card
                        key={curator.id}
                        className="soft-shadow hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                        onClick={() => setSelectedCurator(curator.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={curator.avatar}
                              alt={curator.name}
                              className="w-16 h-16 rounded-full object-cover soft-shadow"
                            />

                            <div className="flex-1">
                              <h3 className="font-bold text-amber-900">{curator.name}</h3>
                              <p className="text-amber-700 text-sm">{curator.title}</p>
                              <p className="text-amber-600 text-xs">{curator.specialty}</p>

                              <div className="flex items-center gap-4 text-xs text-amber-600 mt-2">
                                <div className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{curator.followers.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  <span>{curator.books}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-current text-amber-400" />
                                  <span>{curator.rating}</span>
                                </div>
                              </div>
                            </div>

                            <ChevronRight className="h-5 w-5 text-amber-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 책 TMI & 토론 탭 */}
          <TabsContent value="tmi">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                📚 책 속 숨겨진 이야기들
              </h3>
              <p className="text-amber-700">
                책에 담긴 흥미로운 TMI를 발견하고, 다른 독자들과 이야기를 나눠보세요
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* TMI 데이터베이스 카드 */}
              <Card 
                className="soft-shadow border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all cursor-pointer"
                onClick={() => setShowTMIDatabase(true)}
              >
                <CardContent className="p-6 text-center">
                  <Database className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-amber-900 mb-2">TMI 데이터베이스</h3>
                  <p className="text-amber-700 mb-4">
                    책에 숨겨진 흥미로운 이야기들을 발견해보세요
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-amber-600 mb-4">
                    <span>📖 50+ 도서</span>
                    <span>💡 200+ TMI</span>
                    <span>✨ 매일 업데이트</span>
                  </div>
                  <Button className="cozy-gradient text-white hover:opacity-90 w-full">
                    TMI 둘러보기
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              {/* 인기 토론방 카드 */}
              <Card className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-6 w-6 text-amber-500" />
                    <h3 className="text-lg font-bold text-amber-900">인기 토론방</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div 
                      className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedDiscussion(1)}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=40&h=50&fit=crop"
                        alt="아무튼, 술"
                        className="w-8 h-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-amber-900 text-sm">아무튼, 술</p>
                        <p className="text-xs text-amber-600">23개 댓글</p>
                      </div>
                    </div>
                    
                    <div 
                      className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedDiscussion(2)}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=40&h=50&fit=crop"
                        alt="긴긴밤"
                        className="w-8 h-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-amber-900 text-sm">긴긴밤</p>
                        <p className="text-xs text-amber-600">31개 댓글</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => setShowTMIDatabase(true)}
                  >
                    모든 토론방 보기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 하단 메시지 */}
        <div className="text-center mt-12 p-8 bg-white/50 rounded-2xl soft-shadow">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">
            아직 마음에 드는 큐레이터를 찾지 못하셨나요?
          </h3>
          <p className="text-amber-700 mb-4">
            간단한 설문을 통해 당신에게 딱 맞는 큐레이터를 찾아드릴게요.
          </p>
          <Button 
            className="cozy-gradient text-white hover:opacity-90 transition-opacity"
            onClick={() => setShowSurvey(true)}
          >
            <Star className="h-4 w-4 mr-2" />
            맞춤 큐레이터 찾기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
