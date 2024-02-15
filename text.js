import { useState , useEffect, useRef, useMemo, useCallback } from "react";   // 최상위에서 호출해야함 루프나 조건문 내에서는 사용 불가
import { createConnection } from './chat.js';   // Effect 요소 불러오기

// 주석만들고 할일적기

// 숙제
// 수요일 : useRef - 슬비1, useMemo - 지운2, useCallback - 아리3
// 금요일 : 달력 만들기 - 리엑트 일, 월, 모두 컴포넌트화, 리유저블하게. 인터렉티브 - 버튼 두개, 좌 우 화살표 month 넘기기.
// luxon 라이브러리

/*
React : 짜여진 component들을 쭉 훑는것
동적처리를 딱 한가지로만 함 : State가 바꼈을 때만 바뀜(리렌더링 트리거)
렌더링 하고싶으면 useState를 써야함
컴포넌트 리렌더링은 상속이 된다
컴포넌드 안에 컴포넌트를 쓰면 리렌더링이 되지만, {children} 형태로 들어간 애들은 리렌더링이 안된다
virtual Dom 이라는 Dom Tree를 기억함 (reconciliation, diffing algorithm)
React Run time 에 리렌더랑 될 때의 값들을 저장해둠
memoize component : 부모가 준 프로퍼티가 변하지 않으면 리렌더링하지 않는다
*/



/******** react strict mode ********/
// pure function, immutability 아주 중요함!!! - strict 모드가 필요한 이유!!
// 함수가 퓨어한지 아닌지 체크하기 위해서 두번 렌더링 함
// 하는일 - 1.두번 렌더링함, 2.effect를 두번 돌리는데 두번 렌더링이랑은 조금 다른 방식임, 3.더이상 지원안하는 api 사용했을 때 경고 줌
// 퓨어함수(순수함수) - 같은 인풋일 때 같은 아웃풋이 나오게 하는 것
// 리엑트에서 (예측가능)predictable 하지 않으면 개발하기 힘들기 때문에
// 인퓨어함수 - 바깥쪽의 절정되어있는 변수가 함수 내에 영향을 줄 수 있는 것
// 인퓨어함수는 웬만하면 지양해야한다
// 인퓨어함수를 쓰면 immutability(불변성)를 지킬수 없기 때문에
// useRef, useCallback, useId는 strict mode에서 체크 안함



/******** useState ********/
// useState 구성요소에 상태변수를 추가 할 수 있는 hook
// 기본 형태
const [state, setState] = useState(initialState);
// state 는 초기 initial 값이 되고, state를 업데이트 후 렌더링할 수 있는 set함수
// 이 때 initial 값은 초기 렌더링 이후에는 무시됨

// 1) 구성요소에 상태 추가
export default function Counter() {
  // 초기 count = 0
  const [count, setCount] = useState(0);

  // 클릭 핸들러가 작동하면 setCount가 +1 이 되고, count는 setCount 의 값이 된다 
  function handleClick() {
    setCount(count + 1);
  }

  return (
    // 클릭시 count +1 씩 증가
    <button onClick={handleClick}>
      You pressed me {count} times 
    </button>
  );
}

// 2) 이전 상태를 기반으로 상태 업데이트
const [age, setAge] = useState(42);
// 클릭시 age가 업데이트 되지 않음
❌ function handleClick() {  
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
// a에 age를 보류상태로 저장 
✅ function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}

// 3) 상태의 객체 및 배열 업데이트
// 기존 객체를 변경하기 보다는 상태를 교체 해야 함
const [form, setForm] = useState({ // 배열, 오브젝트형태도 가능함
  firstName: 'Barbara',
  lastName: 'Hepworth',
  email: 'bhepworth@sculpture.com',
});
// 이렇게 쓰면 안됨
❌ form.firstName = 'Taylor';
// 새 객체를 생성하여 전체 객체를 교체
✅ setForm({
  ...form,
  firstName: 'Taylor'
});
// relative 한 상태라면, 이전을 참조해야함 48번 라인 참고
✅ setForm((prevForm)=>({
  ...prevForm,
  firstName: 'Taylor'
}));

