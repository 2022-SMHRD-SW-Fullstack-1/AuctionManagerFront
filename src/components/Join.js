import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../node_modules/axios/index";
import "./css/Join.css";
import Login from "./Login";
// import Form from './join/Form'

// 회원가입 참고 : https://velog.io/@dev__note/react-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8F%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EA%B8%B0%EB%B3%B8-%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC-%EC%84%B8%ED%8C%85
// https://jisoo-log.tistory.com/17

const Join = () => {
  const navigate = useNavigate();

  // 초기값 세팅 - 아이디, 닉네임, 성별, 비밀번호, 비밀번호확인, 전화번호, 생년월일, 주소
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGener] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [addr, setAddr] = useState("");

  // 오류메세지 상태 저장
  const [idMessage, setIdMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [addrMessage, setAddrMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isAddr, setIsAddr] = useState(false);

  //변동값
  const idRef = useRef();
  const nickNameRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const pwRef = useRef();
  const phoneRef = useRef();
  const birthRef = useRef();
  const addrRef = useRef();

  //버튼 활성화 여부 저장
  const [notAllow, setNotAllow] = useState(true); // 가입하기 버튼
  const [notIdCk, setNotIdCk] = useState(true); // 아이디 중복확인 버튼

  //아이디 유효성 검사
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    // const idRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    const idRegExp = /^[a-zA-z0-9]{5,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요");
      setIsId(false);
    } else {
      setIdMessage("중복확인을 해주세요.");
      setIsId(true);
    }
  };

  //아이디 중복확인
  const handleIdCk = (e) => {
    e.preventDefault();
    idCheck();
  };

  function idCheck() {
    console.log(idRef.current.value);
    axios
      .post("/join/idck", { mem_Id: idRef.current.value })
      .then(function (res) {
        console.log(res.data);
        if (res.data == "fail") {
          setIdMessage("중복된 아이디는 사용할 수 없습니다.");
          setIsId(true);
        } else {
          setIdMessage("사용 가능한 아이디 입니다.");
          setIsId(false);
        }
      })
      .catch(function (error) {
        alert("오류발생");
      });
  }

  //이름
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    setIsName(true);
  };

  //닉네임
  const onChangeNickName = (e) => {
    const currentNickName = e.target.value;
    setNickName(currentNickName);

    if (currentNickName.length < 2 || currentNickName.length > 5) {
      setNickNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsNickName(false);
    } else {
      setNickNameMessage("사용가능한 닉네임 입니다.");
      setIsNickName(true);
    }
  };

  //성별 입력
  const onChangeGender = (e) => {
    const currentGender = e.target.value;
    console.log("핸들링 성별", currentGender);
    setGener(currentGender);
  };

  //비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    // /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  //비밀번호 일치 여부 확인
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };

  //주소 유효성 검사
  const onChangeAddr = (e) => {
    console.log(e.target.value);

    const currentAddr = e.target.value;
    if (currentAddr.length < 5) {
      setAddrMessage("주소는 5글자 이상 입력해주세요");
      setIsAddr(false);
    } else {
      setAddrMessage("");
      setIsAddr(true);
    }
  };

  //전화번호 유효성 검사
  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다.");
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다.");
      setIsPhone(true);
    }
  };

  //전화번호 하이픈 값
  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };

  //생일 유효성
  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);

    let now = new Date();
    // console.log("현재 날짜",now)
    // console.log("생년월일",currentBirth)

    if (currentBirth > now) {
      setBirthMessage("미래의 사람은 가입할 수 없어요");
      setIsBirth(false);
    } else {
      if (currentBirth.length == 6) {
        setBirthMessage("생년월일을 8자리로 입력해주세요");
        setIsBirth(false);
      } else if (currentBirth.length == 0) {
        setBirthMessage("생년월일을 입력해주세요");
        setIsBirth(false);
      } else if (currentBirth.length == 8) {
        setBirthMessage("");
        setIsBirth(true);
      }
    }
  };

  //생일에 하이픈 값 자동으로 넣기
  useEffect(() => {
    if (birth.length === 8) {
      setBirth(birth.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    }
  }, [birth]);

  //버튼 활성화 관련
  useEffect(() => {
    //emailValid, pwValid의 값이 변경이 될 때마다 실행될 코드
    if (
      (isId == false,
      isNickName == true &&
        isPassword == true &&
        isPasswordConfirm == true &&
        isPhone == true &&
        isBirth == true &&
        isAddr == true)
    ) {
      setNotAllow(false); //가입 버튼 활성화
      return;
    }
    setNotAllow(true); //가입 버튼 비활성화

    if (isId == true) {
      setNotIdCk(false); //중복확인 버튼 활성화
      return;
    }
    setNotIdCk(true); //중복 확인 버튼 비활성화
  }, [
    notIdCk,
    isId,
    isNickName,
    isPassword,
    isPasswordConfirm,
    isPhone,
    isBirth,
    isAddr,
  ]);

  //가입하기 버튼 눌렀을 때
  const gotoLogin = (e) => {
    e.preventDefault();
    //axios로 백이랑 데이터 주고 받기
    console.log(
      "제출완료",
      id,
      name,
      nickName,
      gender,
      password,
      phone,
      birth,
      addr
    );
    join();
  };

  function join() {
    axios
      .post("/join", {
        mem_Id: idRef.current.value,
        mem_Name: nameRef.current.value,
        mem_Nick: nickNameRef.current.value,
        mem_Pw: pwRef.current.value,
        mem_Gender: gender,
        mem_Birthdate: birthRef.current.value,
        mem_Phone: phoneRef.current.value,
        mem_Addr: addrRef.current.value,
      })
      .then(function (res) {
        console.log(res.data); //넘어오는 데이터 값 확인, 나중에 지우기
        res.data == 1
          ? navigate("/login")
          : alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
      })
      .catch(function (error) {
        console.log(error);
        alert("오류발생");
      });
  }

  return (
    <div className="joinBox">
      <div className="jointitle">
        <h3>회원가입</h3>
      </div>
      <div className="joinLine">
        <div className="joinLabel">아이디</div>
        <div className="joinInput">
          <input
            type="text"
            id="id"
            className="id"
            value={id}
            onChange={onChangeId}
            ref={idRef}
          />
          <div className="idCkBox">
            <button className="idCk" disabled={notIdCk} onClick={handleIdCk}>
              중복확인
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="message"> {idMessage} </p>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="Name">이름</label> <br />
        </div>
        <div className="joinInput">
          <input
            type="text"
            id="name"
            className="name"
            value={name}
            onChange={onChangeName}
            ref={nameRef}
          />
        </div>
        <div>
          <p className="message">{nameMessage}</p>
        </div>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="nickName">닉네임</label> <br />
        </div>
        <div className="joinInput">
          <input
            type="text"
            id="nickName"
            className="nickName"
            value={nickName}
            onChange={onChangeNickName}
            ref={nickNameRef}
          />
        </div>
      </div>
      <div>
        <p className="message">{nickNameMessage}</p>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="gender">성별</label>
          <br />
        </div>
        <div className="joinInput">
          {/* <select ref={genderRef}>
            <option value="W">여자</option>
            <option value="M">남자</option>
          </select> */}
          <div>
            <div className="genderBox1">
              <input
                type="radio"
                name="gender"
                value="W"
                ref={genderRef}
                onChange={onChangeGender}
              />{" "}
              여
            </div>
            <div className="genderBox1">
              <input
                type="radio"
                name="gender"
                value="M"
                ref={genderRef}
                onChange={onChangeGender}
              />{" "}
              남
            </div>
          </div>
        </div>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="password">비밀번호</label> <br />
        </div>
        <div className="joinInput">
          <input
            type="password"
            id="password"
            className="password"
            value={password}
            onChange={onChangePassword}
            ref={pwRef}
          />
        </div>
      </div>
      <div>
        <p className="message">{passwordMessage}</p>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="passwordConfirm">비밀번호 확인</label> <br />
        </div>
        <div className="joinInput">
          <input
            type="password"
            id="passwordConfirm"
            className="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
        </div>
      </div>
      <div>
        <p className="message">{passwordConfirmMessage}</p>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="addr">주소</label>
        </div>
        <div className="joinInput">
          <input
            type="text"
            id="addr"
            className="addr"
            onChange={onChangeAddr}
            ref={addrRef}
            placeholder="주소"
          />
        </div>
      </div>
      <div>
        <p className="message">{addrMessage}</p>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="phone">전화번호</label> <br />
        </div>
        <div className="joinInput">
          <input
            id="phone"
            className="phone"
            value={phone}
            onChange={addHyphen}
            ref={phoneRef}
            placeholder="(-) 생략"
          />
        </div>
      </div>
      <div>
        <p className="message">{phoneMessage}</p>
      </div>

      <div className="joinLine">
        <div className="joinLabel">
          <label htmlFor="birth">생년월일</label> <br />
        </div>
        <div className="joinInput">
          <input
            id="birth"
            className="birth"
            value={birth}
            onChange={onChangeBirth}
            ref={birthRef}
            placeholder="(-) 생략"
          />
        </div>
      </div>
      <div>
        <p className="message">{birthMessage}</p>
      </div>

      <div className="joinBtn">
        <button
          type="submit"
          className="bottomBtn"
          disabled={notAllow}
          onClick={gotoLogin}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Join;
