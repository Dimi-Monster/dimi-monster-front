import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

export default function GAuthRoute() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        alert(`code: ${searchParams.get('code')}`);
    }, []);

    return (
        <div>
            로그인 중입니다...
        </div>
    )
}