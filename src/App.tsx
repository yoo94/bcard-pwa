import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import BusinessCard from './pages/BusinessCard';
import NotFound from './pages/NotFound';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';

export interface BCardListObj {
  id: number,
  name: string,
  hpNum: string,
  company: string,
  email: string,
  image:string
}

function reducer(state: BCardListObj[], action: any) {
  let nextState;
  switch(action.type) {
    case "INIT": 
      return action.data;
    case "CREATE":
      alert('r1')
      nextState = [action.data, ...state];
      break;
    case "UPDATE":
      nextState = state.map((item: BCardListObj) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    case "DELETE":
      nextState = state.filter((item: BCardListObj) =>
        Number(item.id) !== Number(action.id)
      );
      break;
    default:
      return state;
  }
  // localStorage.setItem("Bcard", JSON.stringify(nextState));
  return nextState;
}

// 기본 상태 정의
const defaultState: BCardListObj[] = [];

// Dispatch 함수 타입 정의
interface DispatchContextType {
  onCreate: (name: string, hpNum: string, company: string, email: string,image:string) => void;
  onUpdate: (id: number, name: string, hpNum: string, company: string, email: string,image:string) => void;
  onDelete: (id: number) => void;
}

// 기본 Dispatch 함수 정의
const defaultDispatch: DispatchContextType = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {}
};

export const BcardStateContext = createContext(defaultState);
export const BcardDispatchContext = createContext(defaultDispatch);

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef<number>(0); // 초기값 설정

  useEffect(() => {
    const storedData = localStorage.getItem('Bcard');
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parseData = JSON.parse(storedData);
    let maxId = 0;

    if (!Array.isArray(parseData)) {
      setIsLoading(false);
      return;
    }
    parseData.forEach(itm => {
      if (Number(itm.id) > maxId) maxId = Number(itm.id);
    });

    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parseData
    });
    setIsLoading(false);
  }, []);

  const onCreate = (name: string, hpNum: string, company: string, email: string, image:string) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        name: name,
        hpNum: hpNum,
        company: company,
        email: email,
        image:image
      }
    });
  };
  
  const onUpdate = (id: number, name: string, hpNum: string, company: string, email: string, image:string) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        name,
        hpNum,
        company,
        email,
        image
      }
    });
  };
  
  const onDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      id
    });
  };

  if (isLoading) {
    return <div>로딩중!</div>;
  }

  return (
    <>
      <BcardStateContext.Provider value={data}>
        <BcardDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/businesscard/:id" element={<BusinessCard />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BcardDispatchContext.Provider>
      </BcardStateContext.Provider>
    </>
  );
}

export default App;
