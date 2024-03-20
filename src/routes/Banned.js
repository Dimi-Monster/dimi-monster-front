import { useNavigate } from "react-router-dom";

// this is the page that will be displayed when a user is banned
export default function Banned() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }
            }
                >
                <h1 style={{fontSize: '3em', textAlign: 'center', fontWeight: 'extra-bold'}}>당신은 차단되었습니다.</h1>
                <div style={{
                        display: 'flex',
                        fontSize: '1em',
                        textAlign: 'center',
                        marginTop: '5em',
                        marginBottom: '1em',
                        gap: '2em',
                    }
                }>
                   <button onClick={()=>{navigate('/login')}}>
                    로그인 페이지로 돌아가기 &rarr;
                    </button>
                    <button onClick={
                        ()=>{window.location.href = "https://pentag.notion.site/04b6470307e349e0915b27e3c4799d5c" }
                    }>
                        차단자 명단 및 사유 확인하기 &rarr;
                    </button>
                </div>
            </div>
        </>
    )
}