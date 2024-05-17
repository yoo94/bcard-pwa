import "./Viewer.css"
const Viewer =({data}:any)=>{

    return (
        <div className="Viewer">
            <section className='name_section'>
              <div>
                <input
                  name="name"
                  type='text'
                  value={data.name}
                  />
                <label>Name</label>
                <span></span>
              </div>
            </section>
            <section className='hpNum_section'>
              <div>
                <input
                  name="hpNum"
                  type='text'
                  value={data.hpNum}
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
                  value={data.email}
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
                  value={data.company}
                />
                <label>회사</label>
                <span></span>
              </div>
            </section>
        </div>
    )
}
export default Viewer;