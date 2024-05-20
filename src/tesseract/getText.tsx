export interface BCardListObj {
    id: number,
    name: string,
    hpNum: string,
    company: string,
    email: string,
    image:string
  }
const getTextOcr =(text:string)=>{
    const nameRegex = /([가-힣]+)\s([가-힣]+)/;
    const nameMatch = text.match(nameRegex);
    const name = nameMatch ? nameMatch[0] : '이름을 찾을 수 없음';

    // 주소 추출을 위한 정규 표현식
    // const addressRegex = /(\d{5})\s(.+)\s(\d+)/;
    // const addressMatch = text.match(addressRegex);
    // const address = addressMatch ? addressMatch[0] : '주소를 찾을 수 없음';

    // 이메일 주소 추출을 위한 정규 표현식
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = text.match(emailRegex);
    const email = emailMatch ? emailMatch[0] : '이메일 주소를 찾을 수 없음';

    const phoneNumberRegex = /(M\s*\d+|hp\s*\d+|HP\s*\d+|010-\d{4}-\d{4}|010\d{4}\d{4})/;
    const phoneNumberMatch = text.match(phoneNumberRegex);
    const phoneNumber = phoneNumberMatch ? phoneNumberMatch[0] : '휴대폰 번호를 찾을 수 없음';

    const companyRegex = /(\(주\))?\s*\b[A-Z][a-zA-Z0-9&' -]+\b/;
    const companyMatch = text.match(companyRegex);
    const companyName = companyMatch ? companyMatch[0] : '회사 이름을 찾을 수 없음';
    return {
        name: name,
        hpNum: phoneNumber,
        company: companyName,
        email: email,
      }
}
export default getTextOcr;