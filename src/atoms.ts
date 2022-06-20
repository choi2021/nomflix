import { atom } from 'recoil';
import { IContent } from './interface';

export const myContents = atom<IContent[]>({
  key: 'selected',
  default: [
    {
      adult: false,
      backdrop_path: '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg',
      genre_ids: [28, 12, 878],
      id: 299537,
      original_language: 'en',
      original_title: 'Captain Marvel',
      overview:
        '외계 크리 문명의 수도 할리, 캐롤 댄버스은 압도적인 능력을 가진 전사다. 그는 멘토 욘 로그로부터 힘을 통제하고 과거의 기억은 묻어야 한다는 가르침을 받고 있다. 그러던 어느 날, 변방 행성 토르파에서 스크럴 종족에게 붙잡혀 뇌를 스캔당한 캐롤은 과거 자신이 낯선 행성의 파일럿이었음을 알게 된다. 스크럴을 따돌리고 탈출하는 과정에서 공교롭게 C-53 행성, 즉 지구에 불시착한 캐롤. 우여곡절 끝에 쉴드 신참 요원 닉 퓨리에게 발견되어 팀을 이룬 그들은 지구로 향하는 더 큰 위협을 감지하고 힘을 합쳐 전쟁을 끝내야 하는데...',
      popularity: 111.039,
      poster_path: '/2JO8X8aT97BwxMMGr9ChrCl4xGQ.jpg',
      release_date: '2019-03-06',
      title: '캡틴 마블',
      video: false,
      vote_average: 6.9,
      vote_count: 13153,
    },
    {
      adult: false,
      backdrop_path: '/dLaiXS1LSKEwV1gu7BUxQAa0j9n.jpg',
      genre_ids: [99],
      id: 979160,
      original_language: 'en',
      original_title: "A Fan's Guide to Ms. Marvel",
      overview: '',
      popularity: 72.395,
      poster_path: '/aolMYjs6QWonQFlnRGvU3o5zeQH.jpg',
      release_date: '2022-06-01',
      title: "A Fan's Guide to Ms. Marvel",
      video: false,
      vote_average: 7.5,
      vote_count: 31,
    },
    {
      adult: false,
      backdrop_path: '/pC36ONAaKMXStlvutYFcAbMemCM.jpg',
      genre_ids: [878, 28, 14],
      id: 119569,
      original_language: 'en',
      original_title: 'Marvel One-Shot: Item 47',
      overview:
        '치타우리의 뉴욕 침공 후, 베니와 클레어란 커플이 치타우리의 무기를 습득하여 이를 조작하는 방법을 알게 된다. 이를 이용해 전국적으로 강도짓을 하는 둘을 S.H.I.E.L.D에서 주시하고 있었다.  재스퍼 시트웰은 이들이 일으킨 강도 사건 4건을 직접 조사했고, 필릭스 블레이크는 감시 카메라 자료를 모아 이들을 분석하고 있었다. 블레이크는 시트웰이 이 사건을 안이하게 여긴다고 불만을 표했고, 시트웰은 그에게 자네는 앉아서 비디오 화면이나 모으지만 현장에서 뛰는 요원들의 고생은 모른다며 전임자가 떠나 새로 발령되게 되었다 말한다. 이에 블레이크 요원은 버릇 때문에 욱했다며 사과한다. 시트웰은 이 커플에게서 무기를 회수하고 이들을 잡아오는 명령을 받게 되는데...',
      popularity: 27.511,
      poster_path: '/rfxvoRoZtBLUXJqLf8z9kgJWkKt.jpg',
      release_date: '2012-09-13',
      title: '마블 원-샷: ITEM 47',
      video: false,
      vote_average: 6.5,
      vote_count: 373,
    },
  ],
});
