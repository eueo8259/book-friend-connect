
import { useState } from 'react';
import { ArrowLeft, Heart, BookOpen, Users, Settings, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfileProps {
  onBack: () => void;
}

// 모킹 데이터 - 사용자 정보
const userData = {
  name: "도기",
  nickname: "책읽는도기",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "직장인이 되어 독서를 시작한 초보 독서가입니다. 출퇴근길 독서가 취미예요!",
  followers: 45,
  following: 12,
  booksRead: 23,
  joinDate: "2024년 1월",
  interests: ["자기계발", "에세이", "소설"]
};

// 모킹 데이터 - 팔로우한 큐레이터
const followedCurators = [
  {
    id: 1,
    name: "김서연",
    title: "마음을 다독이는 책방지기",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1ab?w=100&h=100&fit=crop&crop=face",
    followDate: "2024.01.15"
  },
  {
    id: 2,
    name: "박준호", 
    title: "성장하는 직장인의 독서 멘토",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    followDate: "2024.02.03"
  }
];

// 모킹 데이터 - 읽은 책들
const readBooks = [
  {
    id: 1,
    title: "아무튼, 술",
    author: "편혜영",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop",
    rating: 5,
    review: "퇴근 후 혼자만의 시간에 대해 깊이 생각해볼 수 있었어요. 추천!",
    readDate: "2024.02.15",
    curator: "김서연"
  },
  {
    id: 2,
    title: "나는 나로 살기로 했다",
    author: "김수현",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop",
    rating: 4,
    review: "자신을 사랑하는 방법에 대해 배울 수 있었습니다.",
    readDate: "2024.01.28",
    curator: "김서연"
  }
];

const UserProfile = ({ onBack }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("profile");

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
              <h1 className="text-xl font-bold text-amber-900">내 프로필</h1>
              <p className="text-sm text-amber-700">나만의 독서 여정</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 프로필 헤더 */}
        <Card className="soft-shadow border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-24 h-24 rounded-full object-cover soft-shadow"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-900 mb-1">{userData.name}</h2>
                    <p className="text-amber-700 font-medium mb-2">@{userData.nickname}</p>
                    <p className="text-amber-600 mb-2">{userData.bio}</p>
                    <p className="text-sm text-amber-500">{userData.joinDate} 가입</p>
                  </div>
                  
                  <Button className="cozy-gradient text-white hover:opacity-90">
                    <Settings className="h-4 w-4 mr-1" />
                    설정
                  </Button>
                </div>

                {/* 관심사 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {userData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                      {interest}
                    </Badge>
                  ))}
                </div>

                {/* 통계 */}
                <div className="flex items-center gap-6 text-sm text-amber-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{userData.followers}</span>
                    <span>팔로워</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">{userData.following}</span>
                    <span>팔로잉</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">{userData.booksRead}</span>
                    <span>읽은 책</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="profile" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              읽은 책
            </TabsTrigger>
            <TabsTrigger value="curators" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              팔로우 큐레이터
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              활동 기록
            </TabsTrigger>
          </TabsList>

          {/* 읽은 책 탭 */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-4">
              {readBooks.map((book) => (
                <Card key={book.id} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-lg soft-shadow flex-shrink-0"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-amber-900">{book.title}</h3>
                            <p className="text-sm text-amber-700">{book.author}</p>
                          </div>
                          <div className="flex">
                            {[...Array(book.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-amber-700 mb-2">{book.review}</p>
                        
                        <div className="flex items-center justify-between text-xs text-amber-600">
                          <span>큐레이터: {book.curator}</span>
                          <span>{book.readDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 팔로우 큐레이터 탭 */}
          <TabsContent value="curators" className="mt-6">
            <div className="grid gap-4">
              {followedCurators.map((curator) => (
                <Card key={curator.id} className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={curator.avatar} 
                        alt={curator.name}
                        className="w-12 h-12 rounded-full object-cover soft-shadow"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900">{curator.name}</h3>
                        <p className="text-sm text-amber-700">{curator.title}</p>
                        <p className="text-xs text-amber-600">팔로우 시작: {curator.followDate}</p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                        프로필 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 활동 기록 탭 */}
          <TabsContent value="activity" className="mt-6">
            <Card className="soft-shadow border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-amber-900 mb-2">독서 여정을 시작해보세요!</h3>
                <p className="text-amber-700 mb-4">더 많은 책을 읽고 활동을 기록해보세요.</p>
                <Button className="cozy-gradient text-white hover:opacity-90">
                  <Plus className="h-4 w-4 mr-1" />
                  새 책 추가하기
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
