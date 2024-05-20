import  insertData  from '../model/insertData'
interface dataIF {
      id:number
      name: string;
      hpNum: string;
      company: string;
      email: string;
      image: string;
  }
const insertBcard = async (data:dataIF)=>{
    const { 
        id,
        name,
        hpNum,
        company,
        email,
        image 
    } = data;

    try {
        const insertt = await insertData(
            id,
            name,
            hpNum,
            company,
            email,
            image 
        );
        if (insertt) {
           alert('성공')
        } else {
            alert('시패')
        }
    } catch (error) {
        console.error("요청 실패:", error);
    }
}

export default insertBcard;