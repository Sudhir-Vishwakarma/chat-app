import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) =>{

    const { setIsAuth } = props;
    
    const signInWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth , provider);
            cookies.set("chat-cookie", result.user.refreshToken);
            setIsAuth(true);
        } catch (err){
            console.log(err);
        }


    }

    return(
        <div className="auth">
            <p>SignIn with Google to continue</p>
            <button onClick={signInWithGoogle}>SignIn with Google</button>
        </div>
    );
}