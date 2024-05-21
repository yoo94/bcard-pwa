export interface BCardListObj {
    id: number,
    name: string,
    hpNum: string,
    company: string,
    email: string,
    image: string
}
const getTextOcr = (text: string) => {
    //이름
    const lines = text.split('\n');
    const nameRegex = /([가-힣]+)\s([가-힣]+)\s([가-힣]+)/;
    const nameMatch = text.match(nameRegex);
    const name = nameMatch ? nameMatch[0] : '이름을 찾을 수 없음';

    // 이메일 주소 추출을 위한 정규 표현식
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = text.match(emailRegex);
    let email = emailMatch ? emailMatch[0] : '이메일 주소를 찾을 수 없음';
    if (email === '이메일 주소를 찾을 수 없음') {
        lines.forEach((line) => {
            const emailRegex = /(?:Email\.|E)\s*([\w.-]+@[\w.-]+\.[a-zA-Z]+)/;
            const emailMatch = line.match(emailRegex);
            if (emailMatch) {
                email = emailMatch[1];
            }
        });
    }



    //핸드폰
    const phoneNumberRegex = /(010-\d{4}-\d{4}|010\d{4}\d{4})/;
    const phoneNumberMatch = text.match(phoneNumberRegex);
    let phoneNumber = phoneNumberMatch ? phoneNumberMatch[0] : '휴대폰 번호를 찾을 수 없음';

    if (email === '이메일 주소를 찾을 수 없음') {
        lines.forEach((line) => {
            const phoneRegex = /(?:Mobile\.|M)\s*(010[-\d]+)/;
            const phoneMatch = line.match(phoneRegex);
            if (phoneMatch) {
                phoneNumber = phoneMatch[1];
            }
        });
    }


    //회사
    let companyName = '회사 이름을 찾을 수 없음';

    lines.forEach((line, index) => {
        const companyRegex = /\((?:\s*주\s*)\)\s*([\w\s.]+)/;
        const companyMatch = line.match(companyRegex);
        if (companyMatch) {
            companyName = lines[index] || companyName; // 다음 라인을 회사 이름으로 설정하되, 없으면 기존의 값을 사용
        }
    });
    if (companyName === '이메일 주소를 찾을 수 없음') {
        lines.forEach((line) => {
            const companyRegex = /주\s*([\w\s.]+)/;
            const companyMatch = line.match(companyRegex);
            if (companyMatch) {
                companyName = companyMatch[0].trim();
            }
        });
    }

    return {
        name: name,
        hpNum: phoneNumber,
        company: companyName,
        email: email,
    }
}
export default getTextOcr;