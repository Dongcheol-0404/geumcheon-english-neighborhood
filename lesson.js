export const lesson = {
  title: 'Our Neighborhood, My Voice',
  subtitle: '우리 동네에 관한 자기 생각 쓰기',
  school: '청주 금천고등학교 · 1학년 공통영어1',
  standard: '[10공영1-02-04]',
  standardText: '자신의 생각이나 의견, 감정, 감상 등을 표현한다.',
  steps: [
    {title:'동네 발견', english:'Discover', minutes:5, description:'내가 경험한 장소에서 글감 찾기'},
    {title:'모델 읽기', english:'Explore', minutes:8, description:'의견을 설득력 있게 만드는 네 가지 요소'},
    {title:'표현 챙기기', english:'Collect', minutes:7, description:'내 생각을 이어 주는 영어 표현'},
    {title:'나의 글 쓰기', english:'Create', minutes:15, description:'생각 지도에서 나만의 영어 문단으로'},
    {title:'함께 다듬기', english:'Connect', minutes:10, description:'친구의 독자가 되어 주고 수정하기'},
    {title:'목소리 남기기', english:'Share', minutes:5, description:'돌아보기, PDF로 나의 글 간직하기'}
  ],
  examples: [
    {title:'A place I enjoy', label:'좋아하는 동네 공간', sentences:[
      {role:'opinion', text:'I think the small park near my school is a special place.', ko:'나는 학교 근처 작은 공원이 특별한 곳이라고 생각한다.'},
      {role:'reason', text:'One reason is that I can relax there after a busy day.', ko:'한 가지 이유는 바쁜 하루를 보낸 뒤 그곳에서 쉴 수 있기 때문이다.'},
      {role:'example', text:'For example, I walked there with a friend last Friday.', ko:'예를 들어 지난 금요일 친구와 그곳을 걸었다.'},
      {role:'example', text:'We talked about our favorite songs and felt better.', ko:'우리는 좋아하는 노래에 대해 이야기했고 기분이 나아졌다.'},
      {role:'wish', text:'I hope we can keep this place clean and welcoming.', ko:'우리가 이곳을 깨끗하고 편안한 곳으로 유지하면 좋겠다.'},
      {role:'opinion', text:'To me, a good neighborhood gives people space to rest.', ko:'내게 좋은 동네란 사람들이 쉴 공간을 제공하는 곳이다.'}
    ]},
    {title:'A small change I hope for', label:'더 좋아졌으면 하는 점', sentences:[
      {role:'opinion', text:'I think our neighborhood needs more places to sit.', ko:'나는 우리 동네에 앉을 곳이 더 필요하다고 생각한다.'},
      {role:'reason', text:'One reason is that people need a short break while walking.', ko:'한 가지 이유는 사람들이 걸으면서 잠깐 쉴 시간이 필요하기 때문이다.'},
      {role:'example', text:'For example, I wanted to rest during a walk last weekend.', ko:'예를 들어 나는 지난 주말 산책 중 쉬고 싶었다.'},
      {role:'example', text:'However, I could not find a bench nearby.', ko:'하지만 근처에서 벤치를 찾지 못했다.'},
      {role:'wish', text:'I hope we can have a few more benches along the walking path.', ko:'산책로를 따라 벤치가 조금 더 생기면 좋겠다.'},
      {role:'opinion', text:'This small change could make our neighborhood more comfortable.', ko:'이 작은 변화는 우리 동네를 더 편안하게 만들 수 있다.'}
    ]}
  ],
  roles: {opinion:{label:'의견',english:'Opinion'}, reason:{label:'이유',english:'Reason'}, example:{label:'경험·사례',english:'Example'}, wish:{label:'바라는 점',english:'Hope'}},
  phrases: [
    {role:'opinion', phrase:'I think …', meaning:'나는 …라고 생각한다.', tip:'장소 소개에서 한 걸음 더! 그 장소에 대한 내 판단을 써 보세요.'},
    {role:'reason', phrase:'One reason is that …', meaning:'한 가지 이유는 …이기 때문이다.', tip:'좋다/싫다에서 멈추지 말고 왜 그렇게 생각하는지 설명해요.'},
    {role:'example', phrase:'For example, …', meaning:'예를 들어, …', tip:'내가 직접 보고, 듣고, 느낀 경험 하나를 구체적으로 써요.'},
    {role:'wish', phrase:'I hope we can …', meaning:'우리가 …할 수 있으면 좋겠다.', tip:'유지하고 싶은 점이나 작은 개선 아이디어로 마무리해요.'}
  ],
  vocabulary: [
    ['Places','장소','a park · 공원 / a walking path · 산책로 / a library · 도서관 / a bus stop · 버스 정류장 / a local shop · 동네 가게'],
    ['Feelings','느낌','comfortable · 편안한 / welcoming · 친근한 / peaceful · 평온한 / lively · 활기찬 / crowded · 붐비는'],
    ['Actions','행동','relax · 쉬다 / spend time together · 함께 시간을 보내다 / keep … clean · …을 깨끗하게 유지하다 / add benches · 벤치를 추가하다'],
    ['Connections','연결','because · 왜냐하면 / for example · 예를 들어 / also · 또한 / however · 하지만 / so · 그래서']
  ],
  fields: [
    {id:'place',label:'내가 고른 장소 또는 동네',placeholder:'예: 금천동, 학교 주변 산책길, 내가 사는 동네의 도서관',rows:2,stage:0},
    {id:'memory',label:'그곳에서의 기억 한 장면',placeholder:'언제, 누구와, 무엇을 했나요? 한글로 메모해도 좋아요.',rows:3,stage:0},
    {id:'opinion',label:'1. 내 의견 · Opinion',placeholder:'이 장소를 어떻게 생각하나요? I think …',rows:3,stage:3},
    {id:'reason',label:'2. 그렇게 생각하는 이유 · Reason',placeholder:'왜 그렇게 생각하나요? One reason is that …',rows:3,stage:3},
    {id:'example',label:'3. 나의 구체적인 경험 · Example',placeholder:'직접 겪은 장면을 써 보세요. For example, …',rows:3,stage:3},
    {id:'wish',label:'4. 바라는 점 · Hope',placeholder:'유지하거나 바꾸고 싶은 점은? I hope we can …',rows:3,stage:3},
    {id:'draft',label:'나의 초고 · First draft',placeholder:'위의 생각을 연결해 영어 5~7문장으로 써 보세요. 완벽하지 않아도 괜찮아요.',rows:9,stage:3},
    {id:'peerGood',label:'친구가 찾은 좋은 점',placeholder:'의견이 잘 드러난 문장이나 구체적인 경험을 짚어 주세요.',rows:3,stage:4},
    {id:'peerQuestion',label:'친구가 더 궁금한 점',placeholder:'예: Why do you think so? / Can you give an example?',rows:3,stage:4},
    {id:'final',label:'나의 최종 글 · My neighborhood, my voice',placeholder:'친구의 피드백을 참고해 내 목소리가 담긴 영어 글을 완성하세요.',rows:10,stage:4},
    {id:'reflection',label:'오늘의 한 줄 돌아보기',placeholder:'내 글에서 가장 마음에 드는 문장이나 다음에 더 해 보고 싶은 것을 적어요.',rows:3,stage:5}
  ],
  checks: [
    '동네에 대한 내 생각이 분명하게 드러난다.',
    '내 생각을 뒷받침하는 이유가 있다.',
    '내가 경험한 구체적인 사례가 있다.',
    '연결어를 사용해 문장이 자연스럽게 이어진다.',
    '바라는 점을 포함하고, 읽는 사람이 의미를 이해할 수 있다.'
  ],
  rubric: [
    ['자기 의견','동네에 대한 자기 판단이 분명하다.','장소 소개만 있다면 I think로 의견을 덧붙인다.'],
    ['이유와 사례','이유와 구체적 경험이 의견을 뒷받침한다.','언제, 누구와, 무슨 일이 있었는지 한 장면을 추가한다.'],
    ['글의 연결','의견, 이유, 경험, 바라는 점이 자연스럽게 이어진다.','because, for example, however 등을 알맞게 사용한다.'],
    ['의미 전달','다소 오류가 있어도 읽는 사람이 뜻을 이해할 수 있다.','주어와 동사, 시제, 문장 끝 부호를 점검한다.']
  ]
};

export function wordCount(text) { return (text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[]).length; }
export function sentenceCount(text) { return text.trim() ? text.split(/[.!?]+(?:["”']|\s|$)/).filter(s=>s.trim()).length : 0; }
export function cleanAnswers(value) {
  const result = {};
  for (const field of lesson.fields) result[field.id] = typeof value?.[field.id] === 'string' ? value[field.id].slice(0,12000) : '';
  result.checks = Array.isArray(value?.checks) ? lesson.checks.map((_,i)=>value.checks[i]===true) : lesson.checks.map(()=>false);
  return result;
}