// 4) 초기 상태 재생성 방지
function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}
export default function TodoList() {
  // 이렇게 하면 TodoList()를 실행 할 때마다 createInitialTodos() 함수가 실행됨 효율성 떨어짐
  ❌ const [todos, setTodos] = useState(createInitialTodos());
  // 이렇게 쓰면 초기에 한번만 createInitialTodos 를 실행하게됨
  ✅ const [todos, setTodos] = useState(createInitialTodos);
}

// 5) 키를 사용하여 상태 재설정
// 6) 이전 렌더링의 정보 저장






/******** useEffect ********/
// side effect
// API 연결시 주로 사용함
// 구성요소를 외부 시스템과 동기화 할 수 있는 hook
// Mount, Update, Unmount (부 작용들) 될 때 특정 작업을 하고 싶을 때 사용
// 'Mount(화면에 처음 띄우는거) - 초기화, Update(데이터를 업데이트) - 예외처리, Unmount(다시 사라질 떄) - 메모리 정리' 에서 사용
// 외부 시스템과 동기화 하려는게 아니면 필요없을 수 있음
// strict mode 가 켜져 있으면, 실제 셋업 전에 한번 실행을 함??? - 테스트 용도인가???
// effect는 클라이언트에서만 실행됨, 서버 렌더링 중에는 실행되지 않음
// useEffect는 렌더링 맨 마지막에 실행됨
// useEffect에 asyncronize를 바로 넣으면안되는데 이유는 리턴이 안된다.
useEffect(async()=> { 
  // 이거 쓰면안됨
});

// Effect는 콜백함수를 인자로 가짐
// 기본 형태 1: 하나의 콜백함수 : 렌더링 될 때마다 실행
// 디펜던시가 없는 경우는 거의 없기 때문에 웬만하면 쓰지마라
useEffect(()=> { 
  // 작업 
});

// 기본 형태 2:  하나의 콜백함수 + [배열](dependency array) : 배열의 조건에 맞으면 실행
// cleanUp : return 될 때 실행됨, 컴포넌트가 마운트 될 때 이벤트 리스너를 통해 이벤트를 추가 했다면 컴포넌트가 언마운트 될 때 이벤트를 삭제 해줘야함, 안그럼 리렌더링 될 때마다 이벤트리스너가 바인딩 됨
useEffect(()=> {
  // mount 되는 시점에 실행
  return ()=> {
    // unmount 되는 시점에 실행
    // 함수 리턴 = cleanUp
  }
}, []); // unmount될 때만 함수를 실행하고 싶다면 [], 특정 값이 업데이트 되기 직전 cleanUp 함수를 실행시키고 싶다면 [특정값]
// dependency 를 안써야 되는 경우는 없으니 그냥 다 써라
// dependency 안써도 되었던 경우 딱 한가지 경우 - dependency의 조건을 useEffect내부에서 한번 거를 경우

export default function App () {    // 이거 하나를 하나의 렌더라고 함
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  // 버튼이 클릭될 떄마다 count가 올라감
  const handleCountUpdate = ()=> {
    setCount(count + 1);
  }

  // 인풋에 내용이 변할 때 마다 useEffect가 계속 실행됨
  const handleInputChange = (e)=>{
    setName(e.target.value);
  }

  console.log() // 얘기 젤 먼저 실행됨

  // 이게 세번째로 실행되는데 이걸 건너띄는게 아님
  // useEffect의 콜백함수가 queue 에 쌓인다 이번 함수 끝까지 다 읽은 후 실행
  // 렌더링 될때마다 매번 실행됨
  useEffect(()=>{
    console.log('렌더링');
  }); 

  // 처음에 렌더링 될 때만 실행됨
  useEffect(()=>{
    console.log('렌더링');
    return ()=> {
      // 이 컴포넌트가  없어지기 전에 다 run 하는 코드
      // 이렇게 쓰면 componentWillUnmount 와 비슷
      // code...
      // 이 부분이 변경되면 덮어쓰기 된다 clean up call back에
      // queue에 useEffect부분이 저장되고, clean up에 Return되는 부분이 저장되고, clean up call back 레지스트를 저장하게됨
    }
  }, []);

  // [count] 를 넣으면 [count] 내용이 업데이트 될 때마다 렌더링 됨
  // componentDidUpdate와 비슷
  useEffect(()=>{
    console.log('렌더링');
  }, [count]);

  console.log() // 얘기 두번째로 실행됨
    
  return (
    <div>
      <button onclick={handleCountUpdate}>Update</button> 
      <span>count: {count}</span>
      <input type="text" value={name} onChange={handleInputChange}/>
      <span>name: {name}</span>
    </div>
  )
}

