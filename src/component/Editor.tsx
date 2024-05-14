import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './Editor.css'
import File from './File'
const Editor = () => {
  const nav = useNavigate();

  return (
    <div className="Editor">
      <h2>명함 등록하기</h2>
      <section className='name_section'>
        <div>
          <input
            name="name"
            type='text'
            // value={""}
            onChange={() => { }} />
          <label>Name</label>
          <span></span>
        </div>
      </section>
      <section className='hpNum_section'>
        <div>
          <input
            name="hpNum"
            type='text'
            // value={""}
            onChange={() => { }}
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
            // value={""}
            onChange={() => { }}
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
            // value={""}
            onChange={() => { }}
          />
          <label>회사</label>
          <span></span>
        </div>
      </section>
      <File />
      <footer className='button_section'>
        <Button text={'취소하기'} type='RED' location={'footer_harf'} onclick={() => { nav(-1) }} />
        <Button text={'저장하기'} type='GREEN' location={'footer_harf'} onclick={() => { }} />
      </footer>
    </div>
  )
}
export default Editor