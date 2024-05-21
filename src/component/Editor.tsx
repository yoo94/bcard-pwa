import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './Editor.css'
import File from './File'
import { InputType } from '../pages/New';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface EditorProps {
  onsubmit: (input: InputType) => void;
  initData?: InputType;
  setPercentage?: Dispatch<SetStateAction<number>>;
}

const Editor: React.FC<EditorProps> = ({ onsubmit, initData, setPercentage }) => {
  const nav = useNavigate();
  const [input, setInput] = useState<InputType>({
    name: "",
    hpNum: "",
    company: "",
    email: "",
    image: ""
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value
    })

  }
  const onclickSubmit = () => {
    onsubmit(input);
  }

  useEffect(() => {
    if (initData) {
      setInput(
        {
          ...initData,
        }
      )
    }
  }, [initData])

  return (
    <div className="Editor">
      <section className='name_section'>
        <div>
          <input
            name="name"
            type='text'
            value={input.name}
            onChange={onChangeInput} />
          <label>Name</label>
          <span></span>
        </div>
      </section>
      <section className='hpNum_section'>
        <div>
          <input
            name="hpNum"
            type='text'
            value={input.hpNum}
            onChange={onChangeInput}
          />
          <label>핸드폰 번호</label>
          <span></span>
        </div>
      </section>
      <section className='email_section'>
        <div>
          <input
            name="email"
            type='text'
            value={input.email}
            onChange={onChangeInput}
          />
          <label>이메일</label>
          <span></span>
        </div>
      </section>
      <section className='company_section'>
        <div>
          <input
            name="company"
            type='text'
            value={input.company}
            onChange={onChangeInput}
          />
          <label>회사</label>
          <span></span>
        </div>
      </section>
      <File setImage={setInput} setPercentage={setPercentage} />
      <footer className='button_section'>
        <Button text={'취소하기'} type='RED' location={'footer_harf'} onclick={() => { nav(-1) }} />
        <Button text={'저장하기'} type='GREEN' location={'footer_harf'} onclick={onclickSubmit} />
      </footer>
    </div>
  )
}
export default Editor