// 용법
// ./chat.js 내용
export function createConnection(serverUrl, roomId) {
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}

// 1. 외부 시스템에 연결
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');   // 외부 url 연결

  useEffect(() => {
  	const connection = createConnection(serverUrl, roomId); // createConnection 함수를 가져오고
    connection.connect();   // 연결하기
  	return () => {
      connection.disconnect();  // 연결 끊기
  	};
  }, [serverUrl, roomId]);  // 함수에서 사용되는 구성 요소의 모든 값을 포함하는 종속성 배열
  // ...
}

// 2. custom Hooks의 래핑
//    내장 솔루션이 없거나, 수동으로 effect를 사용해야할 때 api 뒤로 effect를 숨김
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
}
// useChatRoom.js 를 이렇게 따로 만들 수 있다
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);
}

// 3. non-React widget 제어
//    react가 아닌 위젯의 경우 사용

// 4. Fetching data with Effects
//    프레임워크를 사용하는것이 더 효율적이지만, 수동으로 effect를 작성할 수 있음
export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;   // 여기서 초기화
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;  // 초기화가 정리 되는 중이 Race conditions이라는 것에 빠질 수가 있는데 이렇게 되면 순서에 맞지 않은 응답을 받을 수가 있기 때문에, 이것을 막기 위헤 불리언을 사용함
    };
  }, [person]);

  // ...
}

// 5. 종속성 지정
//    종속성은 선택할수 없다. reactive value는 종속성으로 선언되어야 한다
useEffect(() => {
  // ...
}, [a, b]); // 여기 들어가는 요소를 종속성 목록이라고 하나봄

// 5. 이전 상태를 기반으로 상태 업데이트
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1);    // 이렇게 쓰면 안됨
      setCount(c => c + 1);   // 이렇게 써야 함 
    }, 1000)
    return () => clearInterval(intervalId);
  }, []); // 여기에 count를 쓰면 안됨, 이전 상태를 기반으로 하기때문에 count는 종속성 목록으로 지정되어야 함 count가 변경될 때마다 간격을 다시 정리하고 설정 할 필요가 없음
  // ...
}

// 6. 불필요한 객체 종속성 제거
// 7. 불필요한 함수 종속성 제거
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() { // 여기서 이런식으로 렌더링 중에 만들어진 함수 또는 객체를 
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 여기서 종속성 목록으로 사용하면 안됨
  // ...
}

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  //...
}




// 8. 최신 props 및 상태 읽기
function Page({ url, shoppingCart }) {
  useEffect(() => {
    logVisit(url, shoppingCart.length);
  }, [url, shoppingCart]); // url이 변할 때 마다 장바구니를 기록함
  // ...
}
function Page({ url, shoppingCart }) {
  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, shoppingCart.length)
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // url이 변할 때마다 url은 기록하고, 장바구니는 기록하지 않음
  // ...
}

// 9. 서버와 클라이언트에 서로 다른 콘텐츠 표시
// 앱이 렌더링 될 때 서버에서는 초기 html을 생성하기 위해 렌더링 되고, 클라이언트에서 react는 이벤트 핸들러를 해당 html에 연결할 수 있도록 렌더링 코드를 다시 실행함
// 드문 경우로, 클라이언트에 다른 콘텐츠를 표시 해야 할 경우 사용
function MyComponent() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (didMount) {
    // 여기서 useEffect가 실행되면서 한번 더 렌더링이 된다고... 뭔소리야..
  }  else {
    // 앱이 로드 될 떄 여기서 초기에 렌더링이 되었다가
  }
}





