import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import BusinessCard from './pages/BusinessCard';
import NotFound from './pages/NotFound';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import callApi from './controller/callApi';

export interface BCardListObj {
  _id: string;
  name: string;
  hpNum: string;
  company: string;
  email: string;
  image: string;
}

export interface UserInfo {
  u_id: string;
  u_email: string;
}

function reducer(state: BCardListObj[], action: any) {
  let nextState;
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      nextState = [action.data, ...state];
      break;
    case 'UPDATE':
      nextState = state.map((item: BCardListObj) =>
        String(item._id) === String(action.data._id) ? action.data : item
      );
      break;
    case 'DELETE':
      nextState = state.filter((item: BCardListObj) =>
        item._id !== action._id
      );
      break;
    default:
      return state;
  }
  return nextState;
}

// 기본 상태 정의
const defaultState: BCardListObj[] = [];

// Dispatch 함수 타입 정의
interface DispatchContextType {
  onCreate: (
    name: string,
    hpNum: string,
    company: string,
    email: string,
    image: string
  ) => void;
  onUpdate: (
    name: string,
    hpNum: string,
    company: string,
    email: string,
    image: string
  ) => void;
  onDelete: (_id: number) => void;
  triggerReload: () => void;
}

// 기본 Dispatch 함수 정의
const defaultDispatch: DispatchContextType = {
  onCreate: () => { },
  onUpdate: () => { },
  onDelete: () => { },
  triggerReload: () => { },
};

export const BcardStateContext = createContext(defaultState);
export const BcardDispatchContext = createContext(defaultDispatch);

function App() {
  localStorage.setItem('userInfo', 'jaeseok9405@gmail.com');


  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef<number>(0); // 초기값 설정

  useEffect(() => {
    async function fetchData() {
      const storedData = await callApi('selectData', { auth: localStorage.getItem('userInfo') });
      if (!storedData) {
        setIsLoading(false);
        return;
      }
      const parseData = storedData;
      let maxId = 0;

      if (!Array.isArray(parseData)) {
        setIsLoading(false);
        return;
      }
      parseData.forEach(itm => {
        if (Number(itm._id) > maxId) maxId = Number(itm._id);
      });

      idRef.current = maxId + 1;

      dispatch({
        type: 'INIT',
        data: parseData
      });
      setIsLoading(false);
    }
    fetchData();

  }, [reload]);

  const onCreate = async (name: string, hpNum: string, company: string, email: string, image: string) => {
    try {
      const auth = localStorage.getItem('userInfo');
      const data = {
        auth,
        name,
        hpNum,
        company,
        email,
        image,
      };
      const result = await callApi('onCreate', data);
      return result.insertedId;
    } catch (e: any) {
      console.log(e);
    }
  };

  const onUpdate = (_id: string, name: string, hpNum: string, company: string, email: string, image: string) => {
    dispatch({
      type: 'UPDATE',
      data: {
        _id,
        name,
        hpNum,
        company,
        email,
        image
      }
    });
  };

  const onDelete = (_id: string) => {
    dispatch({
      type: 'DELETE',
      _id
    });
  };

  if (isLoading) {
    return <div>로딩중!</div>;
  }
  const triggerReload = () => setReload(!reload);
  return (
    <>
      <BcardStateContext.Provider value={data}>
        <BcardDispatchContext.Provider value={{ onCreate, onUpdate, onDelete, triggerReload }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/businesscard/:_id" element={<BusinessCard />} />
            <Route path="/edit/:_id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BcardDispatchContext.Provider>
      </BcardStateContext.Provider>
    </>
  );
}

export default App;
