import React from 'react'
import { json } from 'react-router-dom'
// import requests

const Message = () => {

    // 카카오톡 메시지 API

    // https://localhost:3000/?code=YDGI518qSgzaMpe44GTZgFf_e--Vp9WKaxduW9DHK4wNLyggmOnS2KSdCcRdAa920lDvdQo9c5oAAAGEUJ_oHA

    url = "https://kauth.kakao.com/oauth/token"
    data = {
        "grant_type": "authorization_code",
        "client_id": "958d18d4447ceb387b59eb6ab263b1b3",
        "redirect_url": "https://localhost:3000",
        "code": "YDGI518qSgzaMpe44GTZgFf_e--Vp9WKaxduW9DHK4wNLyggmOnS2KSdCcRdAa920lDvdQo9c5oAAAGEUJ_oHA"
    }
    response = requests.post(url, data = data)
    tokens = response.json()
    print(tokens)

    // # kakao_code.json 파일 저장
    // with open("kakao_code.json", "w") as fp:
    // json.dump(tokens, fp)

    url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"
    headers = {
        "Authorization": "Bearer " + "{access_token}"
    }
    data = {
        "template_object": json.dumps({
            "object_type": "text",
            "text": "Google 뉴스: drone",
            "link": {
                "web_url": "https://www.google.co.kr/search?q=drone&source=lnms&tbm=nws",
                "mobile_web_url": "https://www.google.co.kr/search?q=drone&source=lnms&tbm=nws"
            }
        })
    }
    response = requests.post(url, headers = headers, data = data)
    if (response.json().get('result_code') == 0){
        alert('메시지를 성공적으로 보냈습니다.')

    }
    else{
        alert('메시지를 성공적으로 보내지 못했습니다. 오류메시지 : ' + str(response.json()))
    }



    return (
        <div>Message</div>
    )
}

export default Message