/******** useRef ********/
// 함수형 컴포넌트에서 useRef를 부르면
const ref = useRef(value);
// ref는 오브젝트를 반환한다 {current: value}
// 초기값 value는 current에 저장된다
// 초기값은 ref.current="hello" 이런형태로 변경이 가능하다
// 반환된 ref는 컴포넌트가 unmount되기 전 까지는 계속 유지된다

// 1. 저장공간으로써 사용됨(state와 같은 점), 불필요한 렌더링을 하지 않아도됨(state와 다른점)
//    렌더링 마다 가지고 있는 값을 동일한 값으로 유지함
//    값을 변경해도 리렌더링이 되지 않음
//    State : 렌더링 > 컴포넌트 내부 변수들 초기화
//    Ref   : No렌더링 > 변수들의 값이 유지됨

// 2. Dom 요소에 접근
//    포커스, 텍스트 선택영역, 미디어의 재생을 관리 할 때 사용됨
//    예를 들어 로그인 화면에서 아이디 인풋창에 포커스 되어 있게 하기
//    document.querySelector() 같은 거랑 비슷

// 변화는 감지해야하지만, 변화가 렌더링에 영향을 주지 않아야 하는 상황에서 쓰임


export default function App () {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  console.log(countRef); // current: 1

  const increaseCountState = ()=> {
    setCount(count + 1);
  }

  const increaseCountRef = ()=> {
    countRef.current = countRef.current + 1;
    console.log('ref: ',countRef.current);  // ref: 1
  }

  return (
    <div>
      <p>State: {count}</p>
      {/* countRef.curren = 현재 값 */}
      <p>Ref: {countRef.current}</p>
      {/* State가 실행 될 때는 렌더링이 일어나서 화면에 변경된 값이 출력됨, 콘솔에도 찍힘 */}
      <button onClick={increaseCountState}>State up</button> 
      {/* Ref가 실행 될 떄는 렌더링이 일어나지 않아 화면에서는 변화가 일어나지 않음, 콘솔은 찍힘 */}
      <button onClick={increaseCountRef}>Ref up</button> 
    </div>
  )
}

export default function App () {
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0); // 컴포넌트가 마운팅 된 시점부터 마운팅 해제 될 때까지 이 값은 유지된다. 렌더링이 될 때마다 값이 증가 하도록 가능함
  let countVar = 0; // 렌더링 될 때마다 이 값은 0이 됨. 

  // doRendering를 클릭했을 때 useState에 변화가 생기면 렌더링 됨
  const doRendering = ()=> {
    setRenderer(renderer + 1)
  }

  const increaseRef = ()=> {
    countRef.current = countRef.current + 1;
    console.log('ref: ',countRef.current);
  }

  const increaseVar = ()=> {
    countVar = countVar + 1;
    console.log('var: ', countVar);
  }

  return (
    <div>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      {/* useState로 렌더링 시켜야 화면에 띄워짐 */}
      <button onClick={doRendering}>render</button>
      {/* 값을 증가시켜도 값이 화면에 출력되진 않음. countRef의 그러나 값은 유지됨 */}
      <button onClick={increaseRef}>Ref up</button>
      {/* 여기서 아무리 값을 증가시켜도 렌더링 되면 var는 다시 0이 되버림 */}
      <button onClick={increaseVar}>var up</button>
    </div>
  )
}

// DOM요소에 직접 접근
const ref = useRef(value);
<input ref = {ref}/> // 이런식으로 넣으면 해당요소에 바로 접근가능

export default function App () {
  const inputRef = useRef();

  useEffect(()=>{
    inputRef.current.focus(); // 인풋이 포커스가 자동으로 잡힘
  }, []);

  return(
    <div>
      <input ref={inputRef} type="text" />
      <button>login</button>
    </div>
  )  
}






