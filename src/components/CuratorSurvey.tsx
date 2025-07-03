
import { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Heart, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CuratorSurveyProps {
  onBack: () => void;
  onRecommendation: (curator: any) => void;
}

const surveyQuestions = [
  {
    id: 1,
    question: "주로 언제 책을 읽으시나요?",
    options: [
      { id: 'morning', text: "아침 출근 전", weight: { healing: 2, growth: 1 } },
      { id: 'commute', text: "출퇴근 시간", weight: { growth: 2, practical: 1 } },
      { id: 'evening', text: "퇴근 후 저녁", weight: { healing: 2, emotion: 1 } },
      { id: 'weekend', text: "주말 여유시간", weight: { deep: 2, emotion: 1 } }
    ]
  },
  {
    id: 2,
    question: "어떤 상황에서 책을 찾게 되시나요?",
    options: [
      { id: 'stress', text: "스트레스가 쌓일 때", weight: { healing: 3 } },
      { id: 'growth', text: "성장하고 싶을 때", weight: { growth: 3 } },
      { id: 'lonely', text: "혼자 있을 때", weight: { emotion: 3 } },
      { id: 'curious', text: "새로운 지식이 궁금할 때", weight: { deep: 3 } }
    ]
  },
  {
    id: 3,
    question: "책을 통해 얻고 싶은 것은?",
    options: [
      { id: 'comfort', text: "마음의 위로", weight: { healing: 2, emotion: 1 } },
      { id: 'skill', text: "실무 스킬", weight: { practical: 3 } },
      { id: 'insight', text: "인생 통찰", weight: { deep: 2, growth: 1 } },
      { id: 'escape', text: "현실 탈출", weight: { emotion: 2, healing: 1 } }
    ]
  },
  {
    id: 4,
    question: "선호하는 책의 두께는?",
    options: [
      { id: 'thin', text: "얇고 간결한 책", weight: { practical: 1, healing: 1 } },
      { id: 'medium', text: "적당한 두께", weight: { growth: 1, emotion: 1 } },
      { id: 'thick', text: "두꺼워도 괜찮음", weight: { deep: 2 } }
    ]
  }
];

const curatorRecommendations = {
  healing: {
    id: 1,
    name: "김서연",
    title: "마음을 다독이는 책방지기",
    specialty: "직장인을 위한 마음챙김",
    matchReason: "바쁜 일상 속에서도 마음의 위로를 찾고 계시는 당신에게 딱 맞는 큐레이터예요.",
    personalityTraits: ["공감 능력이 뛰어남", "따뜻한 소통 스타일", "실용적 조언 제공"],
    recommendationStyle: "개인의 감정 상태를 고려한 맞춤형 추천"
  },
  growth: {
    id: 2,
    name: "박준호",
    title: "성장하는 직장인의 독서 멘토",
    specialty: "실무진을 위한 성장 가이드",
    matchReason: "커리어 성장과 자기계발에 관심이 많은 당신을 위한 최적의 가이드입니다.",
    personalityTraits: ["목표 지향적", "실용적 접근", "동기 부여 전문"],
    recommendationStyle: "단계별 성장 로드맵과 함께하는 체계적 추천"
  },
  emotion: {
    id: 3,
    name: "이소현",
    title: "감성 충전소 운영자",
    specialty: "마음을 따뜻하게 하는 이야기",
    matchReason: "감성적인 독서를 통해 일상에 온기를 더하고 싶은 당신에게 추천합니다.",
    personalityTraits: ["섬세한 감성", "스토리텔링 전문", "공감대 형성"],
    recommendationStyle: "계절과 기분에 맞는 감성적 도서 추천"
  },
  deep: {
    id: 4,
    name: "최민준",
    title: "지적 호기심 탐험가",
    specialty: "복잡한 세상을 이해하는 열쇠",
    matchReason: "깊이 있는 사고와 지적 탐구를 즐기는 당신을 위한 전문 큐레이터입니다.",
    personalityTraits: ["논리적 사고", "깊이 있는 분석", "다각적 접근"],
    recommendationStyle: "주제별 심화 학습과 연계 도서 추천"
  },
  practical: {
    id: 5,
    name: "정하은",
    title: "라이프스타일 디자이너",
    specialty: "작은 변화로 만드는 큰 차이",
    matchReason: "실질적이고 적용 가능한 변화를 원하는 당신에게 적합한 큐레이터입니다.",
    personalityTraits: ["실용성 중시", "변화 관리 전문", "단순 명확함"],
    recommendationStyle: "실행 가능한 액션 플랜과 함께하는 추천"
  }
};

const CuratorSurvey = ({ onBack, onRecommendation }: CuratorSurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [recommendedCurator, setRecommendedCurator] = useState<any>(null);

  const handleAnswer = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption('');

    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 설문 완료 - 결과 계산
      calculateRecommendation(newAnswers);
    }
  };

  const calculateRecommendation = (userAnswers: string[]) => {
    const scores = { healing: 0, growth: 0, emotion: 0, deep: 0, practical: 0 };
    
    userAnswers.forEach((answer, questionIndex) => {
      const question = surveyQuestions[questionIndex];
      const option = question.options.find(opt => opt.id === answer);
      if (option) {
        Object.entries(option.weight).forEach(([key, value]) => {
          scores[key as keyof typeof scores] += value;
        });
      }
    });

    const topCategory = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0] as keyof typeof scores;

    setRecommendedCurator(curatorRecommendations[topCategory]);
    setShowResult(true);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (showResult && recommendedCurator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-amber-700 hover:text-amber-900">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-amber-900">맞춤 큐레이터 추천 결과</h1>
                <p className="text-sm text-amber-700">당신에게 딱 맞는 큐레이터를 찾았어요!</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="soft-shadow border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-900 mb-4">
                🎉 당신의 독서 파트너를 찾았습니다!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">{recommendedCurator.name}</h2>
                <p className="text-lg text-amber-700 mb-1">{recommendedCurator.title}</p>
                <p className="text-amber-600">{recommendedCurator.specialty}</p>
              </div>

              <div className="bg-gradient-to-r from-amber-100/70 to-orange-100/70 rounded-lg p-6">
                <h3 className="font-semibold text-amber-900 mb-2">💡 추천 이유</h3>
                <p className="text-amber-800">{recommendedCurator.matchReason}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">🎭 큐레이터 성향</h3>
                  <div className="space-y-2">
                    {recommendedCurator.personalityTraits.map((trait: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800 mr-2">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">📚 추천 스타일</h3>
                  <p className="text-amber-700 text-sm">{recommendedCurator.recommendationStyle}</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  className="cozy-gradient text-white hover:opacity-90"
                  onClick={() => onRecommendation(recommendedCurator)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  이 큐레이터와 시작하기
                </Button>
                <Button 
                  variant="outline" 
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                  }}
                >
                  다시 설문하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-amber-700 hover:text-amber-900">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-amber-900">나와 맞는 큐레이터 찾기</h1>
              <p className="text-sm text-amber-700">간단한 질문으로 최적의 독서 파트너를 찾아드려요</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-amber-600">
              {currentQuestion + 1} / {surveyQuestions.length}
            </span>
            <div className="flex-1 mx-4 bg-amber-100 rounded-full h-2">
              <div 
                className="cozy-gradient h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <Card className="soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-amber-900 mb-6 text-center">
              {surveyQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {surveyQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedOption === option.id
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-amber-100 hover:border-amber-200 hover:bg-amber-25'
                  }`}
                >
                  <span className="text-amber-900">{option.text}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="cozy-gradient text-white hover:opacity-90"
              >
                {currentQuestion === surveyQuestions.length - 1 ? '결과 보기' : '다음'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CuratorSurvey;