/******** useMemo ********/
// 컴포넌트 성능 최적화를 위한것 중 하나
// memoization = 자주 필요한 값을 젤 처음 계산할 때 캐시에 담아두고 사용하는 것
// useMemo는 두개의 인자를 가짐(callback, [배열])
// 저장할 때 스토리지보다는 메모리에다가 저장해야함. 스토리지는 최악의 경우에...
// 기본 형태
const memo = useMemo(()=>{
  return value;
}, [item]); // 의존성배열

// 예제 1
const hardCalculate = (number)=> {
  for (let i = 0; i < 9999; i++) {} // 임의로 넣은 계산하는 시간
  return number + 10000;
}

const easyCalculate = (number)=> {
  return number + 1;
}

export default function App () {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  const hardSum = useMemo(()=>{
    return hardCalculate(hardNumber);
  }, [hardNumber]) // []안의 조건이 맞아야 useMemo가 다시 실행 됨(hardNumber가 변경 되면 실행)

  const easySum = easyCalculate(easyNumber);

  return(
    <div>
      <h3>어려운 계산기</h3>
      {/* hardCalculate이 실행 될 때는 easy도 실행됨 */}
      <input type="number" value={hardNumber} onChange={(e)=> setHardNumber(parseInt(e.target.value))}/>
      <span>+ 1000 = {hardSum}</span>

      <h3>쉬운 계산기</h3>
      {/* easyCalculate이 실행될 때는 hard는 실행안됨 */}
      <input type="number" value={easyNumber} onChange={(e)=> setEasyNumber(parseInt(e.target.value))}/>
      <span>+ 1000 = {easySum}</span>
    </div>
  )
}

// 예제 2
export default function App () {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true); 

  const location1 = {
    contry: isKorea ?  '한국' : '외국',
  };
  
  useEffect(()=>{
    console.log("useEffect 호출")
  }, [location1])  // 로케이션이 변경 될 떄만 호출 그러나 location 이 주소를 참조하기 때문에 내용이 같아도 계속 호출됨


  const location2 = useMemo(()=> {
    return{
      contry: isKorea ?  '한국' : '외국',
    };
  }, [isKorea]);  // isKorea가 변경 될 때마다 호출 됨

  useEffect(()=>{
    console.log("useEffect 호출")
  }, [location2]) // 이렇게 되면 넘버가 변경돼도 호출 안됨

  return(
    <div>
      <h2>하루 몇끼 먹어요?</h2>
      {/* 넘버가 바뀔 때마다 렌더링 됨 */}
      <input type="number" value={number} onChange={(e) => setNumber(e.target.value)}/>
      
      <h2>어느 나라에 있어요?</h2>
      <p>나라: {location}</p>
      <button onClick={()=>{setIsKorea(!isKorea)}}>비행기타자</button>
    </div>
  )
}



/******** useCallback ********/
// 컴포넌트 성능 최적화를 위한것 중 하나
// 인자로 전달한 콜백 함수 자체를 memoization함
// 콜백함수, 의존성배열 두가지 인자를 받음
// 잘 안쓴다.. 거의 안쓰게 만들 수 있음
// 기본 형태
useCallback(()=>{
  return value;
}, [item]);

const calculate = useCallback((num) =>{
  return num + 1;
}, [item]);

// 예제 1
export default function App () {
  const [number, setNumber] = useState(0);

  const someFunction = ()=>{
    console.log('someFunc: numbaer: ' + {number})
    return;
  }   // number가 변경될 때마다 someFuction의 메모리 주소가 다르기 때문에 useEffect가 계속 실행됨

  const someFunction = useCallback(()=>{
    console.log('someFunc: numbaer: ' + {number})
    return;
  }, [number]);   // 이렇게 바꾸면 number가 변경 될 때 마다 useEffect가 실행됨

  useEffect(()=>{
    console.log('change someFunc');
  }, [someFunction])

  return(
    <div>
      <input type="number" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
      <button onClick={someFunction}>call someFunc</button>
    </div>
  )
